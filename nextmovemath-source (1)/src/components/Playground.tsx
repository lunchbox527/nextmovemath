import React, { useState, useEffect } from 'react';
import AdBanner from './AdBanner';
import { AD_PRESETS } from '../data/adPresets';
import { Monitor, Smartphone, Tablet, Laptop, Maximize2, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, Sliders, Eye, Sparkles } from 'lucide-react';

interface PlaygroundProps {
  publisherId: string;
  setPublisherId: (id: string) => void;
  slotId: string;
  setSlotId: (slot: string) => void;
  adFormat: string;
  setAdFormat: (fmt: string) => void;
  fullWidthResponsive: boolean;
  setFullWidthResponsive: (val: boolean) => void;
  simulationMode: boolean;
  setSimulationMode: (val: boolean) => void;
}

export default function Playground({
  publisherId,
  setPublisherId,
  slotId,
  setSlotId,
  adFormat,
  setAdFormat,
  fullWidthResponsive,
  setFullWidthResponsive,
  simulationMode,
  setSimulationMode
}: PlaygroundProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('auto-responsive');
  const [viewportWidth, setViewportWidth] = useState<'100%' | '1200px' | '1024px' | '768px' | '390px'>('100%');
  const [reserveHeight, setReserveHeight] = useState<boolean>(true);
  const [minHeightVal, setMinHeightVal] = useState<number>(100);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [pushCount, setPushCount] = useState<number>(1);
  const [creativeIdx, setCreativeIdx] = useState<number>(0);
  const [adBlocked, setAdBlocked] = useState<boolean>(false);
  const [reloading, setReloading] = useState<boolean>(false);

  // Check window.adsbygoogle status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasScript = !!document.querySelector('script[src*="adsbygoogle"]');
      setScriptLoaded(hasScript && !!window.adsbygoogle);
    }
  }, []);

  const handleApplyPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const found = AD_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setAdFormat(found.adFormat);
      setFullWidthResponsive(found.fullWidthResponsive);
      if (typeof found.height === 'number') {
        setMinHeightVal(found.height);
      } else {
        setMinHeightVal(found.adFormat === 'vertical' ? 600 : 100);
      }
    }
  };

  const handleInjectAdSenseScript = () => {
    if (typeof window === 'undefined') return;
    const existing = document.querySelector('script[src*="adsbygoogle"]');
    if (existing) {
      alert('Google AdSense script tag is already loaded in <head>');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      setScriptLoaded(true);
    };
    script.onerror = () => {
      setAdBlocked(true);
      setScriptLoaded(false);
    };
    document.head.appendChild(script);
  };

  const handleTriggerReload = () => {
    setReloading(true);
    setCreativeIdx((prev) => prev + 1);
    setPushCount((prev) => prev + 1);
    setTimeout(() => setReloading(false), 250);
  };

  const currentPreset = AD_PRESETS.find((p) => p.id === selectedPreset);

  return (
    <div className="space-y-6">
      {/* Top Banner Context / Notification */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">Google AdSense AdBanner Playground</h2>
              <span className="text-xs text-sky-400 font-mono">Next.js Client Component</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Configure parameters, test responsive behaviors across device breakpoints, and simulate slot performance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setSimulationMode(true)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  simulationMode
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Simulation Mode
              </button>
              <button
                onClick={() => setSimulationMode(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  !simulationMode
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Real AdSense Tag
              </button>
            </div>

            <button
              onClick={handleTriggerReload}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Refresh / Cycle Ad Creative"
            >
              <RefreshCw className={`w-4 h-4 ${reloading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Controls Sidebar + Viewport Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Ad Unit Presets */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Ad Unit Format Preset
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {AD_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`w-full text-left p-2.5 rounded text-xs transition-colors flex items-center justify-between border ${
                    selectedPreset === preset.id
                      ? 'border-sky-500/80 bg-sky-950/40 text-white font-medium'
                      : 'border-slate-800/80 bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate font-medium">{preset.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {typeof preset.width === 'number' ? `${preset.width}x${preset.height}` : 'Fluid'} · {preset.adFormat}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 tabular-nums">
                    {preset.avgCPM}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* AdSense Attributes Form */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Component Attributes
              </span>
              <span className="text-[10px] text-slate-500 font-mono">AdBanner.tsx</span>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                data-ad-client (Publisher ID)
              </label>
              <input
                type="text"
                value={publisherId}
                onChange={(e) => setPublisherId(e.target.value)}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white font-mono focus:border-sky-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Found in your Google AdSense Dashboard (starts with <code className="text-slate-400">ca-pub-</code>)
              </span>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                data-ad-slot (Slot Identifier)
              </label>
              <input
                type="text"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                placeholder="1234567890"
                className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white font-mono focus:border-sky-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Unique numeric ID created in AdSense &gt; Ads &gt; By ad unit
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  data-ad-format
                </label>
                <select
                  value={adFormat}
                  onChange={(e) => setAdFormat(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="auto">auto</option>
                  <option value="rectangle">rectangle</option>
                  <option value="horizontal">horizontal</option>
                  <option value="vertical">vertical</option>
                  <option value="fluid">fluid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  full-width-responsive
                </label>
                <select
                  value={fullWidthResponsive ? 'true' : 'false'}
                  onChange={(e) => setFullWidthResponsive(e.target.value === 'true')}
                  className="w-full px-2.5 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
            </div>

            {/* Layout Shift / CLS Prevention */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span>Reserve min-height (CLS Prevention)</span>
                </label>
                <input
                  type="checkbox"
                  checked={reserveHeight}
                  onChange={(e) => setReserveHeight(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-0"
                />
              </div>

              {reserveHeight && (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="10"
                    value={minHeightVal}
                    onChange={(e) => setMinHeightVal(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                  <span className="text-xs font-mono text-slate-400 tabular-nums w-12 text-right">
                    {minHeightVal}px
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Diagnostic Console */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                AdSense Runtime Health
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Diagnostic</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Global `adsbygoogle`</span>
                <span className="font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Initialized
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Pushes Executed</span>
                <span className="font-mono text-slate-200 tabular-nums">{pushCount} call(s)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Head Script Tag</span>
                {scriptLoaded ? (
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Injected
                  </span>
                ) : (
                  <button
                    onClick={handleInjectAdSenseScript}
                    className="text-sky-400 hover:text-sky-300 text-[11px] underline font-medium"
                  >
                    Inject Script Now
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">AdBlock Shield</span>
                {adBlocked ? (
                  <span className="text-rose-400 font-mono flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Detected
                  </span>
                ) : (
                  <span className="text-slate-400 font-mono">Not Triggered</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Viewport & Banner Canvas Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Breakpoint Switcher Bar */}
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewportWidth('100%')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewportWidth === '100%' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Full Container Width (100%)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fluid</span>
              </button>
              <button
                onClick={() => setViewportWidth('1200px')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewportWidth === '1200px' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop (1200px)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewportWidth('1024px')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewportWidth === '1024px' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Laptop (1024px)"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Laptop</span>
              </button>
              <button
                onClick={() => setViewportWidth('768px')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewportWidth === '768px' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setViewportWidth('390px')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                  viewportWidth === '390px' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Width: <span className="text-slate-200">{viewportWidth}</span>
            </div>
          </div>

          {/* Active Preset Metadata Banner */}
          {currentPreset && (
            <div className="rounded border border-slate-800/80 bg-slate-950 px-3.5 py-2 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="text-slate-300">
                <span className="font-semibold text-white">{currentPreset.name}</span>
                <span className="mx-2 text-slate-600">·</span>
                <span className="text-slate-400">{currentPreset.description}</span>
              </div>
              <div className="text-slate-500 font-mono text-[11px] shrink-0">
                Placement: {currentPreset.recommendedPosition}
              </div>
            </div>
          )}

          {/* Canvas Container with Frame */}
          <div className="min-h-[420px] rounded-lg border border-slate-800 bg-slate-950 p-6 flex flex-col items-center justify-center overflow-x-auto relative">
            {/* Viewport Frame */}
            <div
              style={{
                width: viewportWidth,
                maxWidth: '100%',
                transition: 'width 0.25s ease-in-out'
              }}
              className="relative mx-auto rounded border border-dashed border-slate-800 bg-slate-900/30 p-4"
            >
              <div className="text-[10px] font-mono text-slate-500 mb-2 flex items-center justify-between">
                <span>VIEWPORT CONTAINER: {viewportWidth}</span>
                <span>CLS RESERVE: {reserveHeight ? `${minHeightVal}px` : 'None'}</span>
              </div>

              {/* THE ADBANNER COMPONENT IN ACTION */}
              <AdBanner
                dataAdSlot={slotId}
                dataAdClient={publisherId}
                dataAdFormat={adFormat}
                dataFullWidthResponsive={fullWidthResponsive}
                simulation={simulationMode}
                minHeight={reserveHeight ? minHeightVal : undefined}
                slotLabel={`Unit: ${currentPreset?.name || 'Custom'}`}
                creativeIndex={creativeIdx}
              />
            </div>
          </div>

          {/* Code Representation of Currently Configured Tag */}
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>Next.js JSX Usage</span>
              <span className="text-sky-400">app/page.tsx</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-3 bg-slate-900 rounded border border-slate-800/80">
              <code>{`<AdBanner
  dataAdSlot="${slotId}"
  dataAdClient="${publisherId}"
  dataAdFormat="${adFormat}"
  dataFullWidthResponsive="${fullWidthResponsive}"
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
