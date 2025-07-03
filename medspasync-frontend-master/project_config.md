# MedSpa Payment Intelligence Project Configuration

## Project Goal & Description
The MedSpaSync Pro platform's current and primary goal is to provide **MedSpa Payment Intelligence**. Its core purpose is to offer **payment analytics dashboards that show real profitability by treatment, provider, and patient**. [cite_start]This directly addresses the core problem that medical spa owners "have no idea which treatments actually make money"[cite: 634]. [cite_start]The product vision is to help them "Finally understand your treatment profitability"[cite: 633].

**Note**: Previous discussions may have conflated this product with "rewards reconciliation." To be clear, **MedSpa Payment Intelligence focuses exclusively on financial analytics and profitability insights** from payment data, and *not* on loyalty program or rewards reconciliation. Rewards reconciliation is considered a separate product or a future, distinct feature not part of the current MVP or core value proposition for *this* specific product.

## Market Opportunity & Problem Solved
- **Core Problem**: Medical spa owners currently operate blind when it comes to true treatment profitability. [cite_start]They know revenue numbers but don't understand: which treatments are actually profitable after all costs, which providers generate the highest margins, whether package deals help or hurt profitability, or which patients are worth retaining versus price shopping[cite: 640, 641, 642, 643, 644].
- [cite_start]**Solution**: A payment analytics dashboard that shows real profitability by treatment, provider, and patient[cite: 635].
- [cite_start]**Market Size**: 11,000+ medical spas in the US [cite: 635][cite_start], with over 60%+ using Square/Stripe[cite: 635].
- [cite_start]**Pricing**: Aiming for $99-199/month depending on features[cite: 636].
- [cite_start]**Revenue Target**: $27,000 MRR by month 12[cite: 637].

## Target Customer Profile
- [cite_start]**Primary**: Medical spa owners doing $50K+/month revenue[cite: 646].
- [cite_start]**Secondary**: Practice managers at multi-location chains[cite: 647].
- [cite_start]**Pain Points**: Manual financial analysis, unclear profitability, poor visibility into performance[cite: 648].
- [cite_start]**Willingness to Pay**: $100-300/month for automated insights[cite: 649].

## Competitive Landscape
- [cite_start]**No direct competitors** in medical spa payment analytics[cite: 651].
- [cite_start]**Indirect competitors**: Generic business intelligence tools, payment processor dashboards[cite: 652].
- [cite_start]**Key differentiator**: Medical spa-specific insights and cost allocation[cite: 653].
- **Positioning**: Premium analytics, not full practice management software. Sits in the $149-$299/month range, below full practice management software ($400-$800+) and above free, generic tools.

## Technical Architecture
### Core Data Models
- `interface Transaction { id: string; amount: number; date: Date; description: string; paymentMethod: 'card' | 'cash' | 'check' | 'financing'; provider?: string; location?: string; rawData: any; [cite_start]}`[cite: 657, 658, 659, 660, 661, 662, 663, 664, 665, 666]
- `interface Treatment { id: string; name: string; category: 'injectable' | 'laser' | 'facial' | 'body' | 'consultation' | 'product'; averagePrice: number; costOfGoods?: number; timeRequired: number; isPackage: boolean; }`[cite: 667, 668, 669, 670, 671, 672, 673, 674, 675]
- `interface PatientAnalytics { id: string; firstVisit: Date; totalSpent: number; visitCount: number; averageOrderValue: number; lifetimeValue: number; lastVisit: Date; preferredTreatments: string[]; riskScore: 'low' | 'medium' | 'high'; }`[cite: 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686]

### Technology Stack
- [cite_start]**Frontend**: React + TypeScript + Tailwind CSS[cite: 688]
- [cite_start]**Backend**: Node.js + Express + PostgreSQL[cite: 689]
- [cite_start]**Analytics**: Chart.js + D3.js for custom visualizations[cite: 690]
- [cite_start]**File Processing**: Papa Parse for CSV, SheetJS for Excel[cite: 691]
- [cite_start]**Authentication**: Auth0 or Supabase Auth[cite: 692]
- [cite_start]**Payments**: Stripe for billing[cite: 693]
- [cite_start]**Hosting**: Vercel (frontend) + Railway/Render (backend)[cite: 694]

### Database Schema
```sql
-- Core tables for payment analytics
CREATE TABLE practices (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscription_tier VARCHAR(50) DEFAULT 'starter',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  practice_id UUID REFERENCES practices(id),
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  payment_method VARCHAR(50),
  provider_name VARCHAR(255),
  treatment_category VARCHAR(100),
  raw_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE treatments (
  id UUID PRIMARY KEY,
  practice_id UUID REFERENCES practices(id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  cost_of_goods DECIMAL(10,2),
  time_required INTEGER, -- minutes
  is_package BOOLEAN DEFAULT FALSE
);

CREATE TABLE insights (
  id UUID PRIMARY KEY,
  practice_id UUID REFERENCES practices(id),
  type VARCHAR(50), -- 'warning', 'opportunity', 'alert'
  title VARCHAR(255),
  description TEXT,
  action_required TEXT,
  impact_level VARCHAR(20), -- 'high', 'medium', 'low'
  created_at TIMESTAMP DEFAULT NOW()
);