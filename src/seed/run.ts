import 'dotenv/config'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@starringcapital.com'
const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

const upsertPage = async (payload: any, data: any) => {
  const existing = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: data.slug,
      },
    },
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection: 'pages',
    data,
  })
}

const upsertCase = async (payload: any, data: any) => {
  const existing = await payload.find({
    collection: 'engagement-cases',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          year: {
            equals: data.year,
          },
        },
        {
          strategicName: {
            equals: data.strategicName,
          },
        },
      ],
    },
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'engagement-cases',
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection: 'engagement-cases',
    data,
  })
}

const run = async () => {
  const payload: any = await getPayload({ config: configPromise })

  const existingAdmin = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: adminEmail,
      },
    },
  })

  if (!existingAdmin.docs[0]) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
      },
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Star Ring Capital',
      tagline: 'Private Capital Structure Office',
      primaryNavCTA: {
        label: 'Strategic Collaboration',
        url: '/contact',
      },
      defaultSEO: {
        title: 'Star Ring Capital | Structured Influence in Capital',
        description:
          'A private capital structure office focused on structural allocation, risk architecture, and stable growth.',
      },
      footerNote:
        'Capital discipline over market noise. Built for long-horizon resilience and strategic alignment only.',
    },
  })

  await payload.updateGlobal({
    slug: 'theme-settings',
    data: {
      backgroundColor: '#07090f',
      backgroundAccentColor: '#0d1422',
      textColor: '#f5f4ef',
      mutedTextColor: '#b7b19e',
      accentGoldColor: '#d5b36a',
      buttonStyle: {
        variant: 'outline',
        radius: 999,
        glowIntensity: 0.32,
      },
      typography: {
        fontPreset: 'institutional',
        bodyWeight: 400,
        headingWeight: 600,
      },
      orbitEffect: {
        enabled: true,
        speed: 26,
        opacity: 0.32,
      },
    },
  })

  const trajectoryExisting = await payload.find({
    collection: 'trajectory-data',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      title: {
        equals: 'SRC Core Trajectory Model',
      },
    },
  })

  const trajectoryPayload = {
    title: 'SRC Core Trajectory Model',
    active: true,
    periods: [
      {
        period: '3Y',
        points: [
          { label: '2023 Q1', starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: '2023 Q4', starRingCapital: 109, globalEquityBenchmark: 104, riskFreeBenchmark: 103 },
          { label: '2024 Q2', starRingCapital: 116, globalEquityBenchmark: 108, riskFreeBenchmark: 105 },
          { label: '2024 Q4', starRingCapital: 123, globalEquityBenchmark: 112, riskFreeBenchmark: 108 },
          { label: '2025 Q4', starRingCapital: 132, globalEquityBenchmark: 118, riskFreeBenchmark: 111 },
        ],
        metrics: {
          cagr: 9.68,
          maxDrawdown: -5.4,
          volatility: 7.9,
          sharpeRatio: 1.38,
        },
      },
      {
        period: '1Y',
        points: [
          { label: '2025 Jan', starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: '2025 Apr', starRingCapital: 103, globalEquityBenchmark: 101, riskFreeBenchmark: 101 },
          { label: '2025 Jul', starRingCapital: 108, globalEquityBenchmark: 104, riskFreeBenchmark: 102 },
          { label: '2025 Oct', starRingCapital: 112, globalEquityBenchmark: 106, riskFreeBenchmark: 103 },
          { label: '2025 Dec', starRingCapital: 116, globalEquityBenchmark: 108, riskFreeBenchmark: 104 },
        ],
        metrics: {
          cagr: 15.1,
          maxDrawdown: -3.1,
          volatility: 6.4,
          sharpeRatio: 1.62,
        },
      },
      {
        period: 'YTD',
        points: [
          { label: 'Jan', starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: 'Feb', starRingCapital: 101.8, globalEquityBenchmark: 100.9, riskFreeBenchmark: 100.4 },
        ],
        metrics: {
          cagr: 11.2,
          maxDrawdown: -1.2,
          volatility: 5.8,
          sharpeRatio: 1.49,
        },
      },
    ],
    complianceStatements: [
      {
        statement: 'Historical performance does not guarantee future results.',
      },
      {
        statement:
          'All trajectories reflect historical structural execution and do not constitute investment solicitation.',
      },
    ],
    _status: 'published',
  }

  const trajectoryData = trajectoryExisting.docs[0]
    ? await payload.update({
        collection: 'trajectory-data',
        id: trajectoryExisting.docs[0].id,
        data: trajectoryPayload,
      })
    : await payload.create({
        collection: 'trajectory-data',
        data: trajectoryPayload,
      })

  const case2023 = await upsertCase(payload, {
    year: 2023,
    strategicName: 'Defensive Rotation Across Equity & Bonds',
    summaryLines: [
      { line: 'Reframed the risk budget from directional beta to stability-weighted spread capture.' },
      { line: 'Introduced defensive overlays to neutralize macro shock concentration across correlated books.' },
      { line: 'Maintained continuity of capital while reducing drawdown sensitivity in volatile regimes.' },
    ],
    resultSignature: 'Lower drawdown amplitude with preserved trajectory continuity.',
    _status: 'published',
  })

  const case2024 = await upsertCase(payload, {
    year: 2024,
    strategicName: 'Multi-Asset Liquidity Rebalance',
    summaryLines: [
      { line: 'Re-architected liquidity ladders across equity, fixed income, and cash substitutes.' },
      { line: 'Synchronized tactical rotations with funding windows and volatility compression phases.' },
      { line: 'Improved adaptability under stress without sacrificing structural participation.' },
    ],
    resultSignature: 'Higher liquidity efficiency under stressed market intervals.',
    _status: 'published',
  })

  const case2025 = await upsertCase(payload, {
    year: 2025,
    strategicName: 'Cross-Market Arbitrage Deployment',
    summaryLines: [
      { line: 'Activated cross-market relative value frameworks driven by structural mispricing dispersion.' },
      { line: 'Bounded execution by strict hedging envelopes and liquidity availability checks.' },
      { line: 'Delivered smoother risk-adjusted progression through disciplined sizing constraints.' },
    ],
    resultSignature: 'Risk-adjusted contribution improved while preserving downside controls.',
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Home',
    slug: 'home',
    navigation: {
      navLabel: 'Home',
      showInNav: true,
      navOrder: 1,
    },
    layout: [
      {
        blockType: 'homeHero',
        brandName: 'Star Ring Capital',
        positioning:
          'A private capital structure office shaping durable outcomes through disciplined architecture, cross-cycle adaptability, and controlled risk.',
        primaryCTA: {
          label: 'Explore Philosophy',
          url: '/philosophy',
        },
        secondaryCTA: {
          label: 'Strategic Collaboration',
          url: '/contact',
        },
      },
      {
        blockType: 'corePillars',
        heading: 'Core Architecture',
        cards: [
          {
            title: 'Capital Philosophy',
            description: 'Structured influence over emotional allocation. Conviction is expressed through architecture, not noise.',
          },
          {
            title: 'Multi-Asset Structure',
            description: 'Cross-asset integration designed to preserve flexibility while maintaining directional coherence.',
          },
          {
            title: 'Risk Architecture',
            description: 'Layered control systems prioritize continuity, drawdown governance, and scenario resilience.',
          },
        ],
      },
    ],
    seo: {
      title: 'Star Ring Capital | Private Capital Structure Office',
      description:
        'High-end capital IP site focused on structure, risk architecture, and stable growth across market cycles.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Philosophy',
    slug: 'philosophy',
    navigation: {
      navLabel: 'Philosophy',
      showInNav: true,
      navOrder: 2,
    },
    layout: [
      {
        blockType: 'philosophyStatement',
        coreSentence: 'Capital is not money. Capital is structured influence.',
        modules: [
          {
            title: 'Star: Value Core',
            description: 'Star represents a value kernel anchored in repeatable judgment, discipline, and asymmetry awareness.',
          },
          {
            title: 'Ring: Structural Flow',
            description: 'Ring represents circulation, allocation pathways, and dynamic rebalancing under shifting conditions.',
          },
          {
            title: 'Star + Ring: Durable Influence',
            description: 'When value core and structural flow align, capital compounds through consistency rather than episodic outcomes.',
          },
        ],
      },
    ],
    seo: {
      title: 'Capital Philosophy | Star Ring Capital',
      description: 'A framework of value core and structural flow for long-horizon influence and risk-balanced growth.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Capital Domains',
    slug: 'capital-domains',
    navigation: {
      navLabel: 'Capital Domains',
      showInNav: true,
      navOrder: 3,
    },
    layout: [
      {
        blockType: 'capitalDomains',
        heading: 'Capital Domains',
        domains: [
          {
            title: 'Strategic Capital Architecture',
            line1: 'Define capital mission by cycle, regime, and structural constraints.',
            line2: 'Translate macro and micro signals into stable allocation frameworks.',
            line3: 'Preserve strategic optionality while enforcing discipline boundaries.',
            readMoreLabel: 'Further Reading',
            readMoreUrl: '/research',
          },
          {
            title: 'Multi-Asset Allocation',
            line1: 'Coordinate equity, fixed income, and liquidity sleeves under unified risk budgets.',
            line2: 'Control concentration through correlation-aware structural balancing.',
            line3: 'Emphasize continuity of exposure quality over short-term speculation.',
            readMoreLabel: 'Further Reading',
            readMoreUrl: '/research',
          },
          {
            title: 'Cross-Cycle Capital Rotation',
            line1: 'Rotate capital according to regime transitions, not headline momentum.',
            line2: 'Blend defensive and offensive postures using layered timing frameworks.',
            line3: 'Sustain trajectory integrity through proactive structural adjustments.',
            readMoreLabel: 'Further Reading',
            readMoreUrl: '/research',
          },
        ],
      },
    ],
    seo: {
      title: 'Capital Domains | Star Ring Capital',
      description: 'Strategic capital architecture, multi-asset allocation, and cross-cycle rotation capabilities.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Capital Trajectory',
    slug: 'capital-trajectory',
    navigation: {
      navLabel: 'Capital Trajectory',
      showInNav: true,
      navOrder: 4,
    },
    layout: [
      {
        blockType: 'trajectoryViewer',
        heading: 'Three-Year Capital Trajectory',
        description:
          'Trajectory reporting emphasizes stability, drawdown control, and risk-adjusted quality instead of volatility-driven outperformance narratives.',
        trajectoryData: trajectoryData.id,
      },
    ],
    seo: {
      title: 'Capital Trajectory | Star Ring Capital',
      description:
        'Three-year, one-year, and YTD trajectory visualization benchmarked against global equity and risk-free curves.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Risk Architecture',
    slug: 'risk-architecture',
    navigation: {
      navLabel: 'Risk Architecture',
      showInNav: true,
      navOrder: 5,
    },
    layout: [
      {
        blockType: 'riskArchitecture',
        heading: 'Risk Architecture',
        layers: [
          {
            layerName: 'Strategic Allocation Layer',
            purpose: 'Defines long-horizon positioning ranges aligned with capital mission and regime probabilities.',
            bullets: [
              { item: 'Cycle-aware allocation corridors' },
              { item: 'Structural concentration limits' },
              { item: 'Scenario-linked stress boundaries' },
            ],
          },
          {
            layerName: 'Tactical Rotation Layer',
            purpose: 'Adjusts exposure weights through controlled rotational logic without compromising core structure.',
            bullets: [
              { item: 'Signal-driven incremental reweighting' },
              { item: 'Cross-asset relative strength gating' },
              { item: 'Execution timing discipline' },
            ],
          },
          {
            layerName: 'Defensive Hedging Layer',
            purpose: 'Implements defensive overlays to contain left-tail events and reduce volatility shocks.',
            bullets: [
              { item: 'Downside protection sleeves' },
              { item: 'Correlation break monitoring' },
              { item: 'Predefined hedge activation triggers' },
            ],
          },
          {
            layerName: 'Liquidity Buffer Layer',
            purpose: 'Maintains reserve liquidity to preserve maneuverability during stress and dislocation windows.',
            bullets: [
              { item: 'Liquidity ladder by horizon' },
              { item: 'Re-entry buffer capital' },
              { item: 'Funding continuity safeguards' },
            ],
          },
        ],
      },
    ],
    seo: {
      title: 'Risk Architecture | Star Ring Capital',
      description: 'A four-layer risk architecture balancing strategy continuity, tactical agility, and drawdown protection.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Strategic Engagement',
    slug: 'strategic-engagement',
    navigation: {
      navLabel: 'Strategic Engagement',
      showInNav: true,
      navOrder: 6,
    },
    layout: [
      {
        blockType: 'engagementNarratives',
        heading: 'Strategic Engagement',
        description:
          'Strategic campaigns are shared as structured battle narratives focused on judgment quality, risk handling, and result characteristics.',
        cases: [case2023.id, case2024.id, case2025.id],
      },
    ],
    seo: {
      title: 'Strategic Engagement | Star Ring Capital',
      description: 'Battle-style strategic narratives across 2023-2025 without trade-level disclosure.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Founder',
    slug: 'founder',
    navigation: {
      navLabel: 'Founder',
      showInNav: true,
      navOrder: 7,
    },
    layout: [
      {
        blockType: 'founderProfile',
        heading: 'Founder & Capital Architect',
        narrative:
          'The founder builds private capital structure systems that convert macro complexity into executable architecture. The operating doctrine prioritizes disciplined risk governance, structural adaptation, and continuity through cycle transitions.',
        capabilityPoints: [
          { point: 'Cross-cycle allocation design under regime uncertainty' },
          { point: 'Risk-first portfolio architecture with drawdown governance' },
          { point: 'Multi-asset liquidity orchestration and deployment timing' },
          { point: 'Institutional-level execution frameworks for private capital objectives' },
        ],
      },
    ],
    seo: {
      title: 'Founder | Star Ring Capital',
      description: 'Founder profile focused on methodology, structural capability, and risk philosophy.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Contact',
    slug: 'contact',
    navigation: {
      navLabel: 'Contact',
      showInNav: true,
      navOrder: 8,
    },
    layout: [
      {
        blockType: 'contactModule',
        heading: 'Contact',
        email: 'alignment@starringcapital.com',
        alignmentCopy: 'By strategic alignment only.',
        enableForm: true,
        formFields: [
          {
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Your name',
          },
          {
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'you@domain.com',
          },
          {
            label: 'Strategic Context',
            type: 'textarea',
            required: true,
            placeholder: 'Briefly describe your strategic alignment context',
          },
        ],
      },
    ],
    seo: {
      title: 'Contact | Star Ring Capital',
      description: 'Strategic alignment contact channel for Star Ring Capital.',
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: 'Research',
    slug: 'research',
    navigation: {
      navLabel: 'Research',
      showInNav: false,
      navOrder: 99,
    },
    layout: [
      {
        blockType: 'philosophyStatement',
        coreSentence: 'Institutional research modules are being prepared.',
        modules: [
          {
            title: 'Whitepaper Track',
            description:
              'Long-form structural analysis for institutional execution frameworks will be released in phases.',
          },
          {
            title: 'Cycle Reports',
            description:
              'Cross-cycle review notes will summarize allocation logic and risk architecture evolution.',
          },
          {
            title: 'Operational Briefs',
            description:
              'Private operational memos can be enabled for strategic partners under controlled access.',
          },
        ],
      },
    ],
    seo: {
      title: 'Research | Star Ring Capital',
      description: 'Future institutional research and whitepaper module entrance.',
    },
    _status: 'published',
  })

  const researchExisting = await payload.find({
    collection: 'research',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: 'structural-capital-whitepaper',
      },
    },
  })

  const researchData = {
    title: 'Structural Capital Whitepaper (Draft Entrance)',
    slug: 'structural-capital-whitepaper',
    excerpt:
      'Future institutional module placeholder: a framework on structure-driven capital influence and risk architecture.',
    body: 'Reserved for future institutional publication and whitepaper expansion.',
    showOnSite: false,
    _status: 'draft',
  }

  if (researchExisting.docs[0]) {
    await payload.update({
      collection: 'research',
      id: researchExisting.docs[0].id,
      data: researchData,
    })
  } else {
    await payload.create({
      collection: 'research',
      data: researchData,
    })
  }

  console.log('Seed complete: Star Ring Capital content initialized.')
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
