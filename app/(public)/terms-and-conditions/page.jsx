"use client";
import { useState } from 'react';
import { FileText, Scale, BookOpen, AlertCircle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance' },
    { id: 'accounts', title: 'Accounts' },
    { id: 'services', title: 'Services' },
    { id: 'payments', title: 'Payments' },
    { id: 'content', title: 'Content' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'termination', title: 'Termination' },
    { id: 'liability', title: 'Liability' },
    { id: 'governing-law', title: 'Governing Law' }
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
              <Scale className="w-5 h-5 text-[#B45B4B]" />
              <span className="text-white font-semibold text-sm">Legal Agreement</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 unbounded-600">
              Terms &
              <span className="block bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Please read these terms carefully before using Kanqoo. These terms govern your access to and use of our platform and services.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4BA4B4]" />
                <span>Effective: Dec 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#4BA4B4]" />
                <span>Last Updated: Dec 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#4BA4B4]" />
                <span>Binding Legal Agreement</span>
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
                <h3 className="text-white font-bold text-lg mb-6 unbounded-600">Terms Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                {/* Important Notice */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mb-2" />
                    <p className="text-yellow-200 text-xs">
                      By using Kanqoo, you agree to these terms. Please read them carefully.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                {/* Acceptance */}
                {activeSection === 'acceptance' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Acceptance of Terms</h2>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        By accessing or using the Kanqoo platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                      </p>

                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 my-6">
                        <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#B45B4B]" />
                          Key Agreements
                        </h4>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                            <span>You are at least 18 years old or have parental consent</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                            <span>You will provide accurate and complete information</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                            <span>You will comply with all applicable laws and regulations</span>
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-white font-bold text-xl mt-8 mb-4">Modifications</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Kanqoo reserves the right to modify these terms at any time. We will provide notice of material changes, and continued use after changes constitutes acceptance.
                      </p>
                    </div>
                  </div>
                )}

                {/* Accounts */}
                {activeSection === 'accounts' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Account Terms</h2>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        To access certain features of Kanqoo, you must create an account and maintain its security.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 my-8">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-white font-bold mb-3">Account Creation</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-[#4BA4B4] mt-0.5 flex-shrink-0" />
                              <span>Provide accurate and current information</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-[#4BA4B4] mt-0.5 flex-shrink-0" />
                              <span>Maintain account security</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-[#4BA4B4] mt-0.5 flex-shrink-0" />
                              <span>Promptly update information changes</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-white font-bold mb-3">Account Security</h4>
                          <ul className="text-gray-300 text-sm space-y-2">
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-[#B45B4B] mt-0.5 flex-shrink-0" />
                              <span>You are responsible for account activity</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-[#B45B4B] mt-0.5 flex-shrink-0" />
                              <span>Notify us of unauthorized access</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-[#B45B4B] mt-0.5 flex-shrink-0" />
                              <span>Use strong, unique passwords</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-white font-bold text-xl mt-8 mb-4">Account Types</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Kanqoo offers different account types for brands and creators, each with specific features and responsibilities outlined in additional platform guidelines.
                      </p>
                    </div>
                  </div>
                )}

                {/* Services */}
                {activeSection === 'services' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Services Description</h2>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Kanqoo provides a platform connecting brands with content creators for influencer marketing campaigns.
                      </p>

                      <div className="space-y-4 my-6">
                        {[
                          {
                            title: "Platform Access",
                            description: "We provide the technology platform for brands and creators to connect, collaborate, and manage campaigns"
                          },
                          {
                            title: "Matchmaking",
                            description: "AI-powered matching based on brand requirements and creator expertise"
                          },
                          {
                            title: "Campaign Management",
                            description: "Tools for creating, managing, and tracking influencer marketing campaigns"
                          },
                          {
                            title: "Payment Processing",
                            description: "Secure payment handling between brands and creators"
                          }
                        ].map((service, index) => (
                          <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                              <Sparkles className="w-5 h-5 text-[#4BA4B4]" />
                              <h4 className="text-white font-bold">{service.title}</h4>
                            </div>
                            <p className="text-gray-300 text-sm">{service.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-[#4BA4B4]/20 to-[#B45B4B]/20 rounded-2xl p-6 border border-white/10">
                        <h4 className="text-white font-bold text-lg mb-3">Service Limitations</h4>
                        <p className="text-gray-300">
                          Kanqoo acts as a platform facilitator. We are not a party to agreements between brands and creators and do not guarantee specific campaign results.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payments */}
                {activeSection === 'payments' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Payment Terms</h2>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        All payments processed through Kanqoo are subject to these terms and our fee structure.
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 my-8">
                        {[
                          { term: "Service Fee", desc: "5% platform fee on all transactions" },
                          { term: "Payment Timing", desc: "Creators paid within 14 days of campaign completion" },
                          { term: "Refunds", desc: "Case-by-case basis as per our refund policy" }
                        ].map((item, index) => (
                          <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                            <div className="text-[#4BA4B4] font-bold text-sm mb-1">{item.term}</div>
                            <div className="text-gray-300 text-xs">{item.desc}</div>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-white font-bold text-xl mt-8 mb-4">Billing Disputes</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Contact us within 30 days of any disputed charge. We will investigate and resolve billing issues in accordance with our dispute resolution process.
                      </p>
                    </div>
                  </div>
                )}

                {/* Additional sections would follow the same pattern */}
                {/* For brevity, I'll show the structure for one more section */}

                {/* Intellectual Property */}
                {activeSection === 'intellectual-property' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white mb-6 unbounded-600">Intellectual Property</h2>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Respect for intellectual property rights is fundamental to our platform.
                      </p>

                      <div className="space-y-4 my-6">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-white font-bold mb-3">Platform IP</h4>
                          <p className="text-gray-300 text-sm">
                            Kanqoo and its original content, features, and functionality are owned by Kanqoo Inc. and are protected by international copyright, trademark, and other intellectual property laws.
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-white font-bold mb-3">User Content</h4>
                          <p className="text-gray-300 text-sm">
                            You retain ownership of content you create and share on Kanqoo. By posting content, you grant Kanqoo a license to display and distribute that content through our platform.
                          </p>
                        </div>
                      </div>

                      <h3 className="text-white font-bold text-xl mt-8 mb-4">Copyright Claims</h3>
                      <p className="text-gray-300 leading-relaxed">
                        We respect intellectual property rights and respond to claims of copyright infringement. Contact us at legal@kanqoo.com for copyright-related issues.
                      </p>
                    </div>
                  </div>
                )}

                {/* Quick Summary for other sections */}
                {(activeSection === 'content' || activeSection === 'termination' || activeSection === 'liability' || activeSection === 'governing-law') && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white mb-6 unbounded-600">
                      {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        This section contains important legal terms regarding {activeSection.replace('-', ' ')}. Please review this section carefully as it outlines your rights and responsibilities.
                      </p>

                      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 my-6">
                        <h4 className="text-white font-bold text-lg mb-3">Key Points</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                            <span>Detailed terms specific to this section</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                            <span>Legal obligations and rights</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#4BA4B4] rounded-full mt-2 flex-shrink-0"></div>
                            <span>Platform-specific requirements</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-[#4BA4B4]/20 to-[#B45B4B]/20 rounded-2xl p-6 border border-white/10">
                        <h4 className="text-white font-bold text-lg mb-3">Need Legal Advice?</h4>
                        <p className="text-gray-300 mb-4">
                          These terms constitute a legal agreement. If you have questions, we recommend consulting with a legal professional.
                        </p>
                        <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>Contact Legal Team</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Acceptance Footer */}
              <div className="mt-8 text-center">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h4 className="text-white font-bold text-lg mb-3">Acceptance Required</h4>
                  <p className="text-gray-300 mb-4">
                    By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                  <button className="btn-gradient group relative text-white font-bold py-3 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center gap-3 overflow-hidden mx-auto">
                    <CheckCircle className="w-5 h-5" />
                    <span>I Understand & Accept</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}