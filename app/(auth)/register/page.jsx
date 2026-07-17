"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight,
  Shield, CheckCircle, Globe, Plus, X,
  Building2, Users, Briefcase, Phone, Loader2
} from 'lucide-react';
import Navbar from "@/app/components/website/layout/Navbar";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    handlerName: '',
    links: [''],
    userType: 'creator',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const normalizeUrl = (raw = '') => {
    const v = String(raw || '').trim();
    if (!v) return '';
    if (/^[a-zA-Z]+:\/\//.test(v)) {
      try { return new URL(v).toString(); } catch { return v; }
    }
    const withProto = `https://${v}`;
    try { return new URL(withProto).toString(); } catch { return v; }
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = value;
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleLinkBlur = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = normalizeUrl(updatedLinks[index]);
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (currentStep === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const normalizedLinks = formData.links.map(l => normalizeUrl(l)).filter(Boolean);
      const payload = { ...formData, links: normalizedLinks };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Account created successfully! Redirecting...');
        setTimeout(() => router.push('/verify-pending'), 5000);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (error) setError('');
  };

  const addLinkField = () => {
    setFormData({ ...formData, links: [...formData.links, ''] });
  };

  const removeLinkField = (index) => {
    if (formData.links.length > 1) {
      const updatedLinks = formData.links.filter((_, i) => i !== index);
      setFormData({ ...formData, links: updatedLinks });
    }
  };

  const goBack = () => {
    setCurrentStep(1);
    setError('');
  };

  const getPasswordStrength = () => {
    const length = formData.password.length;
    if (length === 0) return { label: '', percent: 0, color: 'bg-red-500' };
    if (length < 6) return { label: 'Weak', percent: 33, color: 'bg-red-500' };
    if (length < 10) return { label: 'Good', percent: 66, color: 'bg-yellow-500' };
    return { label: 'Strong', percent: 100, color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength();

  const userTypes = [
    { value: 'creator', label: 'Content Creator', icon: Users },
    { value: 'brand', label: 'Brand/Company', icon: Building2 },
    { value: 'agency', label: 'Marketing Agency', icon: Briefcase },
  ];

  return (
    <div className="w-full max-w-[520px] relative z-10">
      
      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100/50 p-5 sm:p-7">
          
          {/* Progress Indicator */}
          <div className="mb-5 select-none">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-xs transition-all duration-300 ${currentStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-400'}`}>
                    {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                  </div>
                  <div className={`h-[2px] w-12 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-xs transition-all duration-300 ${currentStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-400'}`}>
                    2
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 font-sans">
                Step {currentStep} of 2
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="text-left mb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-1 font-sans">
              {currentStep === 1 ? "Create your account" : "Complete your profile"}
            </h2>
            <p className="text-slate-400 text-sm font-medium font-sans">
              {currentStep === 1 ? "Enter your credentials to get started." : "Tell us more about yourself."}
            </p>
          </div>

          {/* Success Message Box */}
          {success && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-emerald-900 font-bold text-sm font-sans">Registration Successful!</p>
                <p className="text-emerald-700 text-xs mt-1 font-medium leading-relaxed font-sans">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message Box */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-900 font-bold text-sm font-sans">Error</p>
                <p className="text-red-700 text-xs mt-1 font-medium leading-relaxed font-sans">{error}</p>
              </div>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {currentStep === 1 ? (
              /* STEP 1 */
              <div className="space-y-3.5">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Phone Number <span className="text-slate-400 text-[10px] font-bold tracking-normal font-sans">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full h-12 pl-12 pr-12 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-450 font-bold mb-1.5 uppercase font-sans">
                        <span>Password strength</span>
                        <span>{passwordStrength.label}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 ${passwordStrength.color} rounded-full transition-all duration-300`}
                          style={{ width: `${passwordStrength.percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full h-11 pl-12 pr-12 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* STEP 2 */
              <div className="space-y-3">
                
                {/* Handler Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Handler Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="handlerName"
                      value={formData.handlerName}
                      onChange={handleChange}
                      required
                      placeholder="@yourhandle"
                      className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                    />
                  </div>
                </div>

                {/* User Type */}
                <div className="space-y-3">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    I am a <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {userTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.userType === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, userType: type.value })}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-300 sm:flex-col sm:items-center sm:gap-2.5 sm:p-3.5 sm:rounded-2xl ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-350 text-slate-650'
                          }`}
                        >
                          <Icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className={`text-xs font-bold sm:font-black tracking-wide sm:uppercase sm:tracking-tight sm:text-[10px] text-left sm:text-center ${isSelected ? 'text-blue-600' : 'text-slate-550'}`}>
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    Website or Social Links
                  </label>
                  <div className="space-y-3">
                    {formData.links.map((link, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            onBlur={() => handleLinkBlur(index)}
                            placeholder="example.com"
                            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium font-sans"
                          />
                        </div>
                        {formData.links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLinkField(index)}
                            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-xl text-slate-400 hover:text-red-650 transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addLinkField}
                      className="w-full h-12 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-dashed border-slate-350 hover:border-blue-500/50 rounded-xl text-slate-600 hover:text-blue-600 font-bold transition-all text-xs font-sans uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Another Link</span>
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="text-xs text-slate-600 leading-relaxed font-semibold cursor-pointer font-sans">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={isLoading}
                  className="flex-1 h-12 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:border-slate-350 transition-all text-sm font-sans"
                >
                  Back
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || (currentStep === 2 && !formData.agreeToTerms)}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans text-sm tracking-wide"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 1 ? 'Continue' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Divider (Only visible in Step 1) */}
          {currentStep === 1 && (
            <>
              <div className="relative flex items-center justify-center my-4 select-none">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative z-10 px-3 bg-white text-xs font-semibold text-slate-450 font-sans uppercase">or</span>
              </div>

              {/* Secondary Sign In Action */}
              <Link
                href="/login"
                className="w-full h-12 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-sans"
              >
                <span>Sign in to your account</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>
            </>
          )}

          {/* Bottom Back to homepage */}
          <div className="text-center mt-4 select-none">
            <Link 
              href="/" 
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors font-sans"
            >
              Back to homepage
            </Link>
          </div>

        </div>

      </div>
  );
}
