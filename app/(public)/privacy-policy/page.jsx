"use client";
import { useState } from 'react';
import { Shield, FileText, Lock, Eye, User, Cookie, ArrowRight, Sparkles } from 'lucide-react';

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('introduction');

    const sections = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'data-collection', title: 'Data Collection' },
        { id: 'data-usage', title: 'Data Usage' },
        { id: 'data-sharing', title: 'Data Sharing' },
        { id: 'user-rights', title: 'Your Rights' },
        { id: 'cookies', title: 'Cookies' },
        { id: 'security', title: 'Security' },
        { id: 'changes', title: 'Policy Changes' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a]">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-80 h-80 bg-[#4BA4B4]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B45B4B]/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 mb-6">
                            <Shield className="w-5 h-5 text-[#B45B4B]" />
                            <span className="text-white font-semibold text-sm">Privacy & Trust</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 unbounded-600">
                            Privacy
                            <span className="block bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] bg-clip-text text-transparent">
                                Policy
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Your privacy is our priority. This policy explains how Kanqoo collects, uses, and protects your personal information when you use our platform.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4 text-[#4BA4B4]" />
                                <span>Last Updated: Dec 15, 2024</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-[#4BA4B4]" />
                                <span>Transparent Practices</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#4BA4B4]" />
                                <span>User-First Approach</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-8">
                                <h3 className="text-white font-bold text-lg mb-6 unbounded-600">Policy Sections</h3>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${activeSection === section.id
                                                    ? 'bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] text-white'
                                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                                }`}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>

                                {/* Quick Actions */}
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center justify-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                                {/* Introduction */}
                                {activeSection === 'introduction' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Introduction</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                Welcome to Kanqoo. We are committed to protecting your privacy and ensuring transparency in how we handle your personal information. This Privacy Policy applies to all users of our platform, including brands, creators, and visitors.
                                            </p>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 my-6">
                                                <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                                                    <Sparkles className="w-5 h-5 text-[#B45B4B]" />
                                                    Key Principles
                                                </h4>
                                                <ul className="text-gray-300 space-y-2">
                                                    <li className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span>We only collect necessary information to provide our services</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span>Your data is never sold to third parties</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span>You have full control over your personal information</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <h3 className="text-white font-bold text-xl mt-8 mb-4">Scope</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                This policy covers all personal information collected through our website, mobile applications, and services. By using Kanqoo, you agree to the practices described in this policy.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Data Collection */}
                                {activeSection === 'data-collection' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Data Collection</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                We collect information that helps us provide and improve our services, while respecting your privacy.
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                    <User className="w-8 h-8 text-[#4BA4B4] mb-3" />
                                                    <h4 className="text-white font-bold mb-2">Personal Information</h4>
                                                    <ul className="text-gray-300 text-sm space-y-1">
                                                        <li>• Name and contact details</li>
                                                        <li>• Account credentials</li>
                                                        <li>• Profile information</li>
                                                        <li>• Payment information</li>
                                                    </ul>
                                                </div>

                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                    <Eye className="w-8 h-8 text-[#B45B4B] mb-3" />
                                                    <h4 className="text-white font-bold mb-2">Usage Data</h4>
                                                    <ul className="text-gray-300 text-sm space-y-1">
                                                        <li>• Platform interactions</li>
                                                        <li>• Campaign performance</li>
                                                        <li>• Device information</li>
                                                        <li>• Analytics data</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <h3 className="text-white font-bold text-xl mt-8 mb-4">Legal Basis</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                We process your data based on legitimate business interests, contractual necessities, and with your consent where required by law.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Data Usage */}
                                {activeSection === 'data-usage' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">How We Use Your Data</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                Your information enables us to provide, maintain, and improve our services while ensuring a secure experience.
                                            </p>

                                            <div className="space-y-4 my-6">
                                                {[
                                                    {
                                                        title: "Service Delivery",
                                                        description: "To facilitate connections between brands and creators, process payments, and provide customer support"
                                                    },
                                                    {
                                                        title: "Platform Improvement",
                                                        description: "To analyze usage patterns and enhance user experience through feature development"
                                                    },
                                                    {
                                                        title: "Communication",
                                                        description: "To send important updates, security alerts, and marketing communications (with consent)"
                                                    },
                                                    {
                                                        title: "Security & Compliance",
                                                        description: "To protect our platform, prevent fraud, and comply with legal obligations"
                                                    }
                                                ].map((use, index) => (
                                                    <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                        <h4 className="text-white font-bold mb-2">{use.title}</h4>
                                                        <p className="text-gray-300 text-sm">{use.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Data Sharing */}
                                {activeSection === 'data-sharing' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Data Sharing</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                We are transparent about when and why we share your information.
                                            </p>

                                            <div className="bg-gradient-to-r from-[#4BA4B4]/20 to-[#B45B4B]/20 rounded-2xl p-6 border border-white/10 my-6">
                                                <h4 className="text-white font-bold text-lg mb-3">We Never Sell Your Data</h4>
                                                <p className="text-gray-300">
                                                    Kanqoo does not sell, trade, or rent your personal information to third parties for marketing purposes.
                                                </p>
                                            </div>

                                            <h3 className="text-white font-bold text-xl mt-8 mb-4">Limited Sharing Scenarios</h3>
                                            <div className="space-y-3">
                                                {[
                                                    "With your explicit consent for specific purposes",
                                                    "With service providers who assist our operations (under strict confidentiality)",
                                                    "For legal compliance and protection of rights",
                                                    "During business transfers like mergers or acquisitions"
                                                ].map((scenario, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-gray-300">{scenario}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* User Rights */}
                                {activeSection === 'user-rights' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Your Rights</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                You have comprehensive rights regarding your personal data under applicable privacy laws.
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                                {[
                                                    { right: "Access", desc: "View what data we have about you" },
                                                    { right: "Correction", desc: "Update inaccurate information" },
                                                    { right: "Deletion", desc: "Request data removal" },
                                                    { right: "Portability", desc: "Receive your data in usable format" },
                                                    { right: "Objection", desc: "Opt-out of certain processing" },
                                                    { right: "Restriction", desc: "Limit how we use your data" }
                                                ].map((item, index) => (
                                                    <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
                                                        <div className="text-[#4BA4B4] font-bold text-lg mb-2">{item.right}</div>
                                                        <div className="text-gray-300 text-sm">{item.desc}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                <h4 className="text-white font-bold text-lg mb-3">Exercising Your Rights</h4>
                                                <p className="text-gray-300 mb-4">
                                                    To exercise any of these rights, contact our privacy team at privacy@kanqoo.com. We respond to all legitimate requests within 30 days.
                                                </p>
                                                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    <span>Contact Privacy Team</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Cookies */}
                                {activeSection === 'cookies' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Cookies & Tracking</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                We use cookies and similar technologies to enhance your experience and analyze platform usage.
                                            </p>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 my-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Cookie className="w-6 h-6 text-[#B45B4B]" />
                                                    <h4 className="text-white font-bold text-lg">Cookie Types We Use</h4>
                                                </div>
                                                <div className="space-y-4">
                                                    {[
                                                        {
                                                            type: "Essential",
                                                            purpose: "Required for platform functionality and security"
                                                        },
                                                        {
                                                            type: "Analytical",
                                                            purpose: "Help us understand how users interact with our platform"
                                                        },
                                                        {
                                                            type: "Functional",
                                                            purpose: "Remember your preferences and settings"
                                                        },
                                                        {
                                                            type: "Marketing",
                                                            purpose: "Deliver relevant advertisements (with consent)"
                                                        }
                                                    ].map((cookie, index) => (
                                                        <div key={index} className="border-l-2 border-[#4BA4B4] pl-4">
                                                            <div className="text-white font-semibold">{cookie.type}</div>
                                                            <div className="text-gray-300 text-sm">{cookie.purpose}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <h3 className="text-white font-bold text-xl mt-8 mb-4">Cookie Management</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                You can control cookie settings through your browser preferences. Note that disabling essential cookies may affect platform functionality.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Security */}
                                {activeSection === 'security' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Data Security</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                We implement robust security measures to protect your information from unauthorized access and misuse.
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-6 my-8">
                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                    <Lock className="w-8 h-8 text-[#4BA4B4] mb-3" />
                                                    <h4 className="text-white font-bold mb-2">Technical Measures</h4>
                                                    <ul className="text-gray-300 text-sm space-y-1">
                                                        <li>• End-to-end encryption</li>
                                                        <li>• Regular security audits</li>
                                                        <li>• Secure data centers</li>
                                                        <li>• Access controls</li>
                                                    </ul>
                                                </div>

                                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                    <Shield className="w-8 h-8 text-[#B45B4B] mb-3" />
                                                    <h4 className="text-white font-bold mb-2">Organizational Measures</h4>
                                                    <ul className="text-gray-300 text-sm space-y-1">
                                                        <li>• Employee training</li>
                                                        <li>• Privacy by design</li>
                                                        <li>• Incident response plans</li>
                                                        <li>• Regular assessments</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-[#4BA4B4]/20 to-[#B45B4B]/20 rounded-2xl p-6 border border-white/10">
                                                <h4 className="text-white font-bold text-lg mb-3">Our Commitment</h4>
                                                <p className="text-gray-300">
                                                    We continuously monitor and update our security practices to address emerging threats and maintain the highest standards of data protection.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Policy Changes */}
                                {activeSection === 'changes' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Policy Changes</h2>

                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                We may update this Privacy Policy to reflect changes in our practices, services, or legal requirements.
                                            </p>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 my-6">
                                                <h4 className="text-white font-bold text-lg mb-3">Update Process</h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-gray-300">We will notify you of significant changes via email or platform notifications</span>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-gray-300">Continued use of our services after changes constitutes acceptance</span>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-gray-300">We maintain version history of all policy changes</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="text-white font-bold text-xl mt-8 mb-4">Contact Information</h3>
                                            <p className="text-gray-300 leading-relaxed mb-4">
                                                For questions about this Privacy Policy or our data practices, contact us at:
                                            </p>
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                <div className="text-white font-semibold">Kanqoo Privacy Team</div>
                                                <div className="text-[#4BA4B4]">privacy@kanqoo.com</div>
                                                <div className="text-gray-300 text-sm mt-2">We typically respond within 24-48 hours</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}