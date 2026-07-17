'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { passwordRequirements, validatePassword as validatePasswordRules } from '@/lib/passwordValidation';

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-12 flex items-center justify-center">
          <Card className="shadow-lg border-slate-200/70">
            <CardHeader>
              <CardTitle>Loading invitation...</CardTitle>
              <CardDescription>Fetching invite details.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [inviteInfo, setInviteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const passwordValidation = useMemo(() => validatePasswordRules(password), [password]);
  const passwordsMatch = confirmPassword === password;

  useEffect(() => {
    let isMounted = true;
    const loadInvite = async () => {
      if (!token) {
        setError('Missing invitation token.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/team/invite?token=${encodeURIComponent(token)}`);
        const payload = await response.json();
        if (!response.ok || !payload?.success) {
          throw new Error(payload?.error || 'Invitation is invalid or has expired.');
        }
        if (isMounted) {
          setInviteInfo(payload.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to validate invitation.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadInvite();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const getRedirectPath = (info) => {
    if (!info) return '/admin';
    if (info.role === 'admin') return '/admin';
    if (info.allowedAdminSections?.includes('*')) return '/admin';
    return info.allowedAdminSections?.[0] || '/admin';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving || !token) return;
    if (!passwordValidation.valid || !passwordsMatch) {
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to accept invitation.');
      }
      const destination = getRedirectPath(inviteInfo);
      setRedirectPath(destination);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to accept invitation.');
    } finally {
      setSaving(false);
    }
  };

  const canSubmit = password && passwordsMatch && passwordValidation.valid && !saving;
  useEffect(() => {
    if (success && redirectPath) {
      const timeout = setTimeout(() => {
        router.replace(redirectPath);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [success, redirectPath, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-12">
      <div className="mx-auto max-w-lg px-4">
        <Card className="shadow-lg border-slate-200/70">
          <CardHeader>
            <CardTitle>Accept your invitation</CardTitle>
            <CardDescription>
              {loading
                ? 'Validating invitation...'
                : inviteInfo
                  ? `Complete setup for ${inviteInfo.email}`
                  : 'We were unable to validate this invitation.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="space-y-4 text-sm text-slate-600">
                <p className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Invitation accepted successfully.
                </p>
                <p>
                  Redirecting you to <span className="font-medium">{redirectPath || '/admin'}</span>. If nothing happens, you can go
                  there manually.
                </p>
                <Button asChild>
                  <Link href={redirectPath || '/admin'}>Continue</Link>
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {inviteInfo && (
                  <p className="text-sm text-slate-600">
                    You're joining as{' '}
                    <span className="font-medium capitalize">{inviteInfo.role?.replace(/-/g, ' ') || 'team member'}</span>.
                  </p>
                )}
                <div className="space-y-2">
                  <Label htmlFor="invite-password">Create Password</Label>
                  <Input
                    id="invite-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a strong password"
                    disabled={saving || loading || !inviteInfo}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invite-confirm-password">Confirm Password</Label>
                  <Input
                    id="invite-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter the password"
                    disabled={saving || loading || !inviteInfo}
                  />
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-600">Passwords do not match.</p>
                  )}
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                  {passwordRequirements.map((req) => {
                    const passed = passwordValidation.valid || !passwordValidation.failed?.includes(req.id);
                    return (
                      <div key={req.id} className="flex items-center gap-2 text-sm">
                        {passed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-slate-400" />
                        )}
                        <span className={passed ? 'text-green-600 font-medium' : 'text-slate-600'}>{req.label}</span>
                      </div>
                    );
                  })}
                </div>
              </form>
            )}
          </CardContent>
          {!success && (
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={!canSubmit || loading || !inviteInfo} onClick={handleSubmit}>
                {saving ? 'Setting password...' : 'Accept Invitation'}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}

