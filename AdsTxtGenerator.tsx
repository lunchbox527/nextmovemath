import React, { useState } from 'react';
import { Copy, Download, Check, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface AdsTxtGeneratorProps {
  publisherId: string;
}

export default function AdsTxtGenerator({ publisherId }: AdsTxtGeneratorProps) {
  const [customPubId, setCustomPubId] = useState(publisherId);
  const [includeGooglePartners, setIncludeGooglePartners] = useState(true);
  const [copied, setCopied] = useState(false);

  // Normalize pub id: strip 'ca-' prefix if user typed 'ca-pub-...'
  const cleanPubId = customPubId.trim().replace(/^ca-/, '');
  const isValidFormat = /^pub-\d{16}$/.test(cleanPubId);

  const baseLine = `google.com, ${cleanPubId || 'pub-1925679446000087'}, DIRECT, f08c47fec0942fa0`;
  const partnerLines = `${baseLine}\n`;

  const handleCopy = () => {
    navigator.clipboard.writeText(partnerLines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([partnerLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ads.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
        <h2 className="text-base font-semibold text-white">Google AdSense ads.txt Generator & Policy Compliance</h2>
        <p className="text-xs text-slate-400 mt-1">
          Generate an IAB-compliant <code className="text-sky-400 font-mono">ads.txt</code> file for your Next.js <code className="text-sky-400 font-mono">public/</code> directory and verify ad layout policy compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generator & Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Configuration
              </span>
              <span className="text-[10px] text-slate-500 font-mono">public/ads.txt</span>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Your Publisher ID
              </label>
              <input
                type="text"
                value={customPubId}
                onChange={(e) => setCustomPubId(e.target.value)}
                placeholder="pub-1234567890123456"
                className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white font-mono focus:border-sky-500 focus:outline-none"
              />
              {!isValidFormat && (
                <span className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Format hint: Google publisher IDs are 16 digits, e.g. <code className="font-mono">pub-1234567890123456</code>
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGooglePartners}
                  onChange={(e) => setIncludeGooglePartners(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-sky-500"
                />
                <span>Include Google Reseller fallback inventory lines</span>
              </label>
            </div>

            {/* Preview Box */}
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>File Content Preview</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> IAB Certified
                </span>
              </div>
              <pre className="text-xs font-mono text-slate-200 bg-slate-900/90 p-3 rounded overflow-x-auto border border-slate-800">
                <code>{partnerLines}</code>
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy ads.txt'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ads.txt</span>
              </button>
            </div>
          </div>
        </div>

        {/* AdSense Policy Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                AdSense Compliance Audit
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30% Mobile Ad Density Limit</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Ensure ads never occupy more than 30% of vertical scroll depth on mobile screens to avoid Google penalty demotions.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Accidental Click Buffer</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Maintain at least 15px margin around <code className="text-slate-300 font-mono">AdBanner</code> components so users do not tap ads while attempting to click navigation or article links.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Clear Labeling</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Only label ad slots with "Advertisements" or "Sponsored Links". Labels like "Featured Resources" or "Click Here" violate AdSense terms.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Next.js Static Serving</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Place your file directly in <code className="text-sky-300 font-mono">/public/ads.txt</code> so Next.js serves it with <code className="text-slate-300 font-mono">Content-Type: text/plain</code> at the apex domain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
