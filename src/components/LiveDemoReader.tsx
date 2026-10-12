import React, { useState } from 'react';
import AdBanner from './AdBanner';
import { Eye, Layout, Sliders, ChevronDown, CheckCircle2, Globe, Sparkles, BookOpen, Utensils, Briefcase, Cpu } from 'lucide-react';

interface LiveDemoReaderProps {
  publisherId: string;
  simulationMode: boolean;
  initialSiteType?: string;
}

export default function LiveDemoReader({
  publisherId,
  simulationMode,
  initialSiteType = 'blog'
}: LiveDemoReaderProps) {
  const [siteType, setSiteType] = useState<string>(initialSiteType);
  const [showTopAd, setShowTopAd] = useState(true);
  const [showInArticleAd, setShowInArticleAd] = useState(true);
  const [showSidebarAd, setShowSidebarAd] = useState(true);
  const [showFooterAd, setShowFooterAd] = useState(true);
  const [showAnchorAd, setShowAnchorAd] = useState(false);
  const [anchorCollapsed, setAnchorCollapsed] = useState(false);
  const [inspectOutlines, setInspectOutlines] = useState(false);

  // Content configurations for different site types
  const siteConfigs = {
    blog: {
      name: 'Wanderlust & Living',
      tagline: 'Stories of Travel, Home, and Everyday Adventures',
      badge: 'Travel & Lifestyle',
      date: 'September 2026',
      readTime: '5 min read',
      author: 'Elena Vance',
      authorBio: 'Travel photographer & freelance writer based in Portland',
      title: '7 Hidden Coastal Towns in Southern Europe You Must Visit This Year',
      subtitle: 'From secret sapphire coves in Portugal to quiet sunlit stone villages along the Adriatic coast.',
      image: '/src/assets/images/travel_coastal_1790735383166.jpg',
      p1: 'Traveling off the beaten path changes how you experience a place. When you step away from overcrowded tourist capitals, you discover slow morning espresso bars, cobblestone alleys draped in bougainvillea, and locals who greet you with genuine warmth.',
      p2: 'One of our favorite discoveries this season was a quiet fishing village where the daily catch is cooked right on the dock over sea salt and lemon. Setting your pace to match the rhythm of the ocean is the ultimate reset.',
      subhead1: 'Finding Secret Coves Before The Crowds Arrive',
      p3: 'Pack light, wake up early, and rent a bicycle or small scooter. The best beaches rarely have paved parking lots—they reward those willing to wander down rocky pine-scented footpaths.',
      subhead2: 'Where to Eat Authentic Local Dishes',
      p4: 'Always ask local shopkeepers where they eat lunch with their families on Sundays. That is where you will taste the freshest regional olive oil, warm crusty sourdough bread, and recipes passed down through generations.',
    },
    recipe: {
      name: 'The Rustic Apron',
      tagline: 'Simple, wholesome family dinners made with love',
      badge: 'Comfort Cooking',
      date: 'September 2026',
      readTime: '15 min prep · 25 min cook',
      author: 'Chef Marcus Bennett',
      authorBio: 'Home cook, recipe tester, and culinary instructor',
      title: '20-Minute Creamy Tuscan Garlic & Cherry Tomato Pasta',
      subtitle: 'Silky parmesan sauce, sweet blistered tomatoes, and fresh garden basil ready in under half an hour.',
      image: '/src/assets/images/recipe_pasta_1790735371710.jpg',
      p1: 'Some weeknights require dinner that feels like a warm hug without spending two hours standing over a hot stove. This Tuscan garlic pasta is our family staple whenever we want restaurant-quality comfort in under twenty minutes.',
      p2: 'The secret is using pasta water emulsified with high-quality grated Parmigiano Reggiano and a squeeze of fresh lemon to create a naturally glossy sauce that coats every single noodle.',
      subhead1: 'Ingredients You Will Need',
      p3: 'Keep it simple: 1 pound of fettuccine or rigatoni, sweet cherry tomatoes, 5 cloves of sliced garlic, heavy cream or cashew cream, lots of fresh basil leaves, and freshly cracked black pepper.',
      subhead2: 'Chef Marc’s Golden Rule',
      p4: 'Never rinse your pasta under cold water! The natural starches on the exterior of the pasta are what help the creamy sauce cling beautifully to each bite.',
    },
    business: {
      name: 'Apex Growth Advisors',
      tagline: 'Modern Consulting, Strategy, & Operational Excellence',
      badge: 'Small Business Insights',
      date: 'September 2026',
      readTime: '6 min read',
      author: 'Sarah Chen',
      authorBio: 'Managing Director & Strategic Consultant',
      title: 'How Small Businesses Are Scaling Profits With Smart Automation in 2026',
      subtitle: 'Practical tactics for independent entrepreneurs to free up 15+ hours weekly while boosting revenue.',
      image: '/src/assets/images/ad_creative_cloud_1790734675216.jpg',
      p1: 'Running a growing business often means wearing ten hats at once: marketing, customer service, bookkeeping, and project management. But working eighty hours a week is neither sustainable nor necessary with modern tools.',
      p2: 'By setting up streamlined client onboarding workflows and automated billing notifications, modern founders are cutting operational headaches in half and focusing on their most profitable high-value services.',
      subhead1: 'Step 1: Audit Your Weekly Time Traps',
      p3: 'Keep a time log for three days. You will quickly notice how much time disappears into repetitive manual follow-ups, invoice chasing, and scheduling emails.',
      subhead2: 'Step 2: Invest in Scalable Systems Early',
      p4: 'Investing in reliable web presence and automated client intake transforms your company from a chaotic hustle into a smooth, dependable revenue engine.',
    },
    tech: {
      name: 'TechPulse Journal',
      tagline: 'Engineering & Modern Web Systems',
      badge: 'Frontend Engineering',
      date: 'September 2026',
      readTime: '7 min read',
      author: 'Christopher Reynolds',
      authorBio: 'Principal Systems Engineer, Performance Labs',
      title: 'Architecting High-Speed Next.js Applications with Non-Blocking Ad Infrastructure',
      subtitle: 'How modern media publishers achieve optimal monetization yield while keeping Cumulative Layout Shift at zero.',
      image: '/src/assets/images/article_web_performance_1790734651612.jpg',
      p1: 'Monetization has long been considered the natural enemy of frontend latency. In traditional web stacks, unconstrained dynamic slots caused severe layout shifts, pushing content downward as banners popped in seconds after page load.',
      p2: 'With modern Next.js client hydration and reserved container heights, publishers can now embed Google AdSense units seamlessly without degrading user experience or Core Web Vitals.',
      subhead1: '1. Preventing Cumulative Layout Shift (CLS)',
      p3: 'By providing minimum height placeholders and standard aspect ratios, the browser reserves exact space before the advertiser script arrives, ensuring smooth, rock-solid reading.',
      subhead2: '2. Optimal Reader Engagement',
      p4: 'Placing ads at natural rest stops between paragraphs creates higher dwell time, stronger viewability scores, and better revenue returns from Google AdSense.',
    }
  };

  const current = siteConfigs[siteType as keyof typeof siteConfigs] || siteConfigs.blog;

  return (
    <div className="space-y-6">
      {/* Website Type Switcher & Controls */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">Live Website Preview</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
              See Your Ads on an Actual Website
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Pick a website template to see how the Google AdBanner cleanly blends with your real content.
          </p>
        </div>

        {/* Template Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSiteType('blog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              siteType === 'blog'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Travel Blog
          </button>
          <button
            onClick={() => setSiteType('recipe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              siteType === 'recipe'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            Recipe Blog
          </button>
          <button
            onClick={() => setSiteType('business')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              siteType === 'business'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Business Site
          </button>
          <button
            onClick={() => setSiteType('tech')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              siteType === 'tech'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Tech Journal
          </button>

          <button
            onClick={() => setInspectOutlines(!inspectOutlines)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ml-1 ${
              inspectOutlines
                ? 'bg-amber-950/40 border-amber-500/80 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Highlight exactly where the ad banners are located"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>{inspectOutlines ? 'Highlight Ads: ON' : 'Highlight Ads'}</span>
          </button>
        </div>
      </div>

      {/* Simulated Live Website Container */}
      <div className={`rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden ${inspectOutlines ? 'ring-2 ring-amber-500/40' : ''}`}>
        {/* Magazine Site Header */}
        <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-white font-sans">{current.name}</span>
            <span className="text-xs text-slate-400 hidden sm:inline border-l border-slate-700 pl-3">
              {current.tagline}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Home</span>
            <span>Articles</span>
            <span>About Us</span>
            <span>Contact</span>
          </div>
        </header>

        {/* Top Header Banner Slot (Leaderboard) */}
        {showTopAd && (
          <div className={`px-4 sm:px-8 py-3 bg-slate-900/40 border-b border-slate-800/80 ${inspectOutlines ? 'bg-amber-950/20 border-amber-500/50' : ''}`}>
            <div className="max-w-4xl mx-auto">
              {inspectOutlines && (
                <div className="text-[11px] font-mono text-amber-400 mb-1 flex items-center justify-between font-semibold">
                  <span>📍 AD LOCATION 1: TOP HEADER BANNER</span>
                  <span>Pays you whenever visitors see the top of your site</span>
                </div>
              )}
              <AdBanner
                dataAdSlot="8291048291"
                dataAdClient={publisherId}
                dataAdFormat="horizontal"
                dataFullWidthResponsive={true}
                simulation={simulationMode}
                minHeight={90}
                creativeIndex={0}
                style={{ margin: '0.5rem 0' }}
              />
            </div>
          </div>
        )}

        {/* Main Article Content with Sidebar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Article Editorial Body (8 cols) */}
            <article className="lg:col-span-8 space-y-6 text-slate-300">
              {/* Category & Date */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {current.badge}
                </span>
                <span>·</span>
                <span>{current.date}</span>
                <span>·</span>
                <span>{current.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {current.title}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                {current.subtitle}
              </p>

              {/* Author byline */}
              <div className="flex items-center gap-3 py-3 border-y border-slate-800 text-xs text-slate-400">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-bold text-emerald-300">
                  {current.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-slate-200">{current.author}</div>
                  <div className="text-[11px] text-slate-400">{current.authorBio}</div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video relative shadow-lg">
                <img
                  src={current.image}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-200">
                <p>{current.p1}</p>
                <p>{current.p2}</p>
              </div>

              {/* IN-ARTICLE AD BANNER SLOT */}
              {showInArticleAd && (
                <div className={`my-8 py-3 rounded-xl bg-slate-900/50 p-4 border border-slate-800 shadow-sm ${inspectOutlines ? 'bg-amber-950/20 border-amber-500/60' : ''}`}>
                  {inspectOutlines && (
                    <div className="text-[11px] font-mono text-amber-400 mb-2 flex items-center justify-between font-semibold">
                      <span>📍 AD LOCATION 2: MIDDLE OF ARTICLE BANNER</span>
                      <span>High engagement: readers see this as they scroll your story</span>
                    </div>
                  )}
                  <AdBanner
                    dataAdSlot="4920194821"
                    dataAdClient={publisherId}
                    dataAdFormat="rectangle"
                    dataFullWidthResponsive={true}
                    simulation={simulationMode}
                    minHeight={250}
                    creativeIndex={1}
                    style={{ margin: '0' }}
                  />
                </div>
              )}

              {/* Second Section */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-200">
                <h3 className="text-xl font-bold text-white pt-2">
                  {current.subhead1}
                </h3>
                <p>{current.p3}</p>

                <h3 className="text-xl font-bold text-white pt-2">
                  {current.subhead2}
                </h3>
                <p>{current.p4}</p>
              </div>

              {/* FOOTER AD BANNER SLOT */}
              {showFooterAd && (
                <div className={`mt-8 py-3 rounded-xl bg-slate-900/50 p-4 border border-slate-800 ${inspectOutlines ? 'bg-amber-950/20 border-amber-500/60' : ''}`}>
                  {inspectOutlines && (
                    <div className="text-[11px] font-mono text-amber-400 mb-2 flex items-center justify-between font-semibold">
                      <span>📍 AD LOCATION 3: BOTTOM OF ARTICLE BANNER</span>
                      <span>Earns when visitors finish reading your post</span>
                    </div>
                  )}
                  <AdBanner
                    dataAdSlot="1938204821"
                    dataAdClient={publisherId}
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    simulation={simulationMode}
                    minHeight={150}
                    creativeIndex={2}
                    style={{ margin: '0' }}
                  />
                </div>
              )}
            </article>

            {/* Sidebar Column (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* About Author Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  About {current.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Welcome! We share regular guides, articles, and inspiring stories. Subscribe to our free newsletter below to get new updates in your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address..."
                    className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    readOnly
                    value="reader@example.com"
                  />
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
                    Join
                  </button>
                </div>
              </div>

              {/* Sticky Sidebar Ad */}
              {showSidebarAd && (
                <div className={`sticky top-20 rounded-xl border border-slate-800 bg-slate-900/60 p-4 ${inspectOutlines ? 'bg-amber-950/20 border-amber-500/60' : ''}`}>
                  {inspectOutlines && (
                    <div className="text-[11px] font-mono text-amber-400 mb-2 font-semibold">
                      <span>📍 AD LOCATION 4: SIDEBAR UNIT</span>
                    </div>
                  )}
                  <AdBanner
                    dataAdSlot="7890123456"
                    dataAdClient={publisherId}
                    dataAdFormat="vertical"
                    dataFullWidthResponsive={true}
                    simulation={simulationMode}
                    minHeight={400}
                    creativeIndex={1}
                    style={{ margin: '0' }}
                  />
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* Website Footer */}
        <footer className="border-t border-slate-800 bg-slate-900/90 px-6 py-8 text-center text-xs text-slate-400">
          <p className="font-semibold text-slate-300">© 2026 {current.name}. All rights reserved.</p>
          <p className="mt-1 text-slate-500">Built with modern web architecture and Google AdSense monetization.</p>
        </footer>
      </div>
    </div>
  );
}
