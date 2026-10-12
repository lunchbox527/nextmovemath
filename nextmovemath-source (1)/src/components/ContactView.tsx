import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Shield, HelpCircle, ArrowRight } from "lucide-react";

interface ContactProps {
  onGoToCalculator: () => void;
}

export const ContactView: React.FC<ContactProps> = ({ onGoToCalculator }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feedback");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <Mail className="w-4 h-4" />
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight">
          Contact NextMoveMath
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base mt-3 leading-relaxed">
          Questions about our calculations, suggestions for new features, or media inquiries? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-[#17312d] text-lg">
              Direct Contact
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-[#60746d]">
              <div>
                <span className="block font-bold text-[#17312d]">Email Support:</span>
                <a
                  href="mailto:support@nextmovemath.com"
                  className="text-[#2e7450] hover:underline font-medium break-all"
                >
                  support@nextmovemath.com
                </a>
              </div>

              <div>
                <span className="block font-bold text-[#17312d]">Response Time:</span>
                <span>We reply to all inquiries within 24 to 48 business hours.</span>
              </div>

              <div>
                <span className="block font-bold text-[#17312d]">Location:</span>
                <span>Serving home buyers and sellers across Canada and the United States.</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fffdf8] border border-[rgba(23,49,45,0.12)] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#2e7450] font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Privacy Commitment
            </div>
            <p className="text-xs text-[#60746d] leading-relaxed">
              We never share your email address or use your contact information for unsolicited marketing. Your message goes straight to our editorial and engineering team.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2">
          <div className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e7f2e9] text-[#2e7450] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#17312d]">
                  Message Received!
                </h3>
                <p className="text-sm text-[#60746d] max-w-md mx-auto">
                  Thank you for reaching out, <strong>{name}</strong>. Our team will review your message and get back to you at <strong>{email}</strong> shortly.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage("");
                    }}
                    className="px-4 py-2 rounded-xl border border-[rgba(23,49,45,0.2)] text-xs font-bold text-[#17312d] hover:bg-[#f4efe5] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    type="button"
                    onClick={onGoToCalculator}
                    className="px-4 py-2 rounded-xl bg-[#2e7450] text-xs font-bold text-white hover:bg-[#255f41] cursor-pointer"
                  >
                    Back to Calculator
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif font-bold text-[#17312d] text-xl mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-[#60746d] mb-4">
                  Fill out the form below and we'll route your inquiry to the right person.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17312d] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17312d] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17312d] mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40"
                  >
                    <option value="feedback">General Feedback & Suggestions</option>
                    <option value="math">Mortgage Calculation / Stress Test Question</option>
                    <option value="feature">Suggest a Province, State, or Tax Schedule</option>
                    <option value="partnership">Media & Partnership Inquiries</option>
                    <option value="bug">Report a Bug or Calculation Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17312d] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you with your mortgage or real estate move calculation?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40 resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#60746d]">
                    * All fields required.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
