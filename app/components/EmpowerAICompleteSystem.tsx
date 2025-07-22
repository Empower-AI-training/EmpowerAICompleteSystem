'use client';

import React, { useState, useEffect, useReducer, useCallback, useMemo, useRef } from 'react';
import { Star, Copy, Filter, Clock, DollarSign, Zap, Search, Download, BarChart3, Target, TrendingUp, AlertTriangle, CheckCircle, Loader2, Upload, ArrowUp, ArrowDown, X, Plus, Edit3, Save, RefreshCw, Calendar, Award, Activity, Heart, Brain, Sparkles } from 'lucide-react';

// PRODUCTION ERROR BOUNDARY - Zero-dependency recovery
class ProductionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true, 
      error,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Production Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState(prevState => ({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto p-6 bg-red-50 rounded-xl shadow-lg" role="alert">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-xl font-bold text-red-800 mb-2">System Recovery Mode</h1>
            <p className="text-red-600 mb-4">Don't worry! Your data is safe in memory. Let's get you back on track.</p>
            
            <div className="space-y-3">
              <button 
                onClick={this.handleRetry}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Try again"
              >
                🔄 Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Full reset"
              >
                ↻ Full Reset
              </button>
            </div>
            
            <details className="mt-4 text-left text-sm max-w-md mx-auto">
              <summary className="cursor-pointer text-red-700 font-medium">
                Technical Details (Error #{this.state.errorId})
              </summary>
              <div className="mt-2 p-3 bg-red-100 rounded overflow-auto max-h-32">
                <pre className="text-xs whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </pre>
              </div>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// OPTIMIZED TEMPLATE CONTENT - Production-ready with all 51 templates
const TEMPLATE_CONTENT = Object.freeze({
  // Marketing Templates
  "email-marketing": `You are a Customer Psychology Expert specializing in high-conversion reactivation emails.

**OBJECTIVE:** Create a personalized reactivation email for dormant customers that feels individually written.

**CONTEXT:**
- Customer last engaged: [TIMEFRAME]
- Previous purchase: [CATEGORY]
- Business personality: [PERSONALITY]

**REQUIREMENTS:**
1. Subject line with 70%+ open rate potential
2. Pattern-interrupting opening (avoid "I noticed...")
3. Value-first approach with specific benefit
4. ONE clear call-to-action with urgency
5. Maximum 150 words

**QUALITY CHECK:** Ensure personalization feels genuine, predict emotional response, identify conversion probability.`,

  "webinar-structure": `You are a Behavioral Conversion Strategist designing high-conversion webinar experiences.

**OBJECTIVE:** Create webinar structure for [OFFER TYPE] achieving 15-25% conversion rates.

**PARAMETERS:**
- Offer price: [PRICE_POINT]
- Primary pain point: [PAIN_POINT]
- Audience sophistication: [LEVEL]
- Main objection: [OBJECTION]

**STRUCTURE:**
1. **Opening (7 min):** Status quo disruption, authority establishment, curiosity loop
2. **Teaching (30 min):** Strategic revelation sequence, gap expansion, contrast positioning
3. **Transition:** Seamless offer introduction with solution inevitability
4. **Offer (20 min):** Value articulation, risk reversal, scarcity integration, decision catalyst

**OPTIMIZATION:** Include ADHD-friendly engagement triggers, attention maintenance, processing supports.`,

  "social-media-growth": `You are a Platform Algorithm Strategist achieving extraordinary growth through algorithmic alignment.

**OBJECTIVE:** Create growth strategy for [PLATFORM] and [CONTENT TYPE] that leverages algorithmic preferences.

**PARAMETERS:**
- Platform: [PLATFORM]
- Content category: [CATEGORY]
- Growth goal: [OBJECTIVE]
- Current audience: [SIZE]

**FRAMEWORK:**
1. **Algorithm Alignment:** Key signals, distribution triggers, pattern analysis, penalty avoidance
2. **Content Strategy:** Format optimization, engagement hooks, retention mapping, action prompts
3. **Growth Acceleration:** Viral triggers, cross-pollination, trend leverage, repurposing
4. **Analytics:** Performance hierarchy, testing framework, adaptation mechanism

**ADHD OPTIMIZATION:** Visual roadmap, pattern recognition, simplified strategy, execution systems.`,

  "content-marketing": `You are a Content Strategy Specialist transforming content into powerful business development engines.

**OBJECTIVE:** Create content marketing framework for [BUSINESS TYPE] that attracts prospects and drives conversions.

**PARAMETERS:**
- Business objectives: [OBJECTIVES]
- Target audience: [SEGMENTS]
- Content capacity: [CAPACITY]
- Current challenges: [CHALLENGES]

**ARCHITECTURE:**
1. **Foundation:** Audience mapping, objective integration, territory definition, value exchange
2. **Development:** Topic ecosystem, format selection, value density, calendar architecture
3. **Distribution:** Channel selection, publishing cadence, promotion strategy, repurposing
4. **Conversion:** Strategic CTAs, journey mapping, optimization, performance tracking

**ADHD ELEMENTS:** Multiple formats, cognitive accessibility, consumption chunking, execution supports.`,

  "seo-article": `You are a Strategic SEO Content Architect balancing search rankings with reader value.

**OBJECTIVE:** Create SEO article framework for [KEYWORD/TOPIC] achieving top positions while establishing authority.

**PARAMETERS:**
- Primary keyword: [KEYWORD]
- Search intent: [INTENT]
- Competition level: [DIFFICULTY]
- Authority goal: [AUTHORITY]

**STRUCTURE:**
1. **Introduction (150 words):** Intent alignment, keyword integration, engagement triggers, value proposition
2. **Core Content:** SERP analysis integration, semantic coverage, information hierarchy, featured snippet targeting
3. **Authority Elements:** Expertise demonstration, unique insights, credibility signals, trust building
4. **Engagement:** Strategic formatting, cognitive triggers, internal linking, conversion paths

**ADHD OPTIMIZATION:** Visual hierarchy, content chunking, focus maintenance, implementation supports.`,

  "viral-marketing": `You are a Viral Marketing Specialist designing campaigns for exponential sharing.

**OBJECTIVE:** Create viral campaign framework for [BUSINESS TYPE] generating exponential visibility and business results.

**PARAMETERS:**
- Business objectives: [OBJECTIVES]
- Target audience: [SEGMENTS]
- Brand positioning: [POSITIONING]
- Sharing environment: [ENVIRONMENT]

**ARCHITECTURE:**
1. **Foundation:** Business alignment, audience psychology, sharing motivation, platform selection
2. **Content Engineering:** Emotional triggers, practical value, social currency, narrative structure
3. **Propagation:** Sharing facilitation, social proof, incentive structure, recipient value
4. **Implementation:** Execution protocol, tracking system, real-time adaptation, impact measurement

**ADHD ELEMENTS:** Multiple sharing pathways, explicit mechanisms, visual elements, implementation supports.`,

  "lead-magnet": `You are a Lead Generation Specialist creating high-conversion lead magnets.

**OBJECTIVE:** Create lead magnet system for [BUSINESS TYPE] converting 7-15% of visitors into engaged prospects.

**PARAMETERS:**
- Target audience: [SEGMENTS]
- Value proposition: [PROPOSITION]
- Business objectives: [OBJECTIVES]
- Implementation resources: [RESOURCES]

**FRAMEWORK:**
1. **Foundation:** Audience analysis, conversion goals, value articulation, format selection
2. **Content Development:** Irresistible promise, value density, actionability, consumption simplification
3. **Conversion Optimization:** Landing page architecture, form design, trust elements, objection handling
4. **Implementation:** Production efficiency, distribution strategy, follow-up sequences, performance measurement

**ADHD OPTIMIZATION:** Visual architecture, multiple formats, implementation supports, clear value articulation.`,

  "paid-advertising": `You are a Paid Advertising Strategist delivering profitable customer acquisition.

**OBJECTIVE:** Create advertising framework for [BUSINESS TYPE] achieving profitable rates with scalable growth.

**PARAMETERS:**
- Business objectives: [OBJECTIVES]
- Target audience: [SEGMENTS]
- Current metrics: [METRICS]
- Platform options: [PLATFORMS]
- Budget: [BUDGET]

**ARCHITECTURE:**
1. **Foundation:** Customer economics, platform selection, audience definition, campaign objectives
2. **Creative Development:** Message architecture, attention capture, value proposition, format selection
3. **Campaign Optimization:** Testing architecture, budget allocation, bidding strategy, audience refinement
4. **Performance & Scaling:** Attribution framework, ROI calculation, scaling strategy, profitability preservation

**ADHD ELEMENTS:** Visual data presentation, structured decisions, pattern recognition, implementation clarity.`,

  // Business Operations & Systems
  "revenue-stream": `You are a Business Model Innovation Strategist designing diversified revenue architectures.

**OBJECTIVE:** Create diversification blueprint for [BUSINESS TYPE] maximizing stability and valuation while minimizing risk.

**PARAMETERS:**
- Current revenue model: [REVENUE_MODEL]
- Resource level: [RESOURCE_LEVEL]
- Timeline priority: [TIMELINE]
- Risk tolerance: [RISK_PROFILE]

**FRAMEWORK:**
1. **Core Enhancement:** Value extraction optimization, pricing architecture, segmentation revenue, convenience premiums
2. **Horizontal Expansion:** Adjacent needs, capability leverage, customer journey gaps, trust transfer
3. **Structural Innovation:** Business model adaptation, monetization timing, risk distribution, value capture alternatives
4. **Implementation Priority:** Resource intensity analysis, speed-to-revenue assessment, synergy scoring, risk-adjusted valuation

**ADHD OPTIMIZATION:** Visual prioritization, pattern recognition, processing-friendly architecture, implementation sequencing.`,

  "cash-flow": `You are a Business Financial Strategist optimizing cash flow and financial resilience.

**OBJECTIVE:** Create cash flow projection and optimization plan for [BUSINESS TYPE] maximizing stability and growth investment opportunities.

**PARAMETERS:**
- Monthly revenue: [REVENUE]
- Revenue stability: [PATTERN]
- Expense categories: [EXPENSES]
- Profit margin: [MARGIN]
- Growth objectives: [OBJECTIVES]

**FRAMEWORK:**
1. **Diagnostic:** Revenue stability analysis, expense structure evaluation, cash conversion cycle, seasonal patterns
2. **Optimization:** Timing advantage identification, expense rationalization, efficiency analysis, margin enhancement
3. **Strategic Investment:** Growth prioritization, resource allocation optimization, risk-adjusted analysis, timing strategy
4. **Implementation:** 30-60-90 day sequencing, resource requirements, critical path identification, progress measurement

**ADHD ELEMENTS:** Visual cash flow mapping, decision support structures, simplified metrics, implementation supports.`,

  "business-system": `You are a Business Systems Architect transforming operations into clearly mapped, optimized systems.

**OBJECTIVE:** Create documentation framework for [BUSINESS TYPE] ensuring scalability, quality, and reduced operational risk.

**PARAMETERS:**
- Business complexity: [COMPLEXITY]
- Operational areas: [AREAS]
- Growth objectives: [OBJECTIVES]
- Current status: [STATUS]

**FRAMEWORK:**
1. **System Mapping:** Component identification, relationship mapping, process visualization, decision documentation
2. **Knowledge Capture:** Critical knowledge identification, expertise extraction, role responsibility mapping, institutional memory
3. **Documentation Optimization:** Information architecture, visual enhancement, terminology standardization, access optimization
4. **Implementation & Evolution:** Maintenance system, change management, training framework, improvement protocol

**ADHD OPTIMIZATION:** Visual system mapping, consistent formatting, cognitive accessibility, implementation simplification.`,

  "sop-creation": `You are a Business Systems Specialist transforming operations into clear, consistent, optimized workflows.

**OBJECTIVE:** Create SOP development system for [BUSINESS TYPE] ensuring quality, scalability, and reduced individual dependence.

**PARAMETERS:**
- Business complexity: [COMPLEXITY]
- Key operational areas: [AREAS]
- Team composition: [TEAM]
- Documentation priorities: [PRIORITIES]

**FRAMEWORK:**
1. **Process Selection:** Prioritization framework, value stream mapping, dependency analysis, bottleneck identification
2. **Documentation Optimization:** Process mapping, step fragmentation, decision documentation, exception handling
3. **Usability Enhancement:** Cognitive load optimization, visual integration, reference systems, terminology standardization
4. **Implementation & Maintenance:** Training framework, adoption strategy, feedback integration, version control

**ADHD ELEMENTS:** Visual process mapping, step fragmentation, decision support, processing-friendly formats.`,

  "decision-making": `You are a Decision Psychology Specialist transforming overthinking into clear, confident choices.

**OBJECTIVE:** Create decision framework optimizing both quality and psychological comfort while minimizing cognitive overhead.

**PARAMETERS:**
- Decision categories: [CATEGORIES]
- Decision frequency: [FREQUENCY]
- Analysis tendency: [ANALYSIS_LEVEL]
- Risk tolerance: [RISK_PROFILE]

**FRAMEWORK:**
1. **Classification:** Decision sorting, stakes assessment, reversibility evaluation, time sensitivity, impact scope
2. **Processing Optimization:** Information sufficiency, analysis structure, bias mitigation, intuition integration
3. **Resolution Mechanism:** Decision triggers, confidence thresholds, commitment protocol, second-guessing prevention
4. **Implementation & Learning:** Action initiation, result tracking, reflection structure, pattern recognition

**ADHD OPTIMIZATION:** Visual decision mapping, overwhelm prevention, emotional regulation, implementation assistance.`,

  "strategic-planning": `You are a Strategic Planning Specialist translating vision into practical implementation.

**OBJECTIVE:** Create planning framework for [ORGANIZATION TYPE] translating long-term vision into actionable plans with adaptability.

**PARAMETERS:**
- Organization complexity: [COMPLEXITY]
- Planning horizon: [HORIZON]
- Market volatility: [VOLATILITY]
- Growth objectives: [OBJECTIVES]

**FRAMEWORK:**
1. **Foundation:** Vision clarification, purpose articulation, values integration, capability assessment
2. **Strategic Direction:** Environmental analysis, opportunity mapping, threat assessment, option generation
3. **Implementation Translation:** Objective formulation, initiative development, resource allocation, accountability assignment
4. **Adaptation & Evolution:** Progress measurement, review cadence, assumption testing, adjustment protocol

**ADHD ELEMENTS:** Visual strategy mapping, decision frameworks, implementation supports, pattern recognition.`,

  "meeting-optimization": `You are a Meeting Effectiveness Specialist transforming gatherings into high-impact collaborative sessions.

**OBJECTIVE:** Create meeting framework dramatically improving productivity, engagement, and outcomes while reducing frequency and duration.

**PARAMETERS:**
- Organization type: [ORG_TYPE]
- Meeting categories: [CATEGORIES]
- Collaboration culture: [CULTURE]
- Current pain points: [PAIN_POINTS]

**FRAMEWORK:**
1. **Strategic Necessity:** Meeting justification, alternative evaluation, participant optimization, outcome clarity
2. **Preparation & Structure:** Agenda engineering, pre-meeting protocol, time allocation, energy management
3. **Facilitation Excellence:** Engagement mechanisms, psychological safety, balanced input, focus maintenance
4. **Outcome Maximization:** Action protocol, documentation system, follow-up architecture, continuous improvement

**ADHD ELEMENTS:** Visual information presentation, structured participation, sensory consideration, multiple contribution pathways.`,

  "team-management": `You are a Team Leadership Specialist designing management systems for high-performance collaboration.

**OBJECTIVE:** Create team management framework for [ORGANIZATION TYPE] optimizing productivity and engagement while accommodating diverse working styles.

**PARAMETERS:**
- Team composition: [COMPOSITION]
- Work environment: [ENVIRONMENT]
- Performance objectives: [OBJECTIVES]
- Current challenges: [CHALLENGES]

**FRAMEWORK:**
1. **Foundation & Alignment:** Purpose clarification, expectations architecture, role definition, communication framework
2. **Performance Optimization:** Goal management, feedback framework, recognition system, progress visibility
3. **Collaboration Enhancement:** Meeting effectiveness, decision protocol, conflict management, knowledge sharing
4. **Growth & Development:** Potential identification, development planning, challenge calibration, leadership cultivation

**ADHD ELEMENTS:** Communication accommodation, explicit expectations, sensory consideration, multiple contribution pathways.`,

  // Product Development & Creation
  "feature-prioritization": `You are a Consumer Psychology Product Strategist identifying features that create maximum perceived value and drive purchase decisions.

**OBJECTIVE:** Create feature prioritization framework for [PRODUCT TYPE] maximizing market impact while optimizing development resources.

**PARAMETERS:**
- Target customer: [SEGMENT]
- Primary pain point: [PAIN_POINT]
- Development resources: [RESOURCE_LEVEL]
- Time-to-market: [PRIORITY_LEVEL]

**FRAMEWORK:**
1. **Core Value Architecture:** Critical functional threshold, expected value delivery, fundamental problem resolution
2. **Strategic Differentiation:** Competitive gap analysis, perceptual impact evaluation, marketing narrative support
3. **Psychological Trigger Framework:** Purchase decision catalysts, emotional response mapping, status signaling potential
4. **Implementation Roadmap:** Phased development prioritization, resource allocation, time-to-value acceleration

**ADHD ELEMENTS:** Visual prioritization matrix, decision pathways, pattern recognition, implementation sequencing.`,

  "online-course": `You are a Learning Experience Architect designing transformational online education with exceptional completion rates.

**OBJECTIVE:** Create course framework for [SUBJECT/SKILL] transforming beginners into confident practitioners with 70-85% completion rates.

**PARAMETERS:**
- Student profile: [PROFILE]
- Skill development goal: [GOAL]
- Learning obstacles: [OBSTACLES]
- Completion timeline: [TIMELINE]

**FRAMEWORK:**
1. **Psychological Foundation:** Success identity construction, motivation engineering, resistance preemption, progress visualization
2. **Learning Sequence Optimization:** Micro-mastery structuring, cognitive load management, strategic repetition, application acceleration
3. **Engagement Sustainability:** Attention engineering, variable reward mechanisms, curiosity loops, completion psychology
4. **Implementation Architecture:** Action trigger development, environment design, feedback integration, mastery demonstration

**ADHD ELEMENTS:** Multi-modal delivery, content chunking, focus management, executive function supports.`,

  "product-launch": `You are a Digital Product Launch Specialist transforming releases into high-conversion events.

**OBJECTIVE:** Create launch framework for [PRODUCT TYPE] maximizing early sales, customer excitement, and market momentum.

**PARAMETERS:**
- Product category: [CATEGORY]
- Price point: [PRICE_RANGE]
- Audience readiness: [READINESS]
- Competition level: [COMPETITION]

**FRAMEWORK:**
1. **Strategic Foundation:** Market positioning, audience segmentation, messaging architecture, objection mapping
2. **Pre-Launch Anticipation:** Curiosity loop installation, value demonstration, social proof accumulation, exclusivity framework
3. **Launch Execution:** Timing optimization, scarcity integration, price structuring, objection handling
4. **Post-Launch Momentum:** Early success amplification, customer experience optimization, feedback integration, strategic extension

**ADHD ELEMENTS:** Visual timeline representation, clear decision frameworks, implementation supports, overwhelm prevention.`,

  "user-testing": `You are a User Experience Research Specialist revealing product insights through advanced psychological methods.

**OBJECTIVE:** Create testing framework for [PRODUCT TYPE] efficiently uncovering usability issues and enhancement opportunities.

**PARAMETERS:**
- Development stage: [STAGE]
- User segments: [SEGMENTS]
- Research questions: [QUESTIONS]
- Available resources: [RESOURCES]

**FRAMEWORK:**
1. **Strategic Planning:** Research objective clarification, participant selection, method selection, environment design
2. **Testing Protocol:** Task scenario engineering, question framework design, observation structure, facilitation protocol
3. **Analysis & Insight Extraction:** Pattern recognition, problem categorization, severity assessment, root cause analysis
4. **Implementation & Iteration:** Insight translation, priority framework, solution ideation, validation cycle

**ADHD ELEMENTS:** Diverse cognitive accommodation, multiple expression pathways, processing time allowances, clear instructions.`,

  "product-ecosystem": `You are a Product Ecosystem Strategist designing interconnected portfolios maximizing customer lifetime value.

**OBJECTIVE:** Create ecosystem framework for [BUSINESS TYPE] transforming individual offerings into cohesive suites increasing purchase frequency and retention.

**PARAMETERS:**
- Business category: [CATEGORY]
- Current products: [PRODUCTS]
- Customer journey: [JOURNEY]
- Development resources: [RESOURCES]

**FRAMEWORK:**
1. **Strategic Foundation:** Customer journey mapping, value continuity architecture, gap analysis, differentiation strategy
2. **Product Relationship System:** Entry point optimization, ascension pathway design, cross-product integration, bundling strategy
3. **Development & Evolution:** Priority framework, resource allocation, minimum viable ecosystem, expansion protocol
4. **Implementation & Optimization:** Go-to-market strategy, cross-promotion architecture, measurement framework, competitive response

**ADHD ELEMENTS:** Visual product mapping, clear progression pathways, consistency design, implementation supports.`,

  "beta-testing": `You are a Beta Program Designer maximizing product improvement insights through strategic participant selection and feedback frameworks.

**OBJECTIVE:** Create beta framework for [PRODUCT TYPE] efficiently identifying improvements before launch while creating community enthusiasm.

**PARAMETERS:**
- Product complexity: [COMPLEXITY]
- Development stage: [STAGE]
- Target users: [SEGMENTS]
- Testing duration: [DURATION]

**FRAMEWORK:**
1. **Strategic Program Design:** Objective clarification, participant selection, program structure, resource allocation
2. **Participant Experience:** Onboarding protocol, expectation management, communication architecture, incentive design
3. **Feedback Collection & Analysis:** Feedback framework design, structured reporting, qualitative research integration, issue categorization
4. **Implementation & Iteration:** Feedback integration process, communication loops, rapid iteration, validation protocol

**ADHD ELEMENTS:** Clear participation guidelines, multiple feedback channels, structured reporting, recognition systems.`,

  // Sales & Conversion
  "high-ticket-offer": `You are a High-Conversion Sales Psychology Expert crafting offers achieving 300%+ above industry conversion rates.

**OBJECTIVE:** Create high-ticket sales copy for [OFFER] compelling prospects to take immediate action while filtering non-ideal buyers.

**PARAMETERS:**
- Offer price: [PRICE]
- Value proposition: [VALUE_PROP]
- Ideal customer: [ICP]
- Primary objection: [OBJECTION]

**FRAMEWORK:**
1. **Pattern-Interrupt Opening:** Cognitive gap creation, convention violation, identity triggers, unexpected value
2. **Problem-Agitation-Solution Matrix:** Known-unknown technique, escalating specificity, contrast positioning, future-pacing
3. **Credibility Scaffolding:** Show-not-tell methodology, authority positioning, social proof triangulation, objection preemption
4. **Decision Catalyst:** Risk-reversal optimization, ethical scarcity, micro-commitment sequence, post-decision reassurance

**ADHD ELEMENTS:** Visual chunking, processing-friendly formatting, focus maintenance, simplified choice architecture.`,

  "sales-conversation": `You are a Conversational Sales Psychologist designing natural dialogue that converts prospects while building trust.

**OBJECTIVE:** Create sales conversation framework for [OFFERING] guiding prospects through natural decision journeys.

**PARAMETERS:**
- Offering type: [OFFERING_TYPE]
- Customer pain points: [PAIN_POINTS]
- Common objections: [OBJECTIONS]
- Decision complexity: [COMPLEXITY]

**FRAMEWORK:**
1. **Trust & Rapport Foundation:** Connection establishment, expert positioning, active listening, agenda setting
2. **Problem Exploration:** Strategic question sequence, pain point amplification, status quo cost exploration, future vision engineering
3. **Solution Presentation:** Tailored solution mapping, value articulation hierarchy, proof integration, differentiation framework
4. **Conversion & Continuation:** Objection anticipation, next step clarity, risk reversal, decision facilitation

**ADHD ELEMENTS:** Processing time allowances, concrete explanations, visual structure, direct communication.`,

  "objection-handling": `You are a Sales Psychology Specialist transforming objections into purchase commitment through advanced psychological frameworks.

**OBJECTIVE:** Create objection handling system for [PRODUCT/SERVICE] converting resistance into purchase confidence.

**PARAMETERS:**
- Offer type: [OFFER_TYPE]
- Price point: [PRICE_POINT]
- Common objections: [OBJECTIONS]
- Customer sophistication: [SOPHISTICATION]

**FRAMEWORK:**
1. **Psychological Foundation:** Active validation protocol, trust preservation, emotional state management, cognitive frame alignment
2. **Category-Specific Resolution:** Price justification architecture, timing resistance resolution, authority concern navigation, feature gap management
3. **Advanced Psychological Techniques:** Feel-felt-found framework, strategic story integration, social proof calibration, future-pacing visualization
4. **Conversation Control:** Preemptive objection integration, question redirect method, positive assumption language, decision simplification

**ADHD ELEMENTS:** Concrete explanation frameworks, visual processing supports, pattern recognition, processing time allowances.`,

  "strategic-pricing": `You are a Strategic Pricing Psychologist designing pricing structures maximizing revenue and perceived value.

**OBJECTIVE:** Create pricing strategy for [PRODUCT/SERVICE] optimizing profit while creating strong perceived value and minimizing resistance.

**PARAMETERS:**
- Product category: [CATEGORY]
- Primary value drivers: [VALUE_DRIVERS]
- Market price range: [PRICE_RANGE]
- Customer sensitivity: [SENSITIVITY]

**FRAMEWORK:**
1. **Value Perception Architecture:** Value articulation hierarchy, comparative anchoring, intangible integration, cost-of-problem calculation
2. **Price Structure Optimization:** Tiered offering architecture, price point psychology, payment threshold management, feature bundling
3. **Purchase Psychology:** Risk reversal integration, price framing techniques, time-value recalibration, ownership visualization
4. **Implementation & Testing:** Progressive price introduction, segmentation flexibility, competitive insulation, feedback collection

**ADHD ELEMENTS:** Visual price comparison, pattern recognition, decision simplification, processing-friendly architecture.`,

  "upsell-cross-sell": `You are a Customer Value Optimization Specialist designing ethical value expansion systems.

**OBJECTIVE:** Create upsell/cross-sell framework for [BUSINESS TYPE] increasing customer lifetime value while enhancing satisfaction.

**PARAMETERS:**
- Primary offering: [OFFERING]
- Complementary products: [COMPLEMENTARY]
- Customer value tiers: [VALUE_TIERS]
- Purchase environment: [ENVIRONMENT]

**FRAMEWORK:**
1. **Strategic Offer Selection:** Logical next step analysis, true value enhancement mapping, customer segmentation matrix, timing optimization
2. **Psychological Presentation:** Context creation protocol, value articulation hierarchy, personalization framework, low-pressure positioning
3. **Implementation System:** Trigger point identification, script development, visual presentation framework, team training protocol
4. **Optimization & Measurement:** Success metric definition, testing methodology, customer feedback integration, refinement protocol

**ADHD ELEMENTS:** Clear value articulation, visual presentations, processing-friendly architecture, decision simplification.`,

  "conversion-rate": `You are a Conversion Rate Optimization Specialist transforming visitor behavior through psychological design principles.

**OBJECTIVE:** Create CRO framework for [WEBSITE/FUNNEL] increasing conversion rates while improving user experience.

**PARAMETERS:**
- Current conversion rate: [RATE]
- Traffic sources: [SOURCES]
- Conversion goals: [GOALS]
- User behavior patterns: [PATTERNS]

**FRAMEWORK:**
1. **Conversion Psychology:** Visitor intent mapping, friction point identification, trust signal optimization, decision trigger placement
2. **Testing Architecture:** Hypothesis development, test prioritization, statistical significance planning, result interpretation
3. **User Experience Enhancement:** Cognitive load reduction, visual hierarchy optimization, form simplification, mobile optimization
4. **Implementation & Monitoring:** Change management, performance tracking, continuous optimization, user feedback integration

**ADHD ELEMENTS:** Visual testing reports, clear hypothesis structure, pattern recognition, implementation roadmaps.`,

  "follow-up-sequence": `You are a Customer Relationship Strategist designing follow-up sequences that nurture prospects into customers.

**OBJECTIVE:** Create follow-up sequence for [BUSINESS TYPE] maintaining engagement while building trust and moving prospects toward purchase.

**PARAMETERS:**
- Lead source: [SOURCE]
- Purchase timeline: [TIMELINE]
- Value proposition: [PROPOSITION]
- Competition intensity: [COMPETITION]

**FRAMEWORK:**
1. **Sequence Strategy:** Timing optimization, value distribution, relationship building, purchase preparation
2. **Content Development:** Educational content, social proof integration, objection addressing, value demonstration
3. **Engagement Optimization:** Open rate optimization, click-through enhancement, response generation, relationship deepening
4. **Conversion Integration:** Soft offer introduction, hard offer timing, scarcity utilization, decision facilitation

**ADHD ELEMENTS:** Visual sequence mapping, engagement tracking, clear value progression, implementation automation.`,

  "sales-page": `You are a Sales Page Conversion Specialist creating high-converting sales pages through psychological persuasion.

**OBJECTIVE:** Create sales page framework for [PRODUCT/SERVICE] maximizing conversions while building trust and addressing objections.

**PARAMETERS:**
- Product type: [TYPE]
- Price point: [PRICE]
- Target audience: [AUDIENCE]
- Main benefits: [BENEFITS]

**FRAMEWORK:**
1. **Attention & Interest:** Headline optimization, subheadline support, opening hook, value proposition clarity
2. **Desire Building:** Benefit articulation, social proof integration, objection handling, risk reversal
3. **Action Triggering:** Call-to-action optimization, urgency creation, scarcity implementation, purchase simplification
4. **Trust Enhancement:** Testimonial placement, guarantee integration, author credibility, security signals

**ADHD ELEMENTS:** Visual hierarchy, scannable content, clear action steps, cognitive load management.`,

  // Customer Experience & Retention
  "journey-enhancement": `You are a Customer Experience Transformation Specialist converting satisfaction into profound loyalty through strategic experience engineering.

**OBJECTIVE:** Create journey enhancement framework for [BUSINESS TYPE] transforming standard satisfaction into enthusiastic advocacy.

**PARAMETERS:**
- Current journey map: [JOURNEY]
- Key satisfaction drivers: [DRIVERS]
- Primary pain points: [PAIN_POINTS]
- Loyalty objective: [OBJECTIVE]

**FRAMEWORK:**
1. **Experience Diagnostic:** Emotional impact mapping, memory formation analysis, expectation management evaluation, loyalty driver identification
2. **Strategic Intervention:** Peak-end rule optimization, critical moment transformation, signature experience creation, consistency architecture
3. **Emotional Connection:** Brand personality integration, value alignment demonstration, belonging creation, recognition architecture
4. **Loyalty Activation:** Advocacy trigger implementation, referral psychology framework, long-term engagement architecture, feedback integration

**ADHD ELEMENTS:** Sensory consideration, predictability enhancement, processing-friendly delivery, transition support.`,

  "client-onboarding": `You are a Customer Experience Transformation Specialist establishing extraordinary first impressions and preventing buyer's remorse.

**OBJECTIVE:** Create onboarding framework for [BUSINESS TYPE] transforming post-purchase uncertainty into confident enthusiasm.

**PARAMETERS:**
- Service/product type: [OFFERING]
- Typical concerns: [CONCERNS]
- Delivery timeline: [TIMELINE]
- Relationship objective: [OBJECTIVE]

**FRAMEWORK:**
1. **Purchase Validation:** Decision affirmation protocol, buyer's remorse prevention, status update architecture, expectation management
2. **Relationship Foundation:** Personal connection establishment, communication preference calibration, service style alignment, boundary establishment
3. **Operational Excellence:** Process clarity creation, resource navigation system, team introduction protocol, timeline visualization
4. **Long-Term Success Foundation:** Success definition collaboration, measurement framework establishment, feedback loop creation, value realization protocol

**ADHD ELEMENTS:** Visual process mapping, predictable communication, information delivery optimization, sensory consideration.`,

  "community-building": `You are a Community Psychology Specialist transforming customer groups into passionate belonging communities.

**OBJECTIVE:** Create community framework for [BUSINESS TYPE] developing engaged communities enhancing retention and amplifying word-of-mouth.

**PARAMETERS:**
- Business category: [CATEGORY]
- Customer commonalities: [COMMONALITIES]
- Engagement environment: [ENVIRONMENT]
- Community purpose: [PURPOSE]

**FRAMEWORK:**
1. **Foundation & Identity:** Shared identity formation, purpose articulation, value exchange clarification, belonging signals
2. **Engagement & Interaction:** Conversation architecture, connection mechanisms, content strategy, ritual development
3. **Growth & Evolution:** Onboarding protocol, role development, leadership cultivation, subgroup architecture
4. **Business Integration:** Value alignment protocol, feedback integration, product co-creation, advocacy activation

**ADHD ELEMENTS:** Sensory-considerate engagement, explicit social protocols, participation pathways, belonging signals.`,

  "loyalty-program": `You are a Customer Loyalty Specialist transforming transactions into emotional connections through advanced psychological frameworks.

**OBJECTIVE:** Create loyalty program framework for [BUSINESS TYPE] increasing customer lifetime value through enhanced retention and referral behavior.

**PARAMETERS:**
- Business model: [MODEL]
- Customer value tiers: [TIERS]
- Purchase frequency: [PATTERN]
- Competition landscape: [COMPETITION]

**FRAMEWORK:**
1. **Strategic Foundation:** Loyalty driver identification, value exchange clarification, business impact mapping, competitive differentiation
2. **Program Structure:** Tier architecture design, reward selection framework, earning mechanism design, recognition integration
3. **Implementation & Experience:** Onboarding protocol, visibility framework, friction minimization, communication architecture
4. **Evolution & Optimization:** Performance measurement, member feedback integration, competitive response, refresh strategy

**ADHD ELEMENTS:** Clear program structure, visual progress tracking, predictable rewards, processing-friendly architecture.`,

  "referral-system": `You are a Referral Psychology Specialist transforming satisfied customers into active advocates through behavioral design.

**OBJECTIVE:** Create referral system for [BUSINESS TYPE] motivating customers to consistently recommend your business naturally.

**PARAMETERS:**
- Business category: [CATEGORY]
- Customer relationship: [RELATIONSHIP]
- Current loyalty indicators: [INDICATORS]
- Referral value: [VALUE]

**FRAMEWORK:**
1. **Psychological Foundation:** Referral readiness identification, identity alignment technique, social capital preservation, value transfer framing
2. **Request Optimization:** Contextual integration protocol, language pattern selection, specificity engineering, social proof integration
3. **Facilitation & Support:** Process simplification protocol, resource provision, language framework, follow-up architecture
4. **Sustainability & Growth:** Motivation variation, reward structure design, program evolution, advocate cultivation

**ADHD ELEMENTS:** Process clarity, visual explanation, simplified social scripts, implementation supports.`,

  // Content Creation & Communication
  "blog-article": `You are a Strategic Content Development Specialist creating content that establishes authority, delivers value, and optimizes for visibility.

**OBJECTIVE:** Create blog article framework on [TOPIC] positioning author as leading expert while delivering actionable insights.

**PARAMETERS:**
- Topic focus: [TOPIC]
- Target audience: [AUDIENCE]
- Authority positioning: [POSITIONING]
- Content objectives: [OBJECTIVES]

**FRAMEWORK:**
1. **Pattern-Disrupting Introduction (10%):** Expectation violation, strategic vulnerability, contrarian positioning, unique perspective
2. **Expertise Demonstration Core (70%):** E-A-T escalation structure, strategic depth variation, revelation sequencing, proprietary knowledge
3. **Implementation Catalyst (20%):** Action framework, motivation enhancement, strategic simplification, progress validation

**ADHD ELEMENTS:** Skimmability enhancement, visual learning integration, neurodivergent-friendly structure, processing supports.`,

  "video-script": `You are a Narrative Psychology Specialist creating story-driven content for deep emotional resonance and behavioral responses.

**OBJECTIVE:** Create video script framework for [CONTENT PURPOSE] utilizing narrative structures for emotional impact and persuasive effectiveness.

**PARAMETERS:**
- Primary audience: [AUDIENCE]
- Desired emotion: [EMOTION]
- Key message: [MESSAGE]
- Desired action: [ACTION]
- Content length: [LENGTH]

**FRAMEWORK:**
1. **Pattern-Interrupting Opening (15 sec):** Cognitive pattern disruption, identity-relevant framing, curiosity gap creation, emotional state priming
2. **Transformational Story Structure:** Character identification triggers, progressive tension architecture, strategic revelation sequencing, emotional oscillation
3. **Persuasive Integration:** Seamless message weaving, value association mechanism, implied conclusion formation, action preparation
4. **Activation Conclusion:** Movement motivation framework, commitment scaling options, next step clarity, identity reinforcement

**ADHD ELEMENTS:** Visual processing supports, engagement maintenance, information structuring, pacing variation.`,

  "podcast-episode": `You are a Podcast Format Specialist maximizing listener engagement, information retention, and behavior change.

**OBJECTIVE:** Create podcast episode framework for [CONTENT TYPE] delivering exceptional value while creating engaged listeners.

**PARAMETERS:**
- Content focus: [FOCUS]
- Target audience: [AUDIENCE]
- Episode duration: [DURATION]
- Show positioning: [POSITIONING]

**FRAMEWORK:**
1. **Opening Engagement:** Pattern interruption introduction, relevance signaling, episode promise articulation, curiosity loop installation
2. **Content Delivery Structure:** Value sequence optimization, cognitive processing rhythm, narrative integration, practical application framework
3. **Listener Experience Enhancement:** Energy modulation protocol, auditory landscape design, cognitive load management, transition architecture
4. **Activation & Continuation:** Implementation prompt design, community integration, next episode anticipation, ongoing relationship development

**ADHD ELEMENTS:** Episode structure consistency, content chunking, clear transitions, multiple explanation approaches.`,

  "newsletter-template": `You are a Newsletter Psychology Specialist creating email content achieving exceptional open rates and long-term reader relationships.

**OBJECTIVE:** Create newsletter template system for [BUSINESS TYPE] transforming standard emails (15-25% open rates) into anticipated relationship builders (45-65% open rates).

**PARAMETERS:**
- Primary audience: [AUDIENCE]
- Content category: [CATEGORY]
- Desired response: [RESPONSE]
- Sending frequency: [FREQUENCY]

**FRAMEWORK:**
1. **Open-Rate Optimization:** Pattern interruption subject lines, personal connection signaling, value preview integration, timing relevance
2. **Engagement Structure:** First impression optimization, content hierarchy construction, visual processing enhancement, reading momentum architecture
3. **Value Delivery:** Content type variation, insight density optimization, actionable takeaway architecture, unexpected value integration
4. **Response Activation:** Psychological trigger placement, call-to-action engineering, reciprocity activation framework, friction minimization

**ADHD ELEMENTS:** Visual processing optimization, attention management, content chunking, pattern creation.`,

  "case-study": `You are a Strategic Narrative Specialist crafting case studies that transform client success into powerful persuasion assets.

**OBJECTIVE:** Create case study framework for [BUSINESS TYPE] converting client results into compelling evidence accelerating purchase decisions.

**PARAMETERS:**
- Primary offering: [OFFERING]
- Typical challenges: [CHALLENGES]
- Purchase hesitations: [HESITATIONS]
- Transformation category: [TRANSFORMATION]

**FRAMEWORK:**
1. **Attention Capture & Identification:** Headline engineering, client similarity signaling, problem amplification, status quo cost articulation
2. **Transformation Narrative:** Before-state illustration, solution introduction, implementation insight inclusion, obstacle navigation storytelling
3. **Evidence Presentation:** Result specificity protocol, multi-dimensional impact documentation, verification element integration, unexpected benefit highlighting
4. **Conversion Optimization:** Prospect self-identification triggers, process visualization, risk reduction evidence, next step simplification

**ADHD ELEMENTS:** Visual before/after representation, pattern highlighting, information architecture, concrete example specificity.`,

  "visual-content": `You are a Visual Strategy Specialist transforming complex information into instantly engaging, memorable, shareable assets.

**OBJECTIVE:** Create visual content strategy for [BUSINESS TYPE] communicating key messages, enhancing engagement, and driving business outcomes.

**PARAMETERS:**
- Business objectives: [OBJECTIVES]
- Target audience: [SEGMENTS]
- Brand visual identity: [IDENTITY]
- Distribution channels: [CHANNELS]

**FRAMEWORK:**
1. **Strategic Foundation:** Message prioritization protocol, audience visual preference mapping, channel optimization, visual identity integration
2. **Content Type Development:** Visual format selection, information architecture design, complex concept visualization, emotional trigger integration
3. **Production Excellence:** Design element standardization, quality standard definition, production workflow optimization, template architecture
4. **Distribution & Measurement:** Channel-specific optimization, publication cadence design, engagement tracking protocol, repurposing strategy

**ADHD ELEMENTS:** Information hierarchy, pattern utilization, color psychology, cognitive load management.`,

  "presentation-design": `You are a Presentation Design Strategist transforming information delivery into compelling, memorable experiences.

**OBJECTIVE:** Create presentation design system for [PRESENTATION TYPE] conveying key messages, driving engagement, and achieving specific outcomes.

**PARAMETERS:**
- Presentation purpose: [PURPOSE]
- Target audience: [AUDIENCE]
- Desired outcomes: [OUTCOMES]
- Presentation environment: [ENVIRONMENT]

**FRAMEWORK:**
1. **Strategic Foundation:** Outcome clarification protocol, audience analysis, key message distillation, story architecture design
2. **Content Structure:** Opening impact engineering, information sequencing, supporting evidence integration, visual element selection
3. **Slide Design Optimization:** Visual hierarchy protocol, cognitive load management, design consistency system, data visualization framework
4. **Delivery Excellence:** Presenter notation framework, engagement technique integration, timing optimization, interaction design

**ADHD ELEMENTS:** Information chunking, visual consistency, pattern utilization, clear transition signals.`,

  // Personal Productivity & Wellbeing
  "task-management": `You are a Specialized Cognitive Performance Engineer with expertise in neurodivergent productivity systems and executive function support.

**OBJECTIVE:** Create task management system specifically designed for ADHD brain wiring that leverages neurological strengths while supporting executive function challenges.

**PARAMETERS:**
- Executive function profile: [PROFILE_TYPE]
- Dopamine activation threshold: [THRESHOLD_LEVEL]
- Task switching penalty: [PENALTY_LEVEL]
- Working memory capacity: [CAPACITY_LEVEL]

**FRAMEWORK:**
1. **Input Capture Mechanism:** Friction minimization protocol, incomplete thought preservation, context preservation tagging, threshold calibration
2. **Processing & Organization:** Contextual batching protocol, visual urgency signaling, progressive revelation control, state-based accessibility
3. **Execution Support:** Task initiation trigger design, momentum maintenance architecture, completion threshold clarification, progress visualization
4. **Maintenance & Sustainability:** System reset simplification, forgiveness architecture, adaptive difficulty scaling, reward integration

**ADHD ELEMENTS:** Visual process mapping, dopamine-trigger integration, sensory management, executive function supports.`,

  "decision-protocol": `You are a Decision Psychology Specialist transforming overthinking into clear, confident choices through advanced cognitive frameworks.

**OBJECTIVE:** Create decision framework optimizing both quality and psychological comfort while minimizing cognitive overhead and decision fatigue.

**PARAMETERS:**
- Primary decision categories: [CATEGORIES]
- Decision frequency: [FREQUENCY]
- Analysis tendency: [ANALYSIS_LEVEL]
- Risk tolerance: [RISK_PROFILE]

**FRAMEWORK:**
1. **Decision Classification:** Category sorting, stakes assessment, reversibility evaluation, time sensitivity analysis
2. **Processing Optimization:** Information sufficiency protocol, analysis structure, cognitive bias mitigation, intuition integration
3. **Resolution Mechanism:** Decision trigger identification, confidence threshold definition, commitment protocol, second-guessing prevention
4. **Implementation & Learning:** Action initiation framework, result tracking, reflection structure, pattern recognition system

**ADHD ELEMENTS:** Visual decision mapping, overwhelm prevention, emotional regulation, executive function assistance.`,

  "focus-enhancement": `You are a Cognitive Performance Specialist designing focus enhancement systems that dramatically improve productive output for varying attention patterns.

**OBJECTIVE:** Create focus enhancement framework transforming scattered attention into sustained productive performance through strategic environment design and neurologically-aligned protocols.

**PARAMETERS:**
- Attention pattern: [PATTERN]
- Primary work type: [WORK_TYPE]
- Environment constraints: [ENVIRONMENT]
- Performance objectives: [OBJECTIVES]

**FRAMEWORK:**
1. **Neurological Foundation:** State priming protocol, interference minimization, attention anchoring techniques, sensory management
2. **Focus Sustainability:** Attention span optimization, interest generation protocol, focus recovery techniques, momentum maintenance
3. **Cognitive Enhancement:** Working memory support, decision fatigue prevention, information processing optimization, cognitive load distribution
4. **Implementation & Habituation:** Environmental restructuring, routine integration architecture, accountability framework, progress visualization

**ADHD ELEMENTS:** Sensory profile accommodation, hyperfocus strategies, interest-driven frameworks, task initiation supports.`,

  "overwhelm-prevention": `You are a Cognitive Load Management Specialist designing systems that prevent overwhelm and mental shutdown through advanced psychological frameworks.

**OBJECTIVE:** Create overwhelm prevention framework transforming cognitive overload into sustainable mental clarity through strategic information management and psychological techniques.

**PARAMETERS:**
- Overwhelm pattern: [PROFILE]
- Primary triggers: [TRIGGERS]
- Environment constraints: [ENVIRONMENT]
- Recovery pattern: [RECOVERY]

**FRAMEWORK:**
1. **Early Detection System:** Warning signal identification, trigger mapping protocol, capacity monitoring, environmental assessment
2. **Immediate Stabilization:** Cognitive load reduction, attentional focus narrowing, environmental modification, physiological regulation
3. **Sustainable Prevention:** Information diet management, decision architecture, environment design protocol, capacity expansion
4. **Recovery & Resilience:** Overwhelm recovery sequence, pattern recognition framework, adaptive capacity building, support system integration

**ADHD ELEMENTS:** Sensory management, task fragmentation, visual externalization, pattern recognition.`,

  "motivation-strategy": `You are a Motivation Psychology Specialist designing systems that create sustained drive and implementation energy through advanced psychological frameworks.

**OBJECTIVE:** Create motivation maintenance system transforming inconsistent action into sustained implementation through strategic psychological triggers and neurologically-aligned behavioral frameworks.

**PARAMETERS:**
- Primary motivation pattern: [PATTERN]
- Key resistance triggers: [TRIGGERS]
- Implementation history: [HISTORY]
- Environmental constraints: [CONSTRAINTS]

**FRAMEWORK:**
1. **Psychological Foundation:** Identity shifting protocol, motivation style identification, resistance pattern recognition, emotional association restructuring
2. **Implementation Trigger System:** Decision elimination protocol, environmental cue integration, friction reduction architecture, commitment device construction
3. **Sustainability Framework:** Progress visibility system, variable reward architecture, meaning connection protocol, social integration framework
4. **Recovery & Adaptation:** Motivation restoration methods, failure recovery framework, energy management system, adaptation mechanism

**ADHD ELEMENTS:** Interest-driven restructuring, dopamine-optimized scheduling, environmental design, visual progress systems.`,

  "anxiety-management": `You are a Cognitive Anxiety Specialist designing management systems that transform overwhelming worry into productive awareness through advanced psychological frameworks.

**OBJECTIVE:** Create anxiety management framework efficiently addressing both acute episodes and chronic patterns while building lasting emotional regulation skills.

**PARAMETERS:**
- Primary anxiety pattern: [PATTERN]
- Trigger categories: [TRIGGERS]
- Physical manifestation: [PHYSICAL]
- Environmental factors: [ENVIRONMENT]

**FRAMEWORK:**
1. **Acute Intervention Protocol:** Early detection system, grounding technique integration, cognitive pattern interruption, physiological regulation
2. **Understanding & Awareness:** Personal pattern recognition, thought-emotion-behavior mapping, cognitive distortion detection, underlying need identification
3. **Strategic Prevention:** Environment optimization, cognitive reframing protocol, uncertainty tolerance building, proactive tool preparation
4. **Long-Term Resilience:** Skill-building progression, success experience creation, identity-level integration, progressive exposure protocol

**ADHD ELEMENTS:** Sensory regulation techniques, concrete intervention tools, pattern recognition, visual externalization.`,

  "work-life-integration": `You are a Life Design Specialist creating integration frameworks that transform work-life conflict into harmonious alignment through advanced balance strategies.

**OBJECTIVE:** Create work-life integration framework efficiently creating sustainable harmony between professional achievement and personal fulfillment without sacrificing either.

**PARAMETERS:**
- Professional demands: [DEMANDS]
- Personal priorities: [PRIORITIES]
- Energy patterns: [PATTERNS]
- Environmental constraints: [CONSTRAINTS]

**FRAMEWORK:**
1. **Foundation & Alignment:** Value clarification protocol, success definition recalibration, current reality assessment, ideal state visualization
2. **Strategic Design System:** Energy management architecture, boundary design protocol, integration point identification, transition ritual design
3. **Daily Implementation:** Priority translation protocol, decision filter design, environment optimization, routine architecture
4. **Sustainability & Evolution:** Regular assessment integration, course correction framework, support structure design, recovery protocol

**ADHD ELEMENTS:** Visual priority mapping, energy management, concrete implementation tools, transition supports.`,

  "energy-management": `You are an Energy Optimization Specialist designing systems that maximize personal energy for peak performance while preventing burnout.

**OBJECTIVE:** Create energy management framework optimizing physical, mental, and emotional energy for sustained high performance and wellbeing.

**PARAMETERS:**
- Energy pattern profile: [PROFILE]
- Primary energy drains: [DRAINS]
- Peak performance times: [PEAK_TIMES]
- Recovery preferences: [RECOVERY]

**FRAMEWORK:**
1. **Energy Assessment & Mapping:** Personal energy pattern identification, drain source analysis, peak performance mapping, recovery requirement assessment
2. **Energy Optimization Strategies:** Energy investment prioritization, drain minimization techniques, energy enhancement protocols, strategic energy allocation
3. **Daily Energy Architecture:** Energy-aligned scheduling, task-energy matching, transition management, energy preservation techniques
4. **Sustainability & Recovery:** Recovery protocol design, energy restoration methods, burnout prevention strategies, long-term energy sustainability

**ADHD ELEMENTS:** Visual energy mapping, sensory consideration, pattern recognition, implementation supports.`,

  "time-blocking": `You are a Time Architecture Specialist designing time blocking systems that maximize focus and productivity while accommodating neurodivergent thinking patterns.

**OBJECTIVE:** Create time blocking framework that optimizes schedule design for maximum focus, productivity, and energy alignment.

**PARAMETERS:**
- Work schedule flexibility: [FLEXIBILITY]
- Attention span patterns: [ATTENTION_PATTERNS]
- Priority categories: [PRIORITIES]
- Energy rhythms: [ENERGY_RHYTHMS]

**FRAMEWORK:**
1. **Time Assessment & Analysis:** Schedule audit, energy pattern mapping, attention span analysis, priority identification
2. **Block Design Principles:** Energy-task alignment, transition buffer integration, focus duration optimization, distraction minimization
3. **Implementation Strategy:** Block creation methodology, schedule protection protocols, flexibility integration, adjustment mechanisms
4. **Optimization & Adaptation:** Performance tracking, block effectiveness analysis, schedule refinement, long-term optimization

**ADHD ELEMENTS:** Visual schedule mapping, attention accommodation, executive function supports, flexible adaptation.`,

  "habit-formation": `You are a Behavioral Change Specialist designing habit formation systems that create lasting behavioral changes through neuroscience-based approaches.

**OBJECTIVE:** Create habit formation framework that efficiently establishes positive habits while eliminating negative patterns through strategic behavioral design.

**PARAMETERS:**
- Target habit category: [CATEGORY]
- Current habit patterns: [CURRENT_PATTERNS]
- Motivation style: [MOTIVATION_STYLE]
- Environmental constraints: [CONSTRAINTS]

**FRAMEWORK:**
1. **Habit Architecture Design:** Habit stacking methodology, trigger identification, routine optimization, reward integration
2. **Implementation Strategy:** Start small principle, consistency prioritization, environment design, friction reduction
3. **Maintenance & Reinforcement:** Progress tracking systems, habit strength indicators, obstacle navigation, motivation renewal
4. **Advanced Habit Engineering:** Habit ecosystem development, keystone habit identification, habit modification techniques, long-term sustainability

**ADHD ELEMENTS:** Dopamine-friendly rewards, visual progress tracking, executive function supports, interest-based motivation.`,

  "stress-resilience": `You are a Resilience Development Specialist creating stress management systems that build long-term resilience while providing immediate stress relief techniques.

**OBJECTIVE:** Create stress resilience framework that transforms stress response patterns while building long-term capacity for stress management and recovery.

**PARAMETERS:**
- Primary stress sources: [STRESS_SOURCES]
- Current coping mechanisms: [COPING_MECHANISMS]
- Stress response patterns: [RESPONSE_PATTERNS]
- Recovery preferences: [RECOVERY_PREFERENCES]

**FRAMEWORK:**
1. **Stress Assessment & Understanding:** Stress trigger identification, response pattern analysis, impact assessment, resilience baseline establishment
2. **Immediate Stress Management:** Acute stress intervention techniques, rapid stress reduction methods, in-the-moment coping strategies, emergency protocols
3. **Resilience Building Strategies:** Stress inoculation training, cognitive reframing techniques, emotional regulation development, physical resilience building
4. **Long-term Resilience Architecture:** Stress prevention protocols, resilience maintenance systems, recovery optimization, adaptive capacity development

**ADHD ELEMENTS:** Sensory-based stress relief, concrete intervention techniques, visual stress tracking, executive function supports.`
});

// ENHANCED UTILITY FUNCTIONS - Production-grade validation
const validatePositiveNumber = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  const num = parseFloat(String(value).trim());
  return !isNaN(num) && num > 0 && isFinite(num) ? num : 0;
};

const validateInteger = (value, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = parseInt(String(value || 0), 10);
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
};

const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    console.error('JSON stringify failed:', error);
    return '{}';
  }
};

const safeParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('JSON parse failed:', error);
    return null;
  }
};

// MEMORY-ONLY PERSISTENCE - No localStorage usage
const memoryStore = {
  data: {},
  
  getItem: (key) => {
    return memoryStore.data[key] || null;
  },
  
  setItem: (key, value) => {
    try {
      memoryStore.data[key] = value;
      return true;
    } catch (error) {
      console.warn(`Memory storage failed for ${key}:`, error);
      return false;
    }
  },
  
  removeItem: (key) => {
    delete memoryStore.data[key];
    return true;
  },
  
  clear: () => {
    memoryStore.data = {};
    return true;
  }
};

// OPTIMIZED STATE MANAGEMENT - Enhanced for production
const initialState = Object.freeze({
  selectedCategory: "Marketing",
  selectedTemplate: "email-marketing",
  activeTab: "guide",
  searchTerm: "",
  favorites: [],
  templateUsage: {},
  metrics: {
    totalUsed: 0,
    templatesUsed: 0,
    timesSaved: 0,
    projectsCompleted: 0,
    revenueGenerated: 0,
    favoriteCount: 0
  },
  goals: {
    revenue: { target: 100000, current: 0 },
    monthlyIncome: { target: 8334, current: 0 },
    weeklyIncome: { target: 1923, current: 0 }
  },
  quickWins: [],
  copied: false,
  copyMessage: '',
  isLoading: false,
  error: null,
  lastSaved: null,
  editingWin: null,
  showMobileMenu: false
});

// BULLETPROOF REDUCER - Production-ready validation
function appReducer(state, action) {
  try {
    switch (action.type) {
      case 'SET_FIELD': {
        if (!action.field || typeof action.field !== 'string') {
          throw new Error('Invalid field name for SET_FIELD');
        }
        return { ...state, [action.field]: action.value, lastSaved: Date.now() };
      }
        
      case 'SET_LOADING': {
        return { ...state, isLoading: Boolean(action.value) };
      }
        
      case 'SET_ERROR': {
        return { ...state, error: action.value, isLoading: false };
      }
        
      case 'UPDATE_METRICS': {
        if (!action.updates || typeof action.updates !== 'object') {
          throw new Error('Invalid updates for UPDATE_METRICS');
        }
        
        const validatedMetrics = {};
        Object.entries(action.updates).forEach(([key, value]) => {
          const numValue = validatePositiveNumber(value);
          if (numValue >= 0) {
            validatedMetrics[key] = numValue;
          }
        });
        
        if (Object.keys(validatedMetrics).length === 0) {
          return state;
        }
        
        return { 
          ...state, 
          metrics: { ...state.metrics, ...validatedMetrics },
          lastSaved: Date.now()
        };
      }
        
      case 'UPDATE_GOALS': {
        if (!action.updates || typeof action.updates !== 'object') {
          throw new Error('Invalid updates for UPDATE_GOALS');
        }
        
        const validatedGoals = {};
        Object.entries(action.updates).forEach(([key, value]) => {
          if (value && typeof value === 'object' && 'target' in value && 'current' in value) {
            validatedGoals[key] = {
              target: Math.max(0, validatePositiveNumber(value.target)),
              current: Math.max(0, validatePositiveNumber(value.current))
            };
          }
        });
        
        if (Object.keys(validatedGoals).length === 0) {
          return state;
        }
        
        return { 
          ...state, 
          goals: { ...state.goals, ...validatedGoals },
          lastSaved: Date.now()
        };
      }
        
      case 'ADD_FAVORITE': {
        const { templateId } = action;
        if (!templateId || state.favorites.includes(templateId)) {
          return state;
        }
        
        const newFavorites = [...state.favorites, templateId];
        return { 
          ...state, 
          favorites: newFavorites,
          metrics: { ...state.metrics, favoriteCount: newFavorites.length },
          lastSaved: Date.now()
        };
      }
        
      case 'REMOVE_FAVORITE': {
        const { templateId } = action;
        const newFavorites = state.favorites.filter(id => id !== templateId);
        return { 
          ...state, 
          favorites: newFavorites,
          metrics: { ...state.metrics, favoriteCount: newFavorites.length },
          lastSaved: Date.now()
        };
      }
        
      case 'UPDATE_TEMPLATE_USAGE': {
        const { templateId } = action;
        const currentUsage = validateInteger(state.templateUsage[templateId], 0);
        const newUsage = { ...state.templateUsage, [templateId]: currentUsage + 1 };
        
        return {
          ...state,
          templateUsage: newUsage,
          metrics: { 
            ...state.metrics, 
            totalUsed: state.metrics.totalUsed + 1, 
            templatesUsed: state.metrics.templatesUsed + 1 
          },
          lastSaved: Date.now()
        };
      }
        
      case 'ADD_QUICK_WIN': {
        const { win } = action;
        if (!win || !win.text || typeof win.text !== 'string') {
          return state;
        }
        
        const validatedWin = {
          id: win.id || Date.now() + Math.random(),
          text: String(win.text).trim().slice(0, 200),
          date: win.date || new Date().toLocaleDateString(),
          celebration: win.celebration || '🎉'
        };
        
        if (!validatedWin.text) return state;
        
        // Check for recent duplicates
        const isDuplicate = state.quickWins.slice(0, 3).some(recentWin => 
          recentWin.text.toLowerCase() === validatedWin.text.toLowerCase()
        );
        
        if (isDuplicate) return state;
        
        return { 
          ...state, 
          quickWins: [validatedWin, ...state.quickWins.slice(0, 49)],
          lastSaved: Date.now()
        };
      }

      case 'EDIT_QUICK_WIN': {
        const { id, newText } = action;
        if (!newText || !newText.trim()) return state;
        
        const updatedWins = state.quickWins.map(win => 
          win.id === id ? { ...win, text: newText.trim().slice(0, 200) } : win
        );
        
        return {
          ...state,
          quickWins: updatedWins,
          editingWin: null,
          lastSaved: Date.now()
        };
      }

      case 'DELETE_QUICK_WIN': {
        const { id } = action;
        return {
          ...state,
          quickWins: state.quickWins.filter(win => win.id !== id),
          lastSaved: Date.now()
        };
      }
        
      case 'SET_COPIED': {
        return { 
          ...state, 
          copied: Boolean(action.value),
          copyMessage: action.message || (action.value ? 'Copied!' : '')
        };
      }
        
      case 'LOAD_DATA': {
        const { data } = action;
        if (!data || typeof data !== 'object') {
          return state;
        }
        
        return {
          ...initialState,
          ...data,
          isLoading: false,
          error: null,
          copied: false,
          lastSaved: Date.now()
        };
      }
        
      case 'RESET_STATE': {
        return { ...initialState, lastSaved: Date.now() };
      }
        
      default: {
        console.warn('Unknown action type:', action.type);
        return state;
      }
    }
  } catch (error) {
    console.error('Reducer error:', error);
    return { 
      ...state, 
      error: `System error: ${error.message}`, 
      isLoading: false 
    };
  }
}

// MAIN COMPONENT - Production-ready with comprehensive features
const EmpowerAICompleteSystem = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // REF MANAGEMENT - Enhanced cleanup tracking
  const timeoutRefs = useRef(new Set());
  const abortControllerRef = useRef(null);
  const mountedRef = useRef(true);
  const textAreaRef = useRef(null);

  // TEMPLATE CATEGORIES - Complete 51 templates organized by category
  const categories = useMemo(() => Object.freeze({
    "Marketing": [
      { id: "email-marketing", name: "Email Marketing: Customer Reactivation", energy: "medium", time: "30min", revenue: "7days", difficulty: 3, roi: "high" },
      { id: "webinar-structure", name: "Webinar Structure for Maximum Conversion", energy: "high", time: "2hrs", revenue: "30days", difficulty: 4, roi: "high" },
      { id: "social-media-growth", name: "Social Media Growth Strategy", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "medium" },
      { id: "content-marketing", name: "Content Marketing Framework", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "high" },
      { id: "seo-article", name: "SEO Article Framework", energy: "medium", time: "45min", revenue: "90days", difficulty: 3, roi: "medium" },
      { id: "viral-marketing", name: "Viral Marketing Campaign Design", energy: "high", time: "2hrs", revenue: "7days", difficulty: 4, roi: "high" },
      { id: "lead-magnet", name: "Lead Magnet Creation System", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "high" },
      { id: "paid-advertising", name: "Paid Advertising Framework", energy: "high", time: "1.5hrs", revenue: "7days", difficulty: 4, roi: "high" }
    ],
    "Business": [
      { id: "revenue-stream", name: "Revenue Stream Diversification", energy: "high", time: "2hrs", revenue: "30days", difficulty: 4, roi: "high" },
      { id: "cash-flow", name: "Cash Flow Optimization & Projection", energy: "high", time: "1.5hrs", revenue: "30days", difficulty: 4, roi: "medium" },
      { id: "business-system", name: "Business System Documentation", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "medium" },
      { id: "sop-creation", name: "Standard Operating Procedure Creation", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "medium" },
      { id: "decision-making", name: "Decision Making Protocol", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "strategic-planning", name: "Strategic Planning Process", energy: "high", time: "2hrs", revenue: "90days", difficulty: 4, roi: "high" },
      { id: "meeting-optimization", name: "Meeting Optimization Protocol", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "team-management", name: "Team Management System", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "medium" }
    ],
    "Product": [
      { id: "feature-prioritization", name: "Customer-Centric Feature Prioritization", energy: "high", time: "1.5hrs", revenue: "90days", difficulty: 4, roi: "high" },
      { id: "online-course", name: "Online Course Design Framework", energy: "high", time: "3hrs", revenue: "30days", difficulty: 5, roi: "high" },
      { id: "product-launch", name: "Digital Product Launch System", energy: "high", time: "2hrs", revenue: "7days", difficulty: 4, roi: "high" },
      { id: "user-testing", name: "User Testing Framework", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "medium" },
      { id: "product-ecosystem", name: "Product Ecosystem Architecture", energy: "high", time: "2hrs", revenue: "90days", difficulty: 4, roi: "high" },
      { id: "beta-testing", name: "Beta Testing Process", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "medium" }
    ],
    "Sales": [
      { id: "high-ticket-offer", name: "High-Ticket Offer Framework", energy: "high", time: "2hrs", revenue: "7days", difficulty: 4, roi: "high" },
      { id: "sales-conversation", name: "Sales Conversation Script", energy: "medium", time: "1hr", revenue: "7days", difficulty: 3, roi: "high" },
      { id: "objection-handling", name: "Objection Handling System", energy: "medium", time: "1hr", revenue: "7days", difficulty: 3, roi: "high" },
      { id: "strategic-pricing", name: "Strategic Pricing Framework", energy: "high", time: "1.5hrs", revenue: "30days", difficulty: 4, roi: "high" },
      { id: "upsell-cross-sell", name: "Upsell/Cross-sell System", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "high" },
      { id: "conversion-rate", name: "Conversion Rate Optimization", energy: "high", time: "2hrs", revenue: "30days", difficulty: 4, roi: "high" },
      { id: "follow-up-sequence", name: "Follow-up Sequence Architecture", energy: "medium", time: "1.5hrs", revenue: "30days", difficulty: 3, roi: "high" },
      { id: "sales-page", name: "Sales Page Structure", energy: "high", time: "2hrs", revenue: "7days", difficulty: 4, roi: "high" }
    ],
    "Customer": [
      { id: "journey-enhancement", name: "Customer Journey Enhancement", energy: "high", time: "1.5hrs", revenue: "90days", difficulty: 4, roi: "high" },
      { id: "client-onboarding", name: "Client Onboarding Process", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "medium" },
      { id: "community-building", name: "Community Building Framework", energy: "high", time: "2hrs", revenue: "90days", difficulty: 4, roi: "high" },
      { id: "loyalty-program", name: "Loyalty Program Design", energy: "high", time: "1.5hrs", revenue: "90days", difficulty: 4, roi: "medium" },
      { id: "referral-system", name: "Referral System Architecture", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "high" }
    ],
    "Content": [
      { id: "blog-article", name: "Blog Article Framework", energy: "medium", time: "45min", revenue: "90days", difficulty: 3, roi: "medium" },
      { id: "video-script", name: "Video Script Structure", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "medium" },
      { id: "podcast-episode", name: "Podcast Episode Format", energy: "medium", time: "45min", revenue: "90days", difficulty: 3, roi: "medium" },
      { id: "newsletter-template", name: "Newsletter Template System", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "high" },
      { id: "case-study", name: "Case Study Framework", energy: "medium", time: "1hr", revenue: "30days", difficulty: 3, roi: "high" },
      { id: "visual-content", name: "Visual Content Strategy", energy: "high", time: "1.5hrs", revenue: "30days", difficulty: 4, roi: "medium" },
      { id: "presentation-design", name: "Presentation Design System", energy: "medium", time: "1hr", revenue: "90days", difficulty: 3, roi: "low" }
    ],
    "Productivity": [
      { id: "task-management", name: "ADHD-Optimized Task Management", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "decision-protocol", name: "Decision Making Protocol", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "focus-enhancement", name: "Focus Enhancement Framework", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "overwhelm-prevention", name: "Overwhelm Prevention Strategy", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "motivation-strategy", name: "Motivation Maintenance System", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "anxiety-management", name: "Anxiety Management Protocol", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "work-life-integration", name: "Work-Life Integration Framework", energy: "medium", time: "45min", revenue: "90days", difficulty: 3, roi: "low" },
      { id: "energy-management", name: "Energy Management System", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "time-blocking", name: "Time Blocking Framework", energy: "low", time: "30min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "habit-formation", name: "Habit Formation Protocol", energy: "low", time: "45min", revenue: "90days", difficulty: 2, roi: "low" },
      { id: "stress-resilience", name: "Stress Resilience Building", energy: "medium", time: "45min", revenue: "90days", difficulty: 3, roi: "low" }
    ]
  }), []);

  // UTILITY FUNCTIONS - Enhanced for production
  const updateField = useCallback((field, value) => {
    if (!field || typeof field !== 'string') {
      console.error('Invalid field name provided to updateField');
      return;
    }
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const updateMetrics = useCallback((updates) => {
    if (!updates || typeof updates !== 'object') {
      console.error('Invalid updates provided to updateMetrics');
      return;
    }
    dispatch({ type: 'UPDATE_METRICS', updates });
  }, []);

  const updateGoals = useCallback((updates) => {
    if (!updates || typeof updates !== 'object') {
      console.error('Invalid updates provided to updateGoals');
      return;
    }
    dispatch({ type: 'UPDATE_GOALS', updates });
  }, []);

  const getCategoryColors = useCallback((category) => {
    const colorMap = {
      "Marketing": { bg: "bg-red-500", text: "text-red-800", border: "border-red-500", lightBg: "bg-red-50", hover: "hover:bg-red-600" },
      "Business": { bg: "bg-blue-500", text: "text-blue-800", border: "border-blue-500", lightBg: "bg-blue-50", hover: "hover:bg-blue-600" },
      "Product": { bg: "bg-green-500", text: "text-green-800", border: "border-green-500", lightBg: "bg-green-50", hover: "hover:bg-green-600" },
      "Sales": { bg: "bg-yellow-500", text: "text-yellow-800", border: "border-yellow-500", lightBg: "bg-yellow-50", hover: "hover:bg-yellow-600" },
      "Customer": { bg: "bg-purple-500", text: "text-purple-800", border: "border-purple-500", lightBg: "bg-purple-50", hover: "hover:bg-purple-600" },
      "Content": { bg: "bg-pink-500", text: "text-pink-800", border: "border-pink-500", lightBg: "bg-pink-50", hover: "hover:bg-pink-600" },
      "Productivity": { bg: "bg-indigo-500", text: "text-indigo-800", border: "border-indigo-500", lightBg: "bg-indigo-50", hover: "hover:bg-indigo-600" }
    };
    return colorMap[category] || colorMap["Marketing"];
  }, []);

  const getTemplateContent = useCallback((templateId) => {
    if (!templateId || typeof templateId !== 'string') {
      return 'Invalid template ID provided.';
    }
    const content = TEMPLATE_CONTENT[templateId];
    if (!content) {
      console.warn(`Template content not found for ID: ${templateId}`);
      return `This template (${templateId}) is available in the full version. Framework includes specialized prompts for maximum AI effectiveness.`;
    }
    return content;
  }, []);

  const getCurrentTemplate = useCallback(() => {
    if (!state.selectedTemplate) return null;
    
    for (const [category, templates] of Object.entries(categories)) {
      const template = templates.find(t => t.id === state.selectedTemplate);
      if (template) {
        return { ...template, category };
      }
    }
    return null;
  }, [categories, state.selectedTemplate]);

  const getProgressPercentage = useCallback((current, target) => {
    const currentNum = validatePositiveNumber(current);
    const targetNum = validatePositiveNumber(target);
    if (targetNum <= 0) return 0;
    return Math.min(Math.max((currentNum / targetNum) * 100, 0), 100);
  }, []);

  const ProgressBar = useCallback(({ current, target, color = 'blue', label, className = '' }) => {
    const percentage = getProgressPercentage(current, target);
    const currentSafe = validatePositiveNumber(current);
    const targetSafe = validatePositiveNumber(target);
    
    const getColorClass = () => {
      const colorMap = {
        blue: 'bg-blue-500', green: 'bg-green-500', purple: 'bg-purple-500', 
        yellow: 'bg-yellow-500', red: 'bg-red-500', orange: 'bg-orange-500'
      };
      return colorMap[color] || 'bg-blue-500';
    };

    return (
      <div className={`mb-4 ${className}`} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" aria-label={label}>
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="truncate">{label}</span>
          <span className="ml-2">{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`${getColorClass()} h-3 rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">
          ${currentSafe.toLocaleString()} / ${targetSafe.toLocaleString()}
        </div>
      </div>
    );
  }, [getProgressPercentage]);

  // ENHANCED OPERATIONS
  const addQuickWin = useCallback((winText) => {
    if (!winText || typeof winText !== 'string') return;
    
    const text = winText.trim();
    if (!text) return;
    
    const newWin = {
      id: Date.now() + Math.random(),
      text: text,
      date: new Date().toLocaleDateString(),
      celebration: ['🎉', '🚀', '💪', '🌟', '🔥', '⭐', '💎', '🏆'][Math.floor(Math.random() * 8)]
    };
    
    dispatch({ type: 'ADD_QUICK_WIN', win: newWin });
  }, []);

  // ENHANCED CLIPBOARD OPERATIONS - With fallback
  const copyTemplate = useCallback(async () => {
    const template = getCurrentTemplate();
    if (!template) {
      dispatch({ type: 'SET_ERROR', value: 'Template not found' });
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    
    dispatch({ type: 'SET_LOADING', value: true });

    try {
      const content = getTemplateContent(state.selectedTemplate);
      
      if (signal.aborted || !mountedRef.current) return;
      
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for older browsers or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          throw new Error('Copy not supported in this environment');
        } finally {
          document.body.removeChild(textArea);
        }
      }
      
      if (signal.aborted || !mountedRef.current) return;
      
      dispatch({ type: 'SET_COPIED', value: true, message: 'Template copied successfully!' });
      
      const timeoutId = setTimeout(() => {
        if (mountedRef.current) {
          timeoutRefs.current.delete(timeoutId);
          dispatch({ type: 'SET_COPIED', value: false });
        }
      }, 3000);
      timeoutRefs.current.add(timeoutId);
      
      dispatch({ type: 'UPDATE_TEMPLATE_USAGE', templateId: state.selectedTemplate });
      
      const timeValue = parseFloat(template.time.replace(/[^\d.]/g, '')) || 1;
      updateMetrics({ timesSaved: state.metrics.timesSaved + timeValue });
      
      addQuickWin(`Used ${template.name}! Time saved: ${timeValue}h`);
      
    } catch (err) {
      if (err.name === 'AbortError' || !mountedRef.current) return;
      console.error('Copy failed:', err);
      
      // Show manual copy instructions as fallback
      const content = getTemplateContent(state.selectedTemplate);
      const fallbackMessage = `Copy failed. Please manually select and copy this template:\n\n${content.substring(0, 200)}...`;
      
      dispatch({ type: 'SET_ERROR', value: 'Auto-copy failed. Please select and copy the template text manually.' });
      
      // Try to select the content for manual copying
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.select();
      }
      
    } finally {
      if (mountedRef.current) {
        dispatch({ type: 'SET_LOADING', value: false });
      }
      abortControllerRef.current = null;
    }
  }, [getCurrentTemplate, state.selectedTemplate, state.metrics.timesSaved, updateMetrics, getTemplateContent, addQuickWin]);

  const toggleFavorite = useCallback((templateId) => {
    if (!templateId || typeof templateId !== 'string') {
      console.error('Invalid template ID for favorite toggle');
      return;
    }
    
    if (state.favorites.includes(templateId)) {
      dispatch({ type: 'REMOVE_FAVORITE', templateId });
      addQuickWin('Removed from favorites');
    } else {
      dispatch({ type: 'ADD_FAVORITE', templateId });
      addQuickWin('Added to favorites! ⭐');
    }
  }, [state.favorites, addQuickWin]);

  const handleRevenueInput = useCallback((value) => {
    const numValue = validatePositiveNumber(value);
    
    if (numValue === 0) {
      dispatch({ type: 'SET_ERROR', value: 'Please enter a positive amount' });
      return;
    }

    if (numValue > 1000000) {
      dispatch({ type: 'SET_ERROR', value: 'Please enter a realistic amount (under $1M)' });
      return;
    }

    updateMetrics({ revenueGenerated: state.metrics.revenueGenerated + numValue });
    
    const newTotal = Math.min(
      state.goals.revenue.current + numValue, 
      state.goals.revenue.target * 2
    );
    
    updateGoals({
      revenue: { ...state.goals.revenue, current: newTotal }
    });
    
    let celebration = '💰';
    if (numValue >= 1000) celebration = '🚀';
    if (numValue >= 5000) celebration = '🎉';
    if (numValue >= 10000) celebration = '👑';
    
    addQuickWin(`Added $${numValue.toLocaleString()} revenue! ${celebration}`);
    
    // Check milestones
    const milestones = [1000, 5000, 10000, 25000, 50000, 100000];
    const currentMilestone = milestones.find(m => 
      state.goals.revenue.current < m && newTotal >= m
    );
    
    if (currentMilestone) {
      const milestoneMessages = {
        1000: "🎉 First $1,000! You're officially in business!",
        5000: "💪 $5,000 milestone! Momentum is building!",
        10000: "🚀 $10,000 achieved! This is getting serious!",
        25000: "💎 $25,000 reached! You're a real entrepreneur!",
        50000: "🔥 $50,000 milestone! The finish line is in sight!",
        100000: "👑 $100,000 GOAL ACHIEVED! YOU DID IT!"
      };
      
      addQuickWin(milestoneMessages[currentMilestone]);
    }
  }, [state.metrics.revenueGenerated, state.goals, updateMetrics, updateGoals, addQuickWin]);

  // MEMORY-ONLY DATA MANAGEMENT
  const exportData = useCallback(() => {
    try {
      dispatch({ type: 'SET_LOADING', value: true });
      
      const allData = {
        favorites: state.favorites || [],
        templateUsage: state.templateUsage || {},
        metrics: state.metrics || initialState.metrics,
        goals: state.goals || initialState.goals,
        quickWins: state.quickWins || [],
        exportDate: new Date().toISOString(),
        version: '2.1',
        note: 'Exported from EmpowerAI Complete System'
      };
      
      const dataStr = safeStringify(allData);
      
      // Create download using data URL
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `empowerai-data-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.style.display = 'none';
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
      
      addQuickWin('Data exported successfully! 📊');
    } catch (error) {
      console.error('Export failed:', error);
      dispatch({ type: 'SET_ERROR', value: 'Export failed. Your data is preserved in memory for this session.' });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  }, [state, addQuickWin]);

  const clearData = useCallback(() => {
    const hasData = state.quickWins.length > 0 || state.metrics.totalUsed > 0 || state.goals.revenue.current > 0;
    
    const confirmMessage = hasData 
      ? `Are you sure you want to clear ALL data?\n\nYou have:\n• ${state.quickWins.length} quick wins\n• $${state.goals.revenue.current.toLocaleString()} in tracked revenue\n• ${state.metrics.totalUsed} template uses\n\nThis will reset everything to starting state.`
      : 'Are you sure you want to reset all settings?';
    
    if (window.confirm(confirmMessage)) {
      dispatch({ type: 'RESET_STATE' });
      memoryStore.clear();
      addQuickWin('Data cleared successfully! 🗑️');
    }
  }, [state.quickWins.length, state.metrics.totalUsed, state.goals.revenue.current, addQuickWin]);

  // TAB DEFINITIONS
  const tabs = useMemo(() => [
    { id: 'guide', name: 'Quick Start', icon: '🧭', shortcut: '1' },
    { id: 'templates', name: 'Templates', icon: '📝', shortcut: '2' },
    { id: 'dashboard', name: 'Dashboard', icon: '📊', shortcut: '3' },
    { id: 'tracker', name: 'Tracker', icon: '🎯', shortcut: '4' },
    { id: 'goals', name: 'Goals', icon: '💰', shortcut: '5' },
    { id: 'health', name: 'Health', icon: '📈', shortcut: '6' },
    { id: 'wins', name: 'Wins', icon: '🎉', shortcut: '7' },
    { id: 'monthly', name: 'Review', icon: '📅', shortcut: '8' }
  ], []);

  const currentTemplate = useMemo(() => getCurrentTemplate(), [getCurrentTemplate]);

  // MEMORY PERSISTENCE - Session-only, no localStorage
  useEffect(() => {
    try {
      const savedData = memoryStore.getItem('empowerai-session-data');
      if (savedData) {
        const parsed = safeParse(savedData);
        if (parsed && parsed.metrics && parsed.goals) {
          dispatch({ type: 'LOAD_DATA', data: parsed });
        }
      }
    } catch (error) {
      console.error('Failed to load session data:', error);
    }
  }, []);

  // AUTO-SAVE TO MEMORY
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (!mountedRef.current) return;
      
      try {
        const dataToSave = {
          favorites: state.favorites || [],
          templateUsage: state.templateUsage || {},
          metrics: state.metrics || initialState.metrics,
          goals: state.goals || initialState.goals,
          quickWins: state.quickWins || [],
          lastSaved: new Date().toISOString(),
          version: '2.1'
        };
        
        memoryStore.setItem('empowerai-session-data', safeStringify(dataToSave));
      } catch (error) {
        console.error('Failed to save session data:', error);
      }
    }, 500);

    return () => clearTimeout(saveTimer);
  }, [state.favorites, state.templateUsage, state.metrics, state.goals, state.quickWins]);

  // KEYBOARD SHORTCUTS - Enhanced for production
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') {
        return;
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '8') {
        e.preventDefault();
        const tabIndex = parseInt(e.key) - 1;
        if (tabs[tabIndex]) {
          updateField('activeTab', tabs[tabIndex].id);
        }
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && state.activeTab === 'templates' && currentTemplate) {
        e.preventDefault();
        copyTemplate();
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        if (state.error) {
          dispatch({ type: 'SET_ERROR', value: null });
        }
        if (state.editingWin) {
          updateField('editingWin', null);
        }
        if (state.showMobileMenu) {
          updateField('showMobileMenu', false);
        }
      }
      
      if (state.activeTab === 'templates' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        const currentCategoryTemplates = categories[state.selectedCategory] || [];
        const currentIndex = currentCategoryTemplates.findIndex(t => t.id === state.selectedTemplate);
        
        if (currentIndex !== -1) {
          let newIndex;
          if (e.key === 'ArrowUp') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : currentCategoryTemplates.length - 1;
          } else {
            newIndex = currentIndex < currentCategoryTemplates.length - 1 ? currentIndex + 1 : 0;
          }
          updateField('selectedTemplate', currentCategoryTemplates[newIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.activeTab, state.error, state.editingWin, state.showMobileMenu, state.selectedCategory, state.selectedTemplate, tabs, updateField, copyTemplate, currentTemplate, categories]);

  // AUTO-CLEAR ERRORS
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          dispatch({ type: 'SET_ERROR', value: null });
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.error]);

  // CLEANUP
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutRefs.current.clear();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <ProductionErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-3 sm:p-6">
          {/* ERROR DISPLAY */}
          {state.error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-pulse" role="alert" aria-live="polite">
              <div className="flex items-center text-red-800">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="flex-1">{state.error}</span>
                <button 
                  onClick={() => dispatch({ type: 'SET_ERROR', value: null })}
                  className="ml-2 text-red-600 hover:text-red-800 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  aria-label="Close error message"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* LOADING OVERLAY */}
          {state.isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-label="Loading">
              <div className="bg-white p-6 rounded-lg flex items-center shadow-xl">
                <Loader2 className="h-6 w-6 animate-spin mr-3 text-purple-600" aria-hidden="true" />
                <span className="text-lg">Processing...</span>
              </div>
            </div>
          )}

          {/* HEADER */}
          <header className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2">
              🚀 EmpowerAI Complete System
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-1">
              51 AI Templates + Success Metrics (ADHD Brain-Friendly!)
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <span>From <a href="https://empoweraitraining.com" className="text-purple-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">EmpowerAI Training</a></span>
              <span className="hidden sm:inline" aria-hidden="true">•</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                Tier 1: AI Business Toolkit
              </span>
            </div>
            
            {/* KEY METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto" role="region" aria-label="Key metrics summary">
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                <div className="text-xl md:text-2xl font-bold text-purple-600" aria-label={`${validateInteger(state.metrics.totalUsed)} templates used`}>
                  {validateInteger(state.metrics.totalUsed)}
                </div>
                <div className="text-xs text-gray-600">Templates Used</div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="text-xl md:text-2xl font-bold text-green-600" aria-label={`$${validatePositiveNumber(state.goals.revenue.current).toLocaleString()} revenue tracked`}>
                  ${validatePositiveNumber(state.goals.revenue.current).toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Revenue Tracked</div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="text-xl md:text-2xl font-bold text-blue-600" aria-label={`${Math.round(validatePositiveNumber(state.metrics.timesSaved))} hours saved`}>
                  {Math.round(validatePositiveNumber(state.metrics.timesSaved))}h
                </div>
                <div className="text-xs text-gray-600">Time Saved</div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-pink-500">
                <div className="text-xl md:text-2xl font-bold text-pink-600" aria-label={`${validateInteger(state.quickWins.length)} quick wins`}>
                  {validateInteger(state.quickWins.length)}
                </div>
                <div className="text-xs text-gray-600">Quick Wins</div>
              </div>
            </div>
          </header>

          {/* TAB NAVIGATION - Mobile-responsive */}
          <nav className="mb-6 bg-white rounded-lg shadow-sm" role="navigation" aria-label="Main navigation">
            <div className="p-3">
              {/* Mobile Menu Button */}
              <div className="lg:hidden mb-3">
                <button
                  onClick={() => updateField('showMobileMenu', !state.showMobileMenu)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-purple-100 rounded-lg text-purple-800 font-medium"
                  aria-expanded={state.showMobileMenu}
                >
                  <span>Navigation Menu</span>
                  {state.showMobileMenu ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Navigation Items */}
              <div className={`${state.showMobileMenu ? 'block' : 'hidden'} lg:block`}>
                <div className="flex flex-col lg:flex-row lg:justify-center gap-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        updateField('activeTab', tab.id);
                        updateField('showMobileMenu', false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        state.activeTab === tab.id 
                          ? 'bg-purple-500 text-white shadow-md' 
                          : 'text-gray-600 hover:bg-purple-100 active:bg-purple-200'
                      }`}
                      disabled={state.isLoading}
                      aria-pressed={state.activeTab === tab.id}
                      aria-label={`${tab.name} (Shortcut: ${tab.shortcut})`}
                      title={`Shortcut: Ctrl/Cmd + ${tab.shortcut}`}
                    >
                      <span className="mr-1" aria-hidden="true">{tab.icon}</span>
                      <span className="lg:inline">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* TAB CONTENT */}
          <main role="main">
            {/* QUICK START GUIDE TAB */}
            {state.activeTab === 'guide' && (
              <section aria-labelledby="guide-heading">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 id="guide-heading" className="text-xl md:text-2xl font-bold text-purple-800 mb-4 text-center">🧭 What's your most urgent business need?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    {[
                      { category: 'Sales', template: 'high-ticket-offer', title: 'Generate Income', desc: 'Need revenue ASAP? Start with high-ticket offers and sales scripts.', icon: '💰', color: 'from-green-500 to-green-600' },
                      { category: 'Marketing', template: 'content-marketing', title: 'Improve Marketing', desc: 'Attract more customers with content and lead magnets.', icon: '📈', color: 'from-orange-500 to-orange-600' },
                      { category: 'Product', template: 'product-launch', title: 'Create a Product', desc: 'Launch your digital product or course successfully.', icon: '🚀', color: 'from-blue-500 to-blue-600' },
                      { category: 'Business', template: 'business-system', title: 'Optimize Operations', desc: 'Streamline your business systems and processes.', icon: '⚙️', color: 'from-purple-500 to-purple-600' },
                      { category: 'Customer', template: 'journey-enhancement', title: 'Get Customers', desc: 'Improve customer experience and retention.', icon: '👥', color: 'from-red-500 to-red-600' },
                      { category: 'Productivity', template: 'task-management', title: 'Manage Myself', desc: 'ADHD-optimized productivity and focus systems.', icon: '🧠', color: 'from-teal-500 to-teal-600' }
                    ].map(item => (
                      <button
                        key={item.category}
                        onClick={() => {
                          updateField('selectedCategory', item.category);
                          updateField('selectedTemplate', item.template);
                          updateField('activeTab', 'templates');
                        }}
                        className={`bg-gradient-to-br ${item.color} text-white p-4 md:p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-4 focus:ring-opacity-50 text-left`}
                        disabled={state.isLoading}
                        aria-label={`${item.title} - ${item.desc}`}
                      >
                        <div className="text-2xl md:text-3xl mb-2 md:mb-3" aria-hidden="true">{item.icon}</div>
                        <div className="text-lg md:text-xl font-bold mb-1 md:mb-2">{item.title}</div>
                        <div className="text-sm opacity-90">{item.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* QUICK START SEQUENCE */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 md:p-6 border-l-4 border-yellow-400 mb-6">
                    <h3 className="font-bold text-gray-800 text-lg md:text-xl mb-3 flex items-center">
                      <Zap className="h-5 w-5 md:h-6 md:w-6 mr-2 text-yellow-600" aria-hidden="true" />
                      QUICK START: Need Income FAST?
                    </h3>
                    <p className="text-gray-700 mb-4">Follow this exact sequence for fastest results:</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                      {[
                        { step: 1, template: 'lead-magnet', category: 'Marketing', time: '48h', title: 'Lead Magnet Creation' },
                        { step: 2, template: 'email-marketing', category: 'Marketing', time: '72h', title: 'Email Marketing Templates' },
                        { step: 3, template: 'sales-page', category: 'Sales', time: '5d', title: 'Sales Page Structure' }
                      ].map(item => (
                        <button
                          key={item.step}
                          onClick={() => {
                            updateField('selectedCategory', item.category);
                            updateField('selectedTemplate', item.template);
                            updateField('activeTab', 'templates');
                          }}
                          className="bg-white p-3 rounded-lg border-l-4 border-purple-400 hover:bg-purple-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
                          disabled={state.isLoading}
                          aria-label={`Step ${item.step}: ${item.title} - ${item.time}`}
                        >
                          <div className="font-bold text-purple-800">Step {item.step}: {item.title}</div>
                          <div className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                            {item.time}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* HOW TO USE */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" aria-hidden="true" />
                      How to Use This System
                    </h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>1. Pick your urgent need</strong> above to get started immediately</p>
                      <p><strong>2. Copy the entire template</strong> - don't modify the framework</p>
                      <p><strong>3. Replace [BRACKETS]</strong> with your specific business information</p>
                      <p><strong>4. Use in ChatGPT-4 or Claude</strong> for best results</p>
                      <p><strong>5. Track your wins</strong> in the Dashboard tab</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* TEMPLATE LIBRARY TAB */}
            {state.activeTab === 'templates' && (
              <section aria-labelledby="templates-heading">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <h2 id="templates-heading" className="text-lg md:text-xl font-bold text-purple-800 mb-4 flex items-center">
                    <Copy className="h-5 w-5 mr-2" aria-hidden="true" />
                    Template Library (51 Templates)
                  </h2>
                  
                  {/* Category Selection - Mobile responsive */}
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 mb-4">
                    {Object.keys(categories).map(category => {
                      const colors = getCategoryColors(category);
                      const templateCount = categories[category].length;
                      return (
                        <button
                          key={category}
                          className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            state.selectedCategory === category 
                              ? colors.bg + ' text-white shadow-md' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => {
                            updateField('selectedCategory', category);
                            updateField('selectedTemplate', categories[category][0].id);
                          }}
                          disabled={state.isLoading}
                          aria-label={`${category} category, ${templateCount} templates`}
                        >
                          <span className="hidden md:inline">{category} ({templateCount})</span>
                          <span className="md:hidden">{category}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search */}
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={state.searchTerm}
                      onChange={(e) => updateField('searchTerm', e.target.value)}
                      disabled={state.isLoading}
                    />
                  </div>
                </div>

                {/* Template Display - Mobile responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Template List */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className={`font-bold ${getCategoryColors(state.selectedCategory).text} mb-3`}>
                      {state.selectedCategory} Templates
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {categories[state.selectedCategory]
                        .filter(template => 
                          !state.searchTerm || 
                          template.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                        )
                        .map(template => {
                          const colors = getCategoryColors(state.selectedCategory);
                          const usageCount = validateInteger(state.templateUsage[template.id]);
                          const isFavorite = state.favorites.includes(template.id);
                          return (
                            <button
                              key={template.id}
                              className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                state.selectedTemplate === template.id 
                                  ? colors.lightBg + ' ' + colors.text + ' font-medium border-l-4 ' + colors.border 
                                  : 'hover:bg-gray-50 text-gray-700 border border-gray-100'
                              }`}
                              onClick={() => updateField('selectedTemplate', template.id)}
                              disabled={state.isLoading}
                            >
                              <div className="flex items-start justify-between mb-1">
                                <div className="font-medium flex-1 pr-2">{template.name}</div>
                                <div className="flex items-center gap-1">
                                  {isFavorite && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                                  {usageCount > 0 && (
                                    <span className="bg-purple-100 text-purple-700 text-xs px-1 rounded">
                                      {usageCount}x
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-3">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {template.time}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {template.revenue}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                    
                    {/* Empty state */}
                    {categories[state.selectedCategory].filter(template => 
                      !state.searchTerm || 
                      template.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                    ).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No templates found matching "{state.searchTerm}"</p>
                        <button 
                          onClick={() => updateField('searchTerm', '')}
                          className="text-purple-600 text-sm mt-1 hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Template Content */}
                  <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                    {currentTemplate ? (
                      <>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                          <div className="flex-1">
                            <h2 className={`text-lg md:text-xl font-bold ${getCategoryColors(currentTemplate.category).text} mb-1`}>
                              {currentTemplate.name}
                            </h2>
                            <div className="text-sm text-gray-600 flex items-center gap-4">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {currentTemplate.time}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {currentTemplate.revenue}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleFavorite(state.selectedTemplate)}
                              className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                                state.favorites.includes(state.selectedTemplate)
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-gray-100 text-gray-400 hover:text-yellow-600'
                              }`}
                              disabled={state.isLoading}
                              aria-label={state.favorites.includes(state.selectedTemplate) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Star className="h-5 w-5" />
                            </button>
                            <button
                              onClick={copyTemplate}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                state.copied
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-purple-500 text-white hover:bg-purple-600'
                              }`}
                              disabled={state.isLoading}
                              aria-label={state.copied ? 'Template copied' : 'Copy template to clipboard'}
                            >
                              {state.copied ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="hidden sm:inline">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  <span className="hidden sm:inline">Copy Template</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Template Content Display */}
                        <div className="border border-gray-200 rounded-lg p-1 bg-gray-50 mb-4">
                          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-t border-b">
                            <span className="text-sm font-medium text-gray-700">Ready-to-Use Template</span>
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
                              Copy Entire Template
                            </span>
                          </div>
                          <textarea
                            ref={textAreaRef}
                            value={getTemplateContent(state.selectedTemplate)}
                            readOnly
                            className="w-full h-64 p-4 bg-white border border-gray-200 rounded-b font-mono text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onClick={(e) => e.target.select()}
                          />
                        </div>

                        {/* Template Stats - Mobile responsive */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className={`${getCategoryColors(currentTemplate.category).lightBg} p-4 rounded-lg`}>
                            <h3 className={`font-bold ${getCategoryColors(currentTemplate.category).text} mb-2`}>
                              Usage Stats
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Times Used:</span>
                                <span className="font-bold">{validateInteger(state.templateUsage[state.selectedTemplate])}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Time Saved:</span>
                                <span className="font-bold">
                                  {(validateInteger(state.templateUsage[state.selectedTemplate]) * parseFloat(currentTemplate.time.replace(/[^\d.]/g, '') || '1')).toFixed(1)}h
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className={`${getCategoryColors(currentTemplate.category).lightBg} p-4 rounded-lg`}>
                            <h3 className={`font-bold ${getCategoryColors(currentTemplate.category).text} mb-2`}>
                              Usage Tips
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Copy the entire template framework</li>
                              <li>• Replace [BRACKETS] with your specific info</li>
                              <li>• Use in ChatGPT-4 or Claude for best results</li>
                              <li>• Track results in Dashboard tab</li>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Copy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">Select a Template</p>
                        <p>Choose from the list to view and copy any of our 51 premium AI templates.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* SUCCESS TRACKER TAB */}
            {state.activeTab === 'dashboard' && (
              <section aria-labelledby="dashboard-heading">
                <div className="space-y-6">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <h2 id="dashboard-heading" className="text-xl md:text-2xl font-bold text-purple-800 mb-6 text-center">📊 Your Success Dashboard</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Revenue Progress */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6 rounded-lg border-l-4 border-green-500">
                        <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          Revenue Progress
                        </h3>
                        <ProgressBar 
                          current={validatePositiveNumber(state.goals.revenue.current)} 
                          target={validatePositiveNumber(state.goals.revenue.target)} 
                          color="green" 
                          label="Annual Revenue Goal: $100K"
                        />
                      </div>

                      {/* Quick Revenue Input */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-lg border-l-4 border-blue-500">
                        <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
                          <DollarSign className="h-5 w-5 mr-2" />
                          Add Revenue
                        </h3>
                        <input 
                          type="number" 
                          min="1"
                          max="100000"
                          placeholder="Enter amount (e.g., 500)"
                          className="w-full px-4 py-3 border rounded-lg text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const value = validatePositiveNumber(e.target.value);
                              if (value > 0) {
                                handleRevenueInput(value);
                                e.target.value = '';
                              }
                            }
                          }}
                          disabled={state.isLoading}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => handleRevenueInput(100)}
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 disabled:opacity-50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={state.isLoading}
                          >
                            Quick +$100
                          </button>
                          <button 
                            onClick={() => handleRevenueInput(500)}
                            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 disabled:opacity-50 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={state.isLoading}
                          >
                            Big Win +$500
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Additional Metrics Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs md:text-sm font-medium text-gray-600">Templates Used</span>
                          <Copy className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-purple-600">{validateInteger(state.metrics.templatesUsed)}</div>
                        <button 
                          onClick={() => updateMetrics({ templatesUsed: state.metrics.templatesUsed + 1 })}
                          className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                          disabled={state.isLoading}
                        >
                          +1 Template Used
                        </button>
                      </div>

                      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs md:text-sm font-medium text-gray-600">Time Saved</span>
                          <Clock className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-orange-600">{Math.round(validatePositiveNumber(state.metrics.timesSaved))}h</div>
                        <button 
                          onClick={() => updateMetrics({ timesSaved: state.metrics.timesSaved + 2 })}
                          className="mt-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                          disabled={state.isLoading}
                        >
                          +2 Hours Saved
                        </button>
                      </div>

                      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs md:text-sm font-medium text-gray-600">Projects Done</span>
                          <CheckCircle className="h-4 w-4 text-indigo-500" />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-indigo-600">{validateInteger(state.metrics.projectsCompleted)}</div>
                        <button 
                          onClick={() => {
                            updateMetrics({ projectsCompleted: state.metrics.projectsCompleted + 1 });
                            addQuickWin('Project completed! 🎉');
                          }}
                          className="mt-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          disabled={state.isLoading}
                        >
                          Mark Complete
                        </button>
                      </div>

                      <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-pink-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs md:text-sm font-medium text-gray-600">Quick Wins</span>
                          <Star className="h-4 w-4 text-pink-500" />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-pink-600">{validateInteger(state.quickWins.length)}</div>
                        <div className="text-xs text-gray-500 mt-1 truncate">
                          {state.quickWins[0]?.text.slice(0, 20) || 'No wins yet'}...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Additional tabs simplified for space but with proper empty states */}
            {state.activeTab === 'tracker' && (
              <section>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-6">🎯 Template Performance Tracker</h2>
                  
                  {Object.keys(state.templateUsage).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-800 mb-3">Most Used Templates</h3>
                        <div className="space-y-2">
                          {Object.entries(state.templateUsage)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 5)
                            .map(([templateId, count]) => {
                              const template = Object.values(categories).flat().find(t => t.id === templateId);
                              return (
                                <div key={templateId} className="flex justify-between items-center bg-white p-2 rounded">
                                  <span className="text-sm font-medium truncate">{template?.name || templateId}</span>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{count}x</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-bold text-green-800 mb-3">Category Performance</h3>
                        <div className="space-y-2">
                          {Object.entries(categories).map(([category, templates]) => {
                            const categoryUsage = templates.reduce((sum, template) => 
                              sum + (state.templateUsage[template.id] || 0), 0
                            );
                            return (
                              <div key={category} className="flex justify-between items-center bg-white p-2 rounded">
                                <span className="text-sm font-medium">{category}</span>
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{categoryUsage} uses</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No Usage Data Yet</p>
                      <p>Start using templates to see your performance metrics here.</p>
                      <button 
                        onClick={() => updateField('activeTab', 'templates')}
                        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Browse Templates
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {state.activeTab === 'goals' && (
              <section>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-6">💰 Revenue Goal Tracking</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-green-700 mb-4">🎯 Your Path to $100K</h3>
                      <ProgressBar 
                        current={validatePositiveNumber(state.goals.revenue.current)} 
                        target={validatePositiveNumber(state.goals.revenue.target)} 
                        color="green" 
                        label="Annual Revenue Goal"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-3">🚀 Revenue Milestones</h3>
                      <div className="space-y-2">
                        {[
                          { amount: 1000, title: "First $1,000 🎉" },
                          { amount: 5000, title: "$5,000 Mark 💪" },
                          { amount: 10000, title: "$10,000 Milestone 🚀" },
                          { amount: 25000, title: "$25,000 Quarter 💎" },
                          { amount: 50000, title: "$50,000 Halfway 🔥" },
                          { amount: 100000, title: "$100,000 GOAL! 👑" }
                        ].map(milestone => (
                          <div 
                            key={milestone.amount}
                            className={`p-2 rounded text-sm ${
                              state.goals.revenue.current >= milestone.amount ? 'bg-green-200' : 'bg-gray-100'
                            }`}
                          >
                            {milestone.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {state.activeTab === 'health' && (
              <section>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-6">📈 Business Health Monitor</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                        <Brain className="h-5 w-5 mr-2" />
                        Productivity Health
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Templates Used</span>
                          <span className="font-bold text-blue-600">{state.metrics.templatesUsed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Saved</span>
                          <span className="font-bold text-green-600">{Math.round(state.metrics.timesSaved)}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Focus Level</span>
                          <span className="font-bold text-yellow-600">High 😌</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-3 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Financial Health
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Revenue</span>
                          <span className="font-bold text-green-600">${state.metrics.revenueGenerated.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Progress</span>
                          <span className="font-bold text-blue-600">{getProgressPercentage(state.goals.revenue.current, state.goals.revenue.target).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue/Template</span>
                          <span className="font-bold text-purple-600">${state.metrics.templatesUsed > 0 ? Math.round(state.metrics.revenueGenerated / state.metrics.templatesUsed) : 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-bold text-purple-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Progress Health
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Quick Wins</span>
                          <span className="font-bold text-green-600">{state.quickWins.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Momentum</span>
                          <span className="font-bold text-blue-600">High 🚀</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Favorites</span>
                          <span className="font-bold text-purple-600">{state.favorites.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Health Insights & Recommendations
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-green-500">✅</span>
                        <span className="text-sm">Great job maintaining consistent progress with templates!</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-500">⚠️</span>
                        <span className="text-sm">Consider setting up automated workflows to reduce manual tasks.</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-500">💡</span>
                        <span className="text-sm">Your productivity peaks with shorter template sessions. Keep using 30-45 min blocks!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* QUICK WINS TAB */}
            {state.activeTab === 'wins' && (
              <section aria-labelledby="wins-heading">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 id="wins-heading" className="text-xl md:text-2xl font-bold text-purple-800 mb-6">🎉 Quick Wins Tracker</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-green-700 mb-4">Add a New Win!</h3>
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="What did you accomplish today?"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              addQuickWin(e.target.value.trim());
                              e.target.value = '';
                            }
                          }}
                          disabled={state.isLoading}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => addQuickWin('Completed a template!')}
                            className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={state.isLoading}
                          >
                            Used Template ✅
                          </button>
                          <button 
                            onClick={() => addQuickWin('Made progress on project!')}
                            className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={state.isLoading}
                          >
                            Project Progress 🚀
                          </button>
                          <button 
                            onClick={() => addQuickWin('Learned something new!')}
                            className="bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={state.isLoading}
                          >
                            New Learning 🧠
                          </button>
                          <button 
                            onClick={() => addQuickWin('Took care of myself!')}
                            className="bg-pink-500 text-white px-3 py-2 rounded text-sm hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                            disabled={state.isLoading}
                          >
                            Self-Care 💚
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-purple-700 mb-4">🌟 Recent Wins</h3>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {state.quickWins.map(win => (
                          <div key={win.id} className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border group">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                {state.editingWin === win.id ? (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      defaultValue={win.text}
                                      className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          dispatch({ type: 'EDIT_QUICK_WIN', id: win.id, newText: e.target.value });
                                        }
                                        if (e.key === 'Escape') {
                                          updateField('editingWin', null);
                                        }
                                      }}
                                      autoFocus
                                    />
                                    <button
                                      onClick={(e) => {
                                        const input = e.target.parentElement.querySelector('input');
                                        dispatch({ type: 'EDIT_QUICK_WIN', id: win.id, newText: input.value });
                                      }}
                                      className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                                      aria-label="Save changes"
                                    >
                                      <Save className="h-4 w-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-lg mr-2" aria-hidden="true">{win.celebration}</span>
                                    <span className="text-gray-800">{win.text}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-gray-500">{win.date}</span>
                                {state.editingWin !== win.id && (
                                  <>
                                    <button
                                      onClick={() => updateField('editingWin', win.id)}
                                      className="text-blue-600 hover:text-blue-800 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                      title="Edit win"
                                      aria-label="Edit this win"
                                    >
                                      <Edit3 className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => dispatch({ type: 'DELETE_QUICK_WIN', id: win.id })}
                                      className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                                      title="Delete win"
                                      aria-label="Delete this win"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Empty state for wins */}
                      {state.quickWins.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">No Wins Yet!</p>
                          <p>Your wins will appear here as you add them.</p>
                          <p className="text-sm mt-2">Start by adding your first win above! 🌟</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Win Streak Rewards */}
                  <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                    <h3 className="font-bold text-orange-800 mb-3">🏆 Win Streak Rewards</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { count: 3, icon: '🥉', title: '3 Wins', desc: 'Getting Started!' },
                        { count: 7, icon: '🥈', title: '7 Wins', desc: 'Building Momentum!' },
                        { count: 15, icon: '🥇', title: '15 Wins', desc: 'On Fire!' },
                        { count: 30, icon: '👑', title: '30 Wins', desc: 'Legend Status!' }
                      ].map(reward => (
                        <div 
                          key={reward.count}
                          className={`p-3 rounded text-center transition-all ${
                            state.quickWins.length >= reward.count ? 'bg-yellow-200 scale-105' : 'bg-gray-100'
                          }`}
                        >
                          <div className="text-2xl" aria-hidden="true">{reward.icon}</div>
                          <div className="text-sm font-medium">{reward.title}</div>
                          <div className="text-xs">{reward.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* MONTHLY REVIEW TAB */}
            {state.activeTab === 'monthly' && (
              <section aria-labelledby="monthly-heading">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 id="monthly-heading" className="text-xl md:text-2xl font-bold text-purple-800 mb-6">📅 Monthly Business Review</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-bold text-green-800 mb-3 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          What Went Well This Month
                        </h3>
                        <textarea 
                          className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Celebrate your wins! What are you proud of?"
                          disabled={state.isLoading}
                        />
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          Key Metrics This Month
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Revenue Generated:</span>
                            <span className="font-bold">${state.metrics.revenueGenerated.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Templates Used:</span>
                            <span className="font-bold">{state.metrics.templatesUsed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Projects Completed:</span>
                            <span className="font-bold">{state.metrics.projectsCompleted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hours Saved:</span>
                            <span className="font-bold">{Math.round(state.metrics.timesSaved)}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quick Wins:</span>
                            <span className="font-bold">{state.quickWins.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          Areas for Improvement
                        </h3>
                        <textarea 
                          className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder="What could be better? No judgment, just growth!"
                          disabled={state.isLoading}
                        />
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-bold text-purple-800 mb-3 flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          Next Month's Goals
                        </h3>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Goal 1: Increase revenue by..."
                            disabled={state.isLoading}
                          />
                          <input 
                            type="text" 
                            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Goal 2: Use 5 new templates..."
                            disabled={state.isLoading}
                          />
                          <input 
                            type="text" 
                            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Goal 3: Complete project..."
                            disabled={state.isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Progress Summary */}
                  <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3 flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Monthly Progress Summary
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-600">
                          {getProgressPercentage(state.goals.revenue.current, state.goals.revenue.target / 12).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-600">Monthly Revenue Goal</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-blue-600">{state.metrics.templatesUsed}</div>
                        <div className="text-sm text-gray-600">Templates Mastered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-600">{state.metrics.projectsCompleted}</div>
                        <div className="text-sm text-gray-600">Projects Shipped</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-yellow-600">{state.quickWins.length}</div>
                        <div className="text-sm text-gray-600">Wins Celebrated</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => addQuickWin('Completed monthly review! 📊')}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={state.isLoading}
                    >
                      Save Monthly Review 💾
                    </button>
                  </div>
                </div>
              </section>
            )}
          </main>

          {/* DATA MANAGEMENT FOOTER - Memory-only, no localStorage */}
          <footer className="mt-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Data stored in memory for this session only • {state.lastSaved ? new Date(state.lastSaved).toLocaleTimeString() : 'Not saved yet'}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={state.isLoading}
                  title="Export your data as JSON file"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export Data</span>
                </button>
                
                <button
                  onClick={clearData}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={state.isLoading}
                  title="Clear all data (cannot be undone)"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear Data</span>
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-500 text-sm border-t pt-4">
              <p className="flex items-center justify-center gap-2 mb-1">
                <Brain className="h-4 w-4" aria-hidden="true" />
                Designed for ADHD entrepreneurs • Progress over perfection!
              </p>
              <p className="flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
                <span>Built with ❤️ for neurodivergent success</span>
                <Sparkles className="h-4 w-4 text-yellow-500" aria-hidden="true" />
              </p>
            </div>
          </footer>
        </div>
      </div>
    </ProductionErrorBoundary>
  );
};

export default EmpowerAICompleteSystem;
