import 'dotenv/config'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@starringcapital.com'
const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'
const bi = (zh: string, en: string) => `${zh} || ${en}`

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
      year: {
        equals: data.year,
      },
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
      siteName: bi('星环资本', 'Star Ring Capital'),
      tagline: bi('私域资本结构办公室', 'Private Capital Structure Office'),
      primaryNavCTA: {
        label: bi('战略协作', 'Strategic Collaboration'),
        url: '/contact',
      },
      defaultSEO: {
        title: bi('星环资本 | 结构化资本影响力', 'Star Ring Capital | Structured Influence in Capital'),
        description: bi(
          '聚焦结构化配置、风险架构与稳健增长的私域资本结构办公室。',
          'A private capital structure office focused on structural allocation, risk architecture, and stable growth.',
        ),
      },
      footerNote: bi(
        '以资本纪律穿越市场噪音。仅服务于长期韧性与战略同频。',
        'Capital discipline over market noise. Built for long-horizon resilience and strategic alignment only.',
      ),
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
      or: [
        {
          title: {
            equals: 'SRC Core Trajectory Model',
          },
        },
        {
          title: {
            equals: bi('SRC 核心轨迹模型', 'SRC Core Trajectory Model'),
          },
        },
      ],
    },
  })

  const trajectoryPayload = {
    title: bi('SRC 核心轨迹模型', 'SRC Core Trajectory Model'),
    active: true,
    periods: [
      {
        period: '3Y',
        points: [
          { label: bi('2023 年 Q1', '2023 Q1'), starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: bi('2023 年 Q4', '2023 Q4'), starRingCapital: 108, globalEquityBenchmark: 104, riskFreeBenchmark: 103 },
          { label: bi('2024 年 Q2', '2024 Q2'), starRingCapital: 104, globalEquityBenchmark: 101, riskFreeBenchmark: 104.5 },
          { label: bi('2024 年 Q4', '2024 Q4'), starRingCapital: 119, globalEquityBenchmark: 109, riskFreeBenchmark: 107.5 },
          { label: bi('2025 年 Q2', '2025 Q2'), starRingCapital: 114, globalEquityBenchmark: 106, riskFreeBenchmark: 109 },
          { label: bi('2025 年 Q4', '2025 Q4'), starRingCapital: 132, globalEquityBenchmark: 118, riskFreeBenchmark: 111 },
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
          { label: bi('2025 年 1 月', '2025 Jan'), starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: bi('2025 年 4 月', '2025 Apr'), starRingCapital: 104, globalEquityBenchmark: 101.5, riskFreeBenchmark: 101 },
          { label: bi('2025 年 7 月', '2025 Jul'), starRingCapital: 101.2, globalEquityBenchmark: 98.8, riskFreeBenchmark: 102 },
          { label: bi('2025 年 10 月', '2025 Oct'), starRingCapital: 111, globalEquityBenchmark: 105.4, riskFreeBenchmark: 103 },
          { label: bi('2025 年 12 月', '2025 Dec'), starRingCapital: 116, globalEquityBenchmark: 108, riskFreeBenchmark: 104 },
        ],
        metrics: {
          cagr: 15.1,
          maxDrawdown: -3.1,
          volatility: 6.4,
          sharpeRatio: 1.62,
        },
      },
      {
        period: '3M',
        points: [
          { label: bi('2025 年 11 月', '2025 Nov'), starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: bi('2025 年 12 月', '2025 Dec'), starRingCapital: 103.6, globalEquityBenchmark: 101.7, riskFreeBenchmark: 100.6 },
          { label: bi('2026 年 1 月', '2026 Jan'), starRingCapital: 101.1, globalEquityBenchmark: 100.4, riskFreeBenchmark: 101.1 },
          { label: bi('2026 年 2 月', '2026 Feb'), starRingCapital: 105.2, globalEquityBenchmark: 102.2, riskFreeBenchmark: 101.4 },
        ],
        metrics: {
          cagr: 5.2,
          maxDrawdown: -2.4,
          volatility: 4.8,
          sharpeRatio: 1.44,
        },
      },
      {
        period: 'YTD',
        points: [
          { label: bi('1 月', 'Jan'), starRingCapital: 100, globalEquityBenchmark: 100, riskFreeBenchmark: 100 },
          { label: bi('2 月', 'Feb'), starRingCapital: 102.4, globalEquityBenchmark: 101.2, riskFreeBenchmark: 100.4 },
          { label: bi('3 月', 'Mar'), starRingCapital: 101.3, globalEquityBenchmark: 100.1, riskFreeBenchmark: 100.8 },
          { label: bi('4 月', 'Apr'), starRingCapital: 104.1, globalEquityBenchmark: 102.2, riskFreeBenchmark: 101.1 },
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
        statement: bi('历史表现不代表未来结果。', 'Historical performance does not guarantee future results.'),
      },
      {
        statement: bi(
          '所有轨迹仅反映历史结构化执行，不构成任何投资邀约。',
          'All trajectories reflect historical structural execution and do not constitute investment solicitation.',
        ),
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
    strategicName: bi('股债防御性轮动', 'Defensive Rotation Across Equity & Bonds'),
    summaryLines: [
      {
        line: bi(
          '将风险预算从方向性 Beta 重构为以稳定性加权的价差捕捉。',
          'Reframed the risk budget from directional beta to stability-weighted spread capture.',
        ),
      },
      {
        line: bi(
          '引入防御性覆盖层，对冲相关资产簿中的宏观冲击集中度。',
          'Introduced defensive overlays to neutralize macro shock concentration across correlated books.',
        ),
      },
      {
        line: bi(
          '在高波动阶段降低回撤敏感性的同时，维持资本轨迹连续性。',
          'Maintained continuity of capital while reducing drawdown sensitivity in volatile regimes.',
        ),
      },
    ],
    resultSignature: bi(
      '在保持轨迹连续性的前提下，显著降低回撤振幅。',
      'Lower drawdown amplitude with preserved trajectory continuity.',
    ),
    _status: 'published',
  })

  const case2024 = await upsertCase(payload, {
    year: 2024,
    strategicName: bi('多资产流动性再平衡', 'Multi-Asset Liquidity Rebalance'),
    summaryLines: [
      {
        line: bi(
          '重构股权、固收与现金替代资产的流动性阶梯。',
          'Re-architected liquidity ladders across equity, fixed income, and cash substitutes.',
        ),
      },
      {
        line: bi(
          '将战术轮动与资金窗口及波动收敛阶段进行同步。',
          'Synchronized tactical rotations with funding windows and volatility compression phases.',
        ),
      },
      {
        line: bi(
          '在不牺牲结构参与度的前提下，提高压力情景下的适应能力。',
          'Improved adaptability under stress without sacrificing structural participation.',
        ),
      },
    ],
    resultSignature: bi(
      '在受压市场区间内实现更高流动性效率。',
      'Higher liquidity efficiency under stressed market intervals.',
    ),
    _status: 'published',
  })

  const case2025 = await upsertCase(payload, {
    year: 2025,
    strategicName: bi('跨市场套利部署', 'Cross-Market Arbitrage Deployment'),
    summaryLines: [
      {
        line: bi(
          '基于结构性错价离散度，启动跨市场相对价值框架。',
          'Activated cross-market relative value frameworks driven by structural mispricing dispersion.',
        ),
      },
      {
        line: bi(
          '通过严格对冲边界与流动性可得性校验约束执行。',
          'Bounded execution by strict hedging envelopes and liquidity availability checks.',
        ),
      },
      {
        line: bi(
          '依靠纪律化仓位约束，获得更平滑的风险调整后增长。',
          'Delivered smoother risk-adjusted progression through disciplined sizing constraints.',
        ),
      },
    ],
    resultSignature: bi(
      '在保持下行控制的同时，提升风险调整后贡献。',
      'Risk-adjusted contribution improved while preserving downside controls.',
    ),
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('首页', 'Home'),
    slug: 'home',
    navigation: {
      navLabel: bi('首页', 'Home'),
      showInNav: true,
      navOrder: 1,
    },
    layout: [
      {
        blockType: 'homeHero',
        brandName: bi('星环资本', 'Star Ring Capital'),
        positioning: bi(
          '通过纪律化架构、跨周期适应与可控风险，构建可持续成果的私域资本结构办公室。',
          'A private capital structure office shaping durable outcomes through disciplined architecture, cross-cycle adaptability, and controlled risk.',
        ),
        primaryCTA: {
          label: bi('探索理念', 'Explore Philosophy'),
          url: '/philosophy',
        },
        secondaryCTA: {
          label: bi('战略协作', 'Strategic Collaboration'),
          url: '/contact',
        },
      },
      {
        blockType: 'corePillars',
        heading: bi('核心架构', 'Core Architecture'),
        cards: [
          {
            title: bi('资本理念', 'Capital Philosophy'),
            description: bi(
              '以结构化影响力替代情绪化配置。信念通过架构表达，而非噪音驱动。',
              'Structured influence over emotional allocation. Conviction is expressed through architecture, not noise.',
            ),
          },
          {
            title: bi('多资产结构', 'Multi-Asset Structure'),
            description: bi(
              '跨资产整合设计，在保持方向一致性的同时保留策略灵活性。',
              'Cross-asset integration designed to preserve flexibility while maintaining directional coherence.',
            ),
          },
          {
            title: bi('风险架构', 'Risk Architecture'),
            description: bi(
              '分层控制系统优先保障连续性、回撤治理与情景韧性。',
              'Layered control systems prioritize continuity, drawdown governance, and scenario resilience.',
            ),
          },
        ],
      },
    ],
    seo: {
      title: bi(
        '星环资本 | 私域资本结构办公室',
        'Star Ring Capital | Private Capital Structure Office',
      ),
      description: bi(
        '聚焦结构能力、风险架构与跨周期稳健增长的高端资本品牌站点。',
        'High-end capital IP site focused on structure, risk architecture, and stable growth across market cycles.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('理念', 'Philosophy'),
    slug: 'philosophy',
    navigation: {
      navLabel: bi('理念', 'Philosophy'),
      showInNav: true,
      navOrder: 2,
    },
    layout: [
      {
        blockType: 'philosophyStatement',
        coreSentence: bi('资本不只是金钱，资本是结构化影响力。', 'Capital is not money. Capital is structured influence.'),
        modules: [
          {
            title: bi('Star：价值核心', 'Star: Value Core'),
            description: bi(
              'Star 代表价值内核，锚定可复现判断、纪律约束与不对称认知。',
              'Star represents a value kernel anchored in repeatable judgment, discipline, and asymmetry awareness.',
            ),
          },
          {
            title: bi('Ring：结构流动', 'Ring: Structural Flow'),
            description: bi(
              'Ring 代表资本循环、配置路径与在环境变化中的动态再平衡。',
              'Ring represents circulation, allocation pathways, and dynamic rebalancing under shifting conditions.',
            ),
          },
          {
            title: bi('Star + Ring：持续影响力', 'Star + Ring: Durable Influence'),
            description: bi(
              '当价值核心与结构流动同频时，资本通过一致性而非偶发性结果实现复利。',
              'When value core and structural flow align, capital compounds through consistency rather than episodic outcomes.',
            ),
          },
        ],
      },
    ],
    seo: {
      title: bi('资本理念 | 星环资本', 'Capital Philosophy | Star Ring Capital'),
      description: bi(
        '以价值核心与结构流动构建长期影响力和风险平衡增长框架。',
        'A framework of value core and structural flow for long-horizon influence and risk-balanced growth.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('资本领域', 'Capital Domains'),
    slug: 'capital-domains',
    navigation: {
      navLabel: bi('资本领域', 'Capital Domains'),
      showInNav: true,
      navOrder: 3,
    },
    layout: [
      {
        blockType: 'capitalDomains',
        heading: bi('资本领域', 'Capital Domains'),
        domains: [
          {
            title: bi('战略资本架构', 'Strategic Capital Architecture'),
            line1: bi('按周期、市场状态与结构约束定义资本使命。', 'Define capital mission by cycle, regime, and structural constraints.'),
            line2: bi('将宏观与微观信号转化为稳定配置框架。', 'Translate macro and micro signals into stable allocation frameworks.'),
            line3: bi('在强化纪律边界的同时保留战略可选性。', 'Preserve strategic optionality while enforcing discipline boundaries.'),
            readMoreLabel: bi('延伸阅读', 'Further Reading'),
            readMoreUrl: '/research',
          },
          {
            title: bi('多资产配置', 'Multi-Asset Allocation'),
            line1: bi(
              '在统一风险预算下协同权益、固收与流动性仓位。',
              'Coordinate equity, fixed income, and liquidity sleeves under unified risk budgets.',
            ),
            line2: bi(
              '通过相关性敏感的结构平衡控制集中度。',
              'Control concentration through correlation-aware structural balancing.',
            ),
            line3: bi(
              '强调敞口质量连续性而非短期投机波动。',
              'Emphasize continuity of exposure quality over short-term speculation.',
            ),
            readMoreLabel: bi('延伸阅读', 'Further Reading'),
            readMoreUrl: '/research',
          },
          {
            title: bi('跨周期资本轮动', 'Cross-Cycle Capital Rotation'),
            line1: bi(
              '依据市场状态切换而非新闻动量进行资本轮动。',
              'Rotate capital according to regime transitions, not headline momentum.',
            ),
            line2: bi(
              '借助分层时序框架融合防御与进攻姿态。',
              'Blend defensive and offensive postures using layered timing frameworks.',
            ),
            line3: bi(
              '通过主动结构调整维持轨迹完整性。',
              'Sustain trajectory integrity through proactive structural adjustments.',
            ),
            readMoreLabel: bi('延伸阅读', 'Further Reading'),
            readMoreUrl: '/research',
          },
        ],
      },
    ],
    seo: {
      title: bi('资本领域 | 星环资本', 'Capital Domains | Star Ring Capital'),
      description: bi(
        '覆盖战略资本架构、多资产配置与跨周期轮动能力。',
        'Strategic capital architecture, multi-asset allocation, and cross-cycle rotation capabilities.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('资本轨迹', 'Capital Trajectory'),
    slug: 'capital-trajectory',
    navigation: {
      navLabel: bi('资本轨迹', 'Capital Trajectory'),
      showInNav: true,
      navOrder: 4,
    },
    layout: [
      {
        blockType: 'trajectoryViewer',
        heading: bi('三年资本轨迹', 'Three-Year Capital Trajectory'),
        description: bi(
          '轨迹披露强调稳定性、回撤控制与风险调整后质量，而非由波动驱动的超额叙事。',
          'Trajectory reporting emphasizes stability, drawdown control, and risk-adjusted quality instead of volatility-driven outperformance narratives.',
        ),
        trajectoryData: trajectoryData.id,
      },
    ],
    seo: {
      title: bi('资本轨迹 | 星环资本', 'Capital Trajectory | Star Ring Capital'),
      description: bi(
        '提供三年、一年、三个月与年内至今轨迹可视化，并对标全球权益与无风险曲线。',
        'Three-year, one-year, three-month, and YTD trajectory visualization benchmarked against global equity and risk-free curves.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('风险架构', 'Risk Architecture'),
    slug: 'risk-architecture',
    navigation: {
      navLabel: bi('风险架构', 'Risk Architecture'),
      showInNav: true,
      navOrder: 5,
    },
    layout: [
      {
        blockType: 'riskArchitecture',
        heading: bi('风险架构', 'Risk Architecture'),
        layers: [
          {
            layerName: bi('战略配置层', 'Strategic Allocation Layer'),
            purpose: bi(
              '定义与资本使命及市场状态概率相一致的长期仓位区间。',
              'Defines long-horizon positioning ranges aligned with capital mission and regime probabilities.',
            ),
            bullets: [
              { item: bi('周期感知的配置走廊', 'Cycle-aware allocation corridors') },
              { item: bi('结构化集中度上限', 'Structural concentration limits') },
              { item: bi('情景联动的压力边界', 'Scenario-linked stress boundaries') },
            ],
          },
          {
            layerName: bi('战术轮动层', 'Tactical Rotation Layer'),
            purpose: bi(
              '在不破坏核心结构的前提下，通过可控轮动逻辑调整敞口权重。',
              'Adjusts exposure weights through controlled rotational logic without compromising core structure.',
            ),
            bullets: [
              { item: bi('信号驱动的渐进再加权', 'Signal-driven incremental reweighting') },
              { item: bi('跨资产相对强弱门控', 'Cross-asset relative strength gating') },
              { item: bi('执行时点纪律', 'Execution timing discipline') },
            ],
          },
          {
            layerName: bi('防御对冲层', 'Defensive Hedging Layer'),
            purpose: bi(
              '实施防御性覆盖层，约束左尾事件并降低波动冲击。',
              'Implements defensive overlays to contain left-tail events and reduce volatility shocks.',
            ),
            bullets: [
              { item: bi('下行保护仓位', 'Downside protection sleeves') },
              { item: bi('相关性断裂监控', 'Correlation break monitoring') },
              { item: bi('预定义对冲触发器', 'Predefined hedge activation triggers') },
            ],
          },
          {
            layerName: bi('流动性缓冲层', 'Liquidity Buffer Layer'),
            purpose: bi(
              '维持储备流动性，确保在压力与错位窗口中保有机动能力。',
              'Maintains reserve liquidity to preserve maneuverability during stress and dislocation windows.',
            ),
            bullets: [
              { item: bi('按期限构建流动性阶梯', 'Liquidity ladder by horizon') },
              { item: bi('再进入缓冲资本', 'Re-entry buffer capital') },
              { item: bi('资金连续性保障', 'Funding continuity safeguards') },
            ],
          },
        ],
      },
    ],
    seo: {
      title: bi('风险架构 | 星环资本', 'Risk Architecture | Star Ring Capital'),
      description: bi(
        '四层风险架构，在战略连续性、战术灵活性与回撤保护之间取得平衡。',
        'A four-layer risk architecture balancing strategy continuity, tactical agility, and drawdown protection.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('战略协作', 'Strategic Engagement'),
    slug: 'strategic-engagement',
    navigation: {
      navLabel: bi('战略协作', 'Strategic Engagement'),
      showInNav: true,
      navOrder: 6,
    },
    layout: [
      {
        blockType: 'engagementNarratives',
        heading: bi('战略协作', 'Strategic Engagement'),
        description: bi(
          '战略项目以结构化战役叙事呈现，重点展示判断质量、风险处理与结果特征。',
          'Strategic campaigns are shared as structured battle narratives focused on judgment quality, risk handling, and result characteristics.',
        ),
        cases: [case2023.id, case2024.id, case2025.id],
      },
    ],
    seo: {
      title: bi('战略协作 | 星环资本', 'Strategic Engagement | Star Ring Capital'),
      description: bi(
        '覆盖 2023-2025 的战役式战略叙事，不披露单笔交易细节。',
        'Battle-style strategic narratives across 2023-2025 without trade-level disclosure.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('创始人', 'Founder'),
    slug: 'founder',
    navigation: {
      navLabel: bi('创始人', 'Founder'),
      showInNav: true,
      navOrder: 7,
    },
    layout: [
      {
        blockType: 'founderProfile',
        heading: bi('创始人兼资本架构师', 'Founder & Capital Architect'),
        narrative: bi(
          '创始人专注构建私域资本结构系统，将宏观复杂性转化为可执行架构。方法论强调纪律化风险治理、结构自适应与跨周期连续性。',
          'The founder builds private capital structure systems that convert macro complexity into executable architecture. The operating doctrine prioritizes disciplined risk governance, structural adaptation, and continuity through cycle transitions.',
        ),
        capabilityPoints: [
          { point: bi('在状态不确定性下进行跨周期配置设计', 'Cross-cycle allocation design under regime uncertainty') },
          { point: bi('以风险优先的组合架构与回撤治理', 'Risk-first portfolio architecture with drawdown governance') },
          { point: bi('多资产流动性编排与部署时序管理', 'Multi-asset liquidity orchestration and deployment timing') },
          { point: bi('服务私域资本目标的机构级执行框架', 'Institutional-level execution frameworks for private capital objectives') },
        ],
      },
    ],
    seo: {
      title: bi('创始人 | 星环资本', 'Founder | Star Ring Capital'),
      description: bi(
        '围绕方法论、结构能力与风险哲学的创始人画像。',
        'Founder profile focused on methodology, structural capability, and risk philosophy.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('联系', 'Contact'),
    slug: 'contact',
    navigation: {
      navLabel: bi('联系', 'Contact'),
      showInNav: true,
      navOrder: 8,
    },
    layout: [
      {
        blockType: 'contactModule',
        heading: bi('联系', 'Contact'),
        email: 'alignment@starringcapital.com',
        alignmentCopy: bi('仅接受战略同频协作。', 'By strategic alignment only.'),
        enableForm: true,
        formFields: [
          {
            label: bi('姓名', 'Name'),
            type: 'text',
            required: true,
            placeholder: bi('请输入你的姓名', 'Your name'),
          },
          {
            label: bi('邮箱', 'Email'),
            type: 'email',
            required: true,
            placeholder: bi('you@domain.com', 'you@domain.com'),
          },
          {
            label: bi('战略背景', 'Strategic Context'),
            type: 'textarea',
            required: true,
            placeholder: bi('请简要描述你的战略协作背景', 'Briefly describe your strategic alignment context'),
          },
        ],
      },
    ],
    seo: {
      title: bi('联系 | 星环资本', 'Contact | Star Ring Capital'),
      description: bi(
        '星环资本战略协作联系通道。',
        'Strategic alignment contact channel for Star Ring Capital.',
      ),
    },
    _status: 'published',
  })

  await upsertPage(payload, {
    title: bi('研究', 'Research'),
    slug: 'research',
    navigation: {
      navLabel: bi('研究', 'Research'),
      showInNav: false,
      navOrder: 99,
    },
    layout: [
      {
        blockType: 'philosophyStatement',
        coreSentence: bi('机构研究模块正在筹备中。', 'Institutional research modules are being prepared.'),
        modules: [
          {
            title: bi('白皮书轨道', 'Whitepaper Track'),
            description: bi(
              '面向机构执行框架的长篇结构分析将分阶段发布。',
              'Long-form structural analysis for institutional execution frameworks will be released in phases.',
            ),
          },
          {
            title: bi('周期报告', 'Cycle Reports'),
            description: bi(
              '跨周期复盘将总结配置逻辑与风险架构演化。',
              'Cross-cycle review notes will summarize allocation logic and risk architecture evolution.',
            ),
          },
          {
            title: bi('运营简报', 'Operational Briefs'),
            description: bi(
              '在受控权限下，可为战略伙伴开放私域运营备忘录。',
              'Private operational memos can be enabled for strategic partners under controlled access.',
            ),
          },
        ],
      },
    ],
    seo: {
      title: bi('研究 | 星环资本', 'Research | Star Ring Capital'),
      description: bi(
        '未来机构研究与白皮书模块入口。',
        'Future institutional research and whitepaper module entrance.',
      ),
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
    title: bi('结构资本白皮书（草稿入口）', 'Structural Capital Whitepaper (Draft Entrance)'),
    slug: 'structural-capital-whitepaper',
    excerpt: bi(
      '未来机构模块占位：聚焦结构驱动的资本影响力与风险架构框架。',
      'Future institutional module placeholder: a framework on structure-driven capital influence and risk architecture.',
    ),
    body: bi(
      '预留用于后续机构发布与白皮书扩展。',
      'Reserved for future institutional publication and whitepaper expansion.',
    ),
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
