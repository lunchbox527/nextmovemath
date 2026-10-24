import React, { useState } from "react";
import { Mail, Send, CheckCircle2, Shield } from "lucide-react";

interface ContactProps {
  onNavigate: (path: string, e?: React.MouseEvent) => void;
}

export const ContactView: React.FC<ContactProps> = ({ onNavigate }) => {
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
      <nav aria-label="Breadcrumb" className="text-xs text-[#60746d] mb-6 flex items-center gap-2">
        <a href="/" onClick={(e) => onNavigate("/", e)} className="hover:text-[#17312d] underline">
          Home
        </a>
        <span>/</span>
        <span className="text-[#17312d] font-semibold">Contact Us</span>
      </nav>

      <header className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f2e9] border border-[#2e7450]/20 text-[#2e7450] text-xs font-bold uppercase tracking-wider mb-3">
          <Mail className="w-4 h-4" />
          Reader Support & Editorial Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17312d] tracking-tight m-0 mb-3">
          Contact NextMoveMath
        </h1>
        <p className="text-[#60746d] text-sm sm:text-base m-0 leading-relaxed">
          Have a question about one of our mortgage formulas, spotted a provincial or state transfer-tax update, or want to suggest a new moving scenario? Get in touch with our team.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-[#17312d] text-lg m-0">
              Direct Email & Hours
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#60746d]">
              <div>
                <span className="block font-bold text-[#17312d]">Editorial & Support Email:</span>
                <a
                  href="mailto:support@nextmovemath.com"
                  className="text-[#2e7450] hover:underline font-medium break-all"
                >
                  support@nextmovemath.com
                </a>
              </div>

              <div>
                <span className="block font-bold text-[#17312d]">Response Window:</span>
                <span>Monday – Friday, typically within 24 to 48 business hours.</span>
              </div>

              <div>
                <span className="block font-bold text-[#17312d]">Coverage Area:</span>
                <span>Residential moving & mortgage math across Canada and the United States.</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fffdf8] border border-[rgba(23,49,45,0.12)] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#2e7450] font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Important Note
            </div>
            <p className="text-xs text-[#60746d] leading-relaxed m-0">
              NextMoveMath is an educational publisher and software utility—we cannot provide personalized legal, tax, or mortgage underwriting sign-off. For details on how we handle messages, view our{" "}
              <a href="/privacy-policy" onClick={(e) => onNavigate("/privacy-policy", e)} className="text-[#2e7450] underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white border border-[rgba(23,49,45,0.15)] rounded-2xl p-6 sm:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e7f2e9] text-[#2e7450] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#17312d] m-0">
                  Thank You for Reaching Out
                </h2>
                <p className="text-sm text-[#60746d] max-w-md mx-auto">
                  We have prepared your inquiry, <strong>{name}</strong>. You can also email us directly anytime at <strong>support@nextmovemath.com</strong>.
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
                    Write Another Note
                  </button>
                  <a
                    href="/"
                    onClick={(e) => onNavigate("/", e)}
                    className="px-4 py-2 rounded-xl bg-[#2e7450] text-xs font-bold text-white hover:bg-[#255f41] no-underline"
                  >
                    Return to Calculator
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif font-bold text-[#17312d] text-xl m-0 mb-1">
                  Send a Message to Our Team
                </h2>
                <p className="text-xs text-[#60746d] m-0 mb-4">
                  Share feedback, report a calculation edge case, or suggest an article topic for our real estate math library.
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
                      placeholder="Alex Morgan"
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
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17312d] mb-1">
                    Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40"
                  >
                    <option value="feedback">Calculator Feedback & Feature Request</option>
                    <option value="math">Formula / Stress Test / DTI Question</option>
                    <option value="editorial">Editorial Guide Suggestion or Correction</option>
                    <option value="bug">Report a Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17312d] mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what scenario you are modeling or how we can improve NextMoveMath..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[rgba(23,49,45,0.2)] bg-[#fffdf8] text-sm text-[#17312d] focus:outline-none focus:ring-2 focus:ring-[#2e7450]/40 resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#60746d]">* Required fields</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#2e7450] hover:bg-[#255f41] text-white text-xs font-bold transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
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
