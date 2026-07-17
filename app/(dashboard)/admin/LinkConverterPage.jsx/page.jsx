// app/(dashboard)/admin/LinkConverterPage.jsx/page.jsx
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { Link2, Rocket, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LinkConverterPage() {
  const [urlInput, setUrlInput] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!urlInput.trim()) {
      return;
    }
    const encoded = encodeURIComponent(urlInput.trim());
    setGeneratedLink(`https://kanqoo.example/track?u=${encoded}`);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) {
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Link Converter</h1>
              <p className="text-slate-600 mt-1">Generate trackable affiliate links in seconds.</p>
            </div>
          </div>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <CardTitle className="text-xl font-semibold">Create a Link</CardTitle>
                <CardDescription>Paste a product or website URL to convert.</CardDescription>
              </div>
              <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">
                VOLA Converter
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/product"
              />
              <Button
                onClick={handleGenerate}
                disabled={!urlInput.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-50"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Generate Link
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm text-slate-600">Generated link</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  readOnly
                  value={generatedLink}
                  placeholder="Your converted link will appear here"
                />
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!generatedLink}
                  className="sm:w-40"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              {!generatedLink && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Generate a link to enable copy.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
