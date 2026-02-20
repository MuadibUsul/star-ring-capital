'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/cn'
import { t, type SiteLocale } from '@/lib/i18n'

type PageRendererProps = {
  page: any
  locale: SiteLocale
}

type TrajectoryPeriod = {
  period: '3Y' | '1Y' | '3M' | 'YTD'
  points: {
    label: string
    starRingCapital: number
    globalEquityBenchmark: number
    riskFreeBenchmark: number
  }[]
  metrics: {
    cagr: number
    maxDrawdown: number
    volatility: number
    sharpeRatio: number
  }
}

const asDoc = <T,>(value: unknown): T | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  return value as T
}

const asDocArray = <T,>(value: unknown): T[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item) => item && typeof item === 'object') as T[]
}

const percent = (value: number) => `${value.toFixed(2)}%`
const periodOrder: Record<TrajectoryPeriod['period'], number> = {
  '3M': 0,
  '1Y': 1,
  '3Y': 2,
  YTD: 3,
}

function OrbitLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="orbit-ring orbit-ring-1" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-glow" />
    </div>
  )
}

function TrajectoryChart({ block, locale }: { block: any; locale: SiteLocale }) {
  const trajectoryDoc = asDoc<{
    periods?: TrajectoryPeriod[]
    complianceStatements?: { statement?: string }[]
  }>(block.trajectoryData)

  const periods = asDocArray<TrajectoryPeriod>(trajectoryDoc?.periods)
  const supportedPeriods = periods
    .filter((period) => Array.isArray(period.points) && period.points.length > 1)
    .sort((a, b) => periodOrder[a.period] - periodOrder[b.period])
  const [currentPeriod, setCurrentPeriod] = useState<TrajectoryPeriod['period']>(
    (supportedPeriods[0]?.period as TrajectoryPeriod['period']) || '3M',
  )

  const active = useMemo(
    () => supportedPeriods.find((period) => period.period === currentPeriod) || supportedPeriods[0],
    [supportedPeriods, currentPeriod],
  )

  if (!active) {
    return null
  }

  const capitalDomain = useMemo<[number, number]>(() => {
    const values = active.points.flatMap((point) => [
      point.starRingCapital,
      point.globalEquityBenchmark,
      point.riskFreeBenchmark,
    ])
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const padding = Math.max((maxValue - minValue) * 0.22, 2)
    const lower = Math.max(0, Math.floor((minValue - padding) / 5) * 5)
    const upper = Math.ceil((maxValue + padding) / 5) * 5
    return [lower, upper]
  }, [active.points])

  const legendLabel = {
    starRingCapital: t(locale, { en: 'Star Ring Capital', zh: 'Star Ring Capital' }),
    globalEquityBenchmark: t(locale, { en: 'Global Equity Benchmark', zh: '\u5168\u7403\u6743\u76ca\u57fa\u51c6' }),
    riskFreeBenchmark: t(locale, { en: 'Risk-free Benchmark', zh: '\u65e0\u98ce\u9669\u57fa\u51c6' }),
  }

  const periodReturnLabel = t(locale, {
    en: `${active.period} Return`,
    zh: '\u533a\u95f4\u6536\u76ca\u7387',
  })

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--src-muted)]">{block.description}</p>
      </div>

      <div className="flex gap-2">
        {supportedPeriods.map((period) => (
          <button
            className={cn(
              'h-9 rounded-full border px-4 text-xs tracking-[0.14em] uppercase transition-colors',
              period.period === currentPeriod
                ? 'border-[var(--src-accent)] text-[var(--src-accent)]'
                : 'border-[color-mix(in_srgb,var(--src-accent)_24%,transparent)] text-[var(--src-muted)] hover:text-[var(--src-text)]',
            )}
            key={period.period}
            onClick={() => setCurrentPeriod(period.period)}
            type="button"
          >
            {period.period}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <div className="h-[360px] w-full px-2 pt-6 sm:px-6">
          <ResponsiveContainer>
            <LineChart data={active.points}>
              <CartesianGrid stroke="color-mix(in srgb, var(--src-accent) 14%, transparent)" vertical={false} />
              <ReferenceLine
                stroke="color-mix(in srgb, var(--src-accent) 30%, transparent)"
                strokeDasharray="3 4"
                y={100}
              />
              <XAxis
                dataKey="label"
                stroke="color-mix(in srgb, var(--src-muted) 85%, white 15%)"
                tick={{ fill: 'var(--src-muted)', fontSize: 11 }}
              />
              <YAxis
                domain={capitalDomain}
                stroke="color-mix(in srgb, var(--src-muted) 85%, white 15%)"
                tick={{ fill: 'var(--src-muted)', fontSize: 11 }}
                tickCount={6}
                tickFormatter={(value: number) => `${value.toFixed(0)}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(5, 10, 20, 0.94)',
                  border: '1px solid color-mix(in srgb, var(--src-accent) 35%, transparent)',
                  borderRadius: 16,
                  color: 'var(--src-text)',
                }}
              />
              <Line
                dataKey="starRingCapital"
                dot={{ fill: 'var(--src-accent)', r: 3, strokeWidth: 0 }}
                name={legendLabel.starRingCapital}
                stroke="var(--src-accent)"
                strokeLinecap="round"
                strokeWidth={2.6}
                type="linear"
              />
              <Line
                dataKey="globalEquityBenchmark"
                dot={{ fill: '#8b94aa', r: 2.4, strokeWidth: 0 }}
                name={legendLabel.globalEquityBenchmark}
                stroke="#8b94aa"
                strokeLinecap="round"
                strokeWidth={2}
                type="linear"
              />
              <Line
                dataKey="riskFreeBenchmark"
                dot={false}
                name={legendLabel.riskFreeBenchmark}
                stroke="#5e6578"
                strokeDasharray="5 4"
                strokeWidth={1.8}
                type="linear"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--src-muted)]">{periodReturnLabel}</p>
          <p className="mt-3 font-heading text-3xl text-[var(--src-accent)]">{percent(active.metrics.cagr)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--src-muted)]">
            {t(locale, { en: 'Max Drawdown', zh: '\u6700\u5927\u56de\u64a4' })}
          </p>
          <p className="mt-3 font-heading text-3xl text-[var(--src-accent)]">{percent(active.metrics.maxDrawdown)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--src-muted)]">
            {t(locale, { en: 'Volatility', zh: '\u6ce2\u52a8\u7387' })}
          </p>
          <p className="mt-3 font-heading text-3xl text-[var(--src-accent)]">{percent(active.metrics.volatility)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--src-muted)]">
            {t(locale, { en: 'Sharpe Ratio', zh: '\u590f\u666e\u6bd4\u7387' })}
          </p>
          <p className="mt-3 font-heading text-3xl text-[var(--src-accent)]">{active.metrics.sharpeRatio.toFixed(2)}</p>
        </Card>
      </div>

      <div className="space-y-2 border-t border-[color-mix(in_srgb,var(--src-accent)_25%,transparent)] pt-5">
        {asDocArray<{ statement?: string }>(trajectoryDoc?.complianceStatements).map((item, index) => (
          <p className="text-xs text-[var(--src-muted)]" key={`${item.statement}-${index}`}>
            {item.statement}
          </p>
        ))}
      </div>
    </section>
  )
}
function ContactForm({ block, locale }: { block: any; locale: SiteLocale }) {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const entries = Array.from(formData.entries())
      .map(([key, value]) => ({
        label: String(key).trim(),
        value: String(value).trim(),
      }))
      .filter((item) => item.label.length > 0 && item.value.length > 0)

    if (entries.length === 0) {
      setSubmitState('error')
      return
    }

    setSubmitState('submitting')

    try {
      const response = await fetch('/api/strategic-collaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locale,
          sourcePage: window.location.pathname,
          entries,
        }),
      })

      if (!response.ok) {
        throw new Error('submission failed')
      }

      form.reset()
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
      <p className="text-sm text-[var(--src-muted)]">{block.alignmentCopy}</p>
      <a className="inline-block text-sm text-[var(--src-accent)]" href={`mailto:${block.email}`}>
        {block.email}
      </a>

      {block.enableForm && Array.isArray(block.formFields) && block.formFields.length > 0 ? (
        <Card>
          <form className="space-y-4" onSubmit={submit}>
            {block.formFields.map((field: any, index: number) => {
              const key = `${field.label}-${index}`

              if (field.type === 'textarea') {
                return (
                  <div className="space-y-2" key={key}>
                    <label className="text-xs uppercase tracking-[0.12em] text-[var(--src-muted)]">{field.label}</label>
                    <Textarea
                      name={field.label}
                      placeholder={field.placeholder || ''}
                      required={Boolean(field.required)}
                    />
                  </div>
                )
              }

              return (
                <div className="space-y-2" key={key}>
                  <label className="text-xs uppercase tracking-[0.12em] text-[var(--src-muted)]">{field.label}</label>
                  <Input
                    name={field.label}
                    placeholder={field.placeholder || ''}
                    required={Boolean(field.required)}
                    type={field.type === 'email' ? 'email' : 'text'}
                  />
                </div>
              )
            })}

            <Button disabled={submitState === 'submitting'} type="submit">
              {t(locale, {
                en: submitState === 'submitting' ? 'Submitting...' : 'Submit Alignment Request',
                zh: submitState === 'submitting' ? '\u63d0\u4ea4\u4e2d...' : '\u63d0\u4ea4\u534f\u540c\u7533\u8bf7',
              })}
            </Button>

            {submitState === 'success' ? (
              <p className="text-xs text-[var(--src-accent)]">
                {t(locale, {
                  en: 'Received. Our team will review and follow up shortly.',
                  zh: '\u5df2\u6536\u5230\uff0c\u6211\u4eec\u4f1a\u5c3d\u5feb\u8bc4\u4f30\u5e76\u8054\u7cfb\u4f60\u3002',
                })}
              </p>
            ) : null}

            {submitState === 'error' ? (
              <p className="text-xs text-[var(--src-muted)]">
                {t(locale, {
                  en: 'Submission failed. Please retry or email us directly.',
                  zh: '\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u6216\u76f4\u63a5\u53d1\u9001\u90ae\u4ef6\u8054\u7cfb\u3002',
                })}
              </p>
            ) : null}
          </form>
        </Card>
      ) : null}
    </section>
  )
}

export function PageDocumentRenderer({ page, locale }: PageRendererProps) {
  const blocks = Array.isArray(page?.layout) ? page.layout : []

  return (
    <article className="relative mx-auto w-full max-w-7xl space-y-18 px-6 py-16 lg:px-10 lg:py-24">
      {blocks.map((block: any, index: number) => {
        const key = `${block.blockType}-${index}`

        if (block.blockType === 'homeHero') {
          return (
            <section className="relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--src-accent)_25%,transparent)] px-8 py-20 lg:px-14" key={key}>
              <OrbitLayer />
              <div className="relative z-10 max-w-3xl space-y-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--src-accent)]">
                  {t(locale, {
                    en: 'Private Capital Structure Office',
                    zh: '\u79c1\u57df\u8d44\u672c\u7ed3\u6784\u529e\u516c\u5ba4',
                  })}
                </p>
                <h1 className="font-heading text-5xl leading-tight text-[var(--src-text)] lg:text-7xl">{block.brandName}</h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--src-muted)]">{block.positioning}</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href={block.primaryCTA?.url || '/philosophy'}>
                      {block.primaryCTA?.label ||
                        t(locale, {
                          en: 'Explore Philosophy',
                          zh: '\u63a2\u7d22\u7406\u5ff5',
                        })}
                    </Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href={block.secondaryCTA?.url || '/contact'}>
                      {block.secondaryCTA?.label ||
                        t(locale, {
                          en: 'Strategic Collaboration',
                          zh: '\u6218\u7565\u534f\u4f5c',
                        })}
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'corePillars') {
          return (
            <section className="space-y-6" key={key}>
              <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
              <div className="grid gap-4 lg:grid-cols-3">
                {asDocArray<{ title?: string; description?: string }>(block.cards).map((card, cardIndex) => (
                  <Card key={`${card.title}-${cardIndex}`}>
                    <p className="font-heading text-xl text-[var(--src-text)]">{card.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--src-muted)]">{card.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          )
        }

        if (block.blockType === 'philosophyStatement') {
          return (
            <section className="space-y-8" key={key}>
              <Card className="py-10">
                <p className="font-heading text-2xl text-[var(--src-accent)] lg:text-4xl">{block.coreSentence}</p>
              </Card>

              <div className="grid gap-4 lg:grid-cols-3">
                {asDocArray<{ title?: string; description?: string }>(block.modules).map((item, itemIndex) => (
                  <Card key={`${item.title}-${itemIndex}`}>
                    <p className="font-heading text-lg text-[var(--src-text)]">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--src-muted)]">{item.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          )
        }

        if (block.blockType === 'capitalDomains') {
          return (
            <section className="space-y-6" key={key}>
              <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
              <div className="grid gap-4 lg:grid-cols-3">
                {asDocArray<any>(block.domains).map((domain, domainIndex) => (
                  <Card className="flex flex-col justify-between" key={`${domain.title}-${domainIndex}`}>
                    <div>
                      <p className="font-heading text-xl text-[var(--src-text)]">{domain.title}</p>
                      <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--src-muted)]">
                        <p>{domain.line1}</p>
                        <p>{domain.line2}</p>
                        <p>{domain.line3}</p>
                      </div>
                    </div>
                    {domain.readMoreLabel && domain.readMoreUrl ? (
                      <Link className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--src-accent)]" href={domain.readMoreUrl}>
                        {domain.readMoreLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : null}
                  </Card>
                ))}
              </div>
            </section>
          )
        }

        if (block.blockType === 'trajectoryViewer') {
          return <TrajectoryChart block={block} key={key} locale={locale} />
        }

        if (block.blockType === 'riskArchitecture') {
          return (
            <section className="space-y-6" key={key}>
              <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {asDocArray<any>(block.layers).map((layer, layerIndex) => (
                  <Card key={`${layer.layerName}-${layerIndex}`}>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--src-accent)]">
                      {t(locale, { en: 'Layer', zh: '\u5c42\u7ea7' })} {layerIndex + 1}
                    </p>
                    <p className="mt-2 font-heading text-xl text-[var(--src-text)]">{layer.layerName}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--src-muted)]">{layer.purpose}</p>
                    <ul className="mt-4 space-y-2 text-sm text-[var(--src-muted)]">
                      {asDocArray<{ item?: string }>(layer.bullets).map((bullet, bulletIndex) => (
                        <li key={`${bullet.item}-${bulletIndex}`}>? {bullet.item}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>
          )
        }

        if (block.blockType === 'engagementNarratives') {
          const cases = asDocArray<any>(block.cases)

          return (
            <section className="space-y-6" key={key}>
              <div className="space-y-3">
                <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
                <p className="max-w-3xl text-sm leading-7 text-[var(--src-muted)]">{block.description}</p>
              </div>
              <div className="space-y-4">
                {cases.map((entry, entryIndex) => (
                  <Card key={`${entry.strategicName}-${entryIndex}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--src-accent)]">{entry.year}</p>
                      <p className="font-heading text-xl text-[var(--src-text)]">{entry.strategicName}</p>
                    </div>
                    <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--src-muted)]">
                      {asDocArray<{ line?: string }>(entry.summaryLines).map((line, lineIndex) => (
                        <p key={`${line.line}-${lineIndex}`}>{line.line}</p>
                      ))}
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[var(--src-accent)]">{entry.resultSignature}</p>
                  </Card>
                ))}
              </div>
            </section>
          )
        }

        if (block.blockType === 'founderProfile') {
          const portrait = asDoc<{ url?: string; alt?: string }>(block.portrait)

          return (
            <section className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]" key={key}>
              <Card className="overflow-hidden p-0">
                {portrait?.url ? (
                  <img alt={portrait.alt || block.heading} className="h-full min-h-[360px] w-full object-cover" src={portrait.url} />
                ) : (
                  <div className="grid min-h-[360px] place-items-center text-sm text-[var(--src-muted)]">
                    {t(locale, { en: 'Founder Portrait', zh: '\u521b\u59cb\u4eba\u8096\u50cf' })}
                  </div>
                )}
              </Card>

              <Card>
                <h2 className="font-heading text-3xl text-[var(--src-text)]">{block.heading}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--src-muted)]">{block.narrative}</p>
                <div className="mt-6 space-y-3">
                  {asDocArray<{ point?: string }>(block.capabilityPoints).map((item, itemIndex) => (
                    <p className="text-sm text-[var(--src-muted)]" key={`${item.point}-${itemIndex}`}>
                      ? {item.point}
                    </p>
                  ))}
                </div>
              </Card>
            </section>
          )
        }

        if (block.blockType === 'contactModule') {
          return <ContactForm block={block} key={key} locale={locale} />
        }

        return null
      })}
    </article>
  )
}

