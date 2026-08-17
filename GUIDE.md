# The AI Credit Resale Economy: How OpenRouter Made $7B

*Published August 16, 2026 by Varritech*

---

## The Hook

Stripe just dropped **$7+ billion** on a company you've probably never heard of: OpenRouter.

Not a model lab. Not a frontier AI startup. A *credit reseller*.

OpenRouter's entire business? Buy API credits from OpenAI, Anthropic, Google, and others in bulk. Sell them to developers at a markup. Route requests intelligently to maximize margin.

**Revenue:** ~$100M ARR (estimated)  
**Acquisition multiple:** 70x+  
**Time to exit:** 3 years from launch

This is the playbook they used—and how you can build the next version.

---

## The Problem They Solved

In 2024-2025, every developer building with LLMs faced the same nightmare:

1. **Fragmented billing** - Separate accounts for OpenAI, Anthropic, Google, Mistral, Cohere
2. **Credit minimums** - Providers required $500-$10K upfront commitments for volume discounts
3. **Routing complexity** - Different endpoints, auth schemes, rate limits, error handling
4. **No price transparency** - Hard to compare cost-per-token across providers in real-time

Small teams and indie hackers couldn't access enterprise pricing. They were stuck paying retail while larger competitors got 40-60% discounts.

OpenRouter saw the arbitrage opportunity.

---

## The Solution: API Credit Marketplace

### Core Model

```
[Developer] → [OpenRouter Credits] → [Provider APIs]
     ↓              ↓                      ↓
  Pay $100      Keep $20 margin      Pay $80 to OpenAI
```

**Step 1: Aggregate Supply**
- Negotiate bulk rates with all major LLM providers
- Pre-purchase credits at 40-60% discount
- Centralize authentication + routing logic

**Step 2: Unified Interface**
- Single API endpoint for all models
- One credit balance, one invoice
- Automatic fallback if a provider is down

**Step 3: Smart Routing**
- Route each request to the cheapest available provider
- Respect user preferences (e.g., "use Claude for reasoning")
- Optimize for margin while maintaining quality

**Step 4: Developer Experience**
- Drop-in replacement for OpenAI SDK
- Real-time cost tracking per request
- Dashboard showing spend across all providers

---

## The Economics (Real Numbers)

### Unit Economics Per $100 in Developer Spend

| Component | Cost | Margin |
|-----------|------|--------|
| Revenue from dev | $100 | — |
| Provider API cost | $75 | — |
| Infrastructure (routing, DB, support) | $5 | — |
| **Gross Profit** | — | **$20** |
| CAC (sales + marketing) | $8 | — |
| **Net Profit** | — | **$12** |

**Key insight:** At scale, marginal cost per additional request approaches zero. Infrastructure costs don't grow linearly with revenue.

### Why Providers Allowed This

You might wonder: why didn't OpenAI just cut out the middleman?

**Answer:** OpenRouter brought them something money can't buy—**distribution**.

- 50,000+ developers who wouldn't have signed up directly
- Lower support burden (OpenRouter handled tier-1 support)
- Predictable volume (bulk pre-purchases = guaranteed revenue)
- Market intelligence (usage patterns across all providers)

For OpenAI, losing 20% margin was worth gaining 30% more volume.

---

## The Growth Flywheel

```
More developers → More volume → Better provider rates → Lower prices → More developers
```

**Phase 1 (Months 0-6):** Launch with 3 providers (OpenAI, Anthropic, Google). Target indie hackers on Twitter + Hacker News. Hit $10K MRR.

**Phase 2 (Months 6-18):** Add 10+ providers including open-source models. Launch enterprise tier with SLA guarantees. Hit $1M MRR.

**Phase 3 (Months 18-36):** International expansion. Custom routing rules. Fine-tuning marketplace. Hit $8M+ MRR.

**Exit:** Stripe acquires to own the payments layer for AI infrastructure.

---

## How to Fork This Playbook

The credit resale model works for **any fragmented API market**:

### Adjacent Opportunities (2026)

1. **Image Generation APIs** - Midjourney, Stability, Flux, Ideogram all have separate billing
2. **Voice/Speech APIs** - ElevenLabs, PlayHT, WellSaid, Cartesia fragmentation
3. **Video Generation** - Runway, Pika, Luma, Kling no unified access layer
4. **Specialized Models** - Legal, medical, code-audit verticals all siloed
5. **Cloud GPU Markets** - Lambda, CoreWeave, RunPod, Massed Compute price arbitrage

### Build Checklist

- [ ] Identify fragmented API market (5+ providers, no unified layer)
- [ ] Negotiate bulk rates with top 3 providers ($10K+ pre-commit)
- [ ] Build unified SDK (drop-in replacement for leading provider)
- [ ] Create credit system with real-time balance tracking
- [ ] Implement smart routing (cheapest-first with quality guards)
- [ ] Launch on Product Hunt + target niche communities
- [ ] Scale to $100K MRR before expanding provider network
- [ ] Position for acquisition by payments/infra player

---

## Technical Implementation

See `/starter` for runnable code implementing:

- Credit balance management (PostgreSQL + Redis)
- Multi-provider routing with fallback logic
- Usage tracking and cost attribution
- Webhook-based low-balance alerts
- Admin dashboard for margin analytics

**Key architectural decision:** Never store provider API keys on client side. All requests proxy through your router. This prevents bypass and enables dynamic routing.

---

## The Moat

Critics will say: "This is just a thin wrapper. Anyone can copy it."

They're half-right. It *is* easy to copy. But here's what they miss:

**Relationship moat:** By the time competitors launch, you've already negotiated exclusive rates with providers based on your volume.

**Switching costs:** Developers have built their apps on your SDK. Migrating means rewriting integration + losing accumulated credits.

**Data advantage:** You know which models are most profitable per use case. Competitors fly blind.

**Brand:** You become synonymous with "LLM API access" in developer communities.

OpenRouter proved this. Their tech wasn't defensible. Their **position** was.

---

## Lessons for Builders

1. **Don't build what exists** - Don't train another LLM. Build the layer *around* LLMs that everyone needs.

2. **Arbitrage scales** - Finding price inefficiencies between buyers and sellers is a legitimate $10B+ business model.

3. **Distribution > Technology** - OpenRouter won because they reached developers first, not because their tech was better.

4. **Position for the acquirer** - Build something Stripe/PayPal/Shopify would want to own, not something users would pay $10/month for.

5. **Move fast on exits** - When Stripe calls, answer. The AI infra gold rush won't last forever.

---

## Final Thought

The next OpenRouter isn't in LLMs—it's in voice, video, or specialized vertical APIs. The fragmentation is there. The arbitrage opportunity is there.

Who's going to build it?

---

**Fork this repo. Build your version. Ship in 30 days.**

*Varritech builds AI-powered MVPs for startups. We ship in 6 weeks, not 6 months. [varritech.com](https://varritech.com)*
