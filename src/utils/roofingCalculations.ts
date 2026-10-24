/**
 * Pure roofing engineering calculations and validation rules for Johnston Roofing.
 * Decoupled from UI components for unit testing and deterministic results.
 */

export interface PitchConfig {
  multiplier: number;
  label: string;
  slopeDescription: string;
}

export const PITCH_MULTIPLIERS: Record<string, PitchConfig> = {
  flat: { multiplier: 1.02, label: 'Flat to Low Slope (< 2:12)', slopeDescription: 'Commercial & Modern Flat' },
  low: { multiplier: 1.08, label: 'Gentle Pitch (3:12 – 5:12)', slopeDescription: 'Standard Ranch & Split-level' },
  medium: { multiplier: 1.20, label: 'Medium Architectural (6:12 – 8:12)', slopeDescription: 'Colonial & Contemporary Gabled' },
  steep: { multiplier: 1.42, label: 'Steep Pitch (9:12+)', slopeDescription: 'Victorian, A-Frame & High Tudor' },
};

export interface SystemSpec {
  name: string;
  category: 'residential' | 'commercial' | 'architectural';
  lifespanExpectancy: string;
  weightClass: 'Ultra-Lightweight' | 'Standard Architectural' | 'Heavyweight Structural';
  fireRating: string;
  windRating: string;
  baseDaysPerSquare: number; // e.g. 0.15 days per square
  underlaymentSpec: string;
  keyAdvantages: string[];
}

export const ROOFING_SYSTEMS: Record<string, SystemSpec> = {
  'standing-seam': {
    name: 'Concealed Fastener Standing Seam Metal',
    category: 'architectural',
    lifespanExpectancy: '50+ Years',
    weightClass: 'Ultra-Lightweight',
    fireRating: 'Class A Non-Combustible',
    windRating: 'Up to 140+ MPH Tested',
    baseDaysPerSquare: 0.16,
    underlaymentSpec: 'High-Temperature Self-Adhering Membrane with Synthetic Vapor Barrier',
    keyAdvantages: [
      'Zero exposed screws to degrade or leak',
      'Solar-reflective Cool Roof finishes reduce thermal absorption',
      'Maximum resilience against severe wind and hail storms',
      'Minimal lifecycle maintenance requirement',
    ],
  },
  'architectural-shingle': {
    name: 'Multi-Layer Architectural Laminate Shingles',
    category: 'residential',
    lifespanExpectancy: '30–50 Years',
    weightClass: 'Standard Architectural',
    fireRating: 'Class A',
    windRating: 'Up to 130 MPH',
    baseDaysPerSquare: 0.10,
    underlaymentSpec: 'Reinforced Synthetic Underlayment + Ice & Water Barrier at Eaves & Valleys',
    keyAdvantages: [
      'Exceptional depth, dimensional shadow lines, and curb appeal',
      'High impact resistance options for hail-prone environments',
      'Cost-efficient balance of performance and aesthetics',
      'Extensive palette of modern graphite and earth tones',
    ],
  },
  'composite-slate': {
    name: 'Engineered Composite & Natural Slate Systems',
    category: 'architectural',
    lifespanExpectancy: '50–100 Years',
    weightClass: 'Heavyweight Structural',
    fireRating: 'Class A Non-Combustible',
    windRating: 'Up to 130 MPH',
    baseDaysPerSquare: 0.22,
    underlaymentSpec: 'Dual-Layer Premium Breathable High-Permeability Underlayment',
    keyAdvantages: [
      'Unrivaled heritage architectural prestige and timeless beauty',
      'Naturally impervious to freeze-thaw cycles and rot',
      'Authentic quarried or engineered chiseled edges',
      'Substantial property valuation enhancement',
    ],
  },
  'commercial-tpo': {
    name: 'Reinforced Single-Ply TPO / EPDM Membrane',
    category: 'commercial',
    lifespanExpectancy: '25–35 Years',
    weightClass: 'Ultra-Lightweight',
    fireRating: 'Class A',
    windRating: 'Engineered Parapet Termination Standard',
    baseDaysPerSquare: 0.08,
    underlaymentSpec: 'High-Density Polyiso Insulation Board with Mechanically Fastened Vapor Retarder',
    keyAdvantages: [
      'Heat-welded monolithic seams creating water-tight bond',
      'ENERGY STAR rated reflective surface lowering HVAC loads',
      'High puncture and chemical resistance for industrial equipment',
      'Engineered drainage scupper and internal drain integration',
    ],
  },
};

export interface EstimateInput {
  footprintSqFt: number;
  pitch: keyof typeof PITCH_MULTIPLIERS;
  systemKey: keyof typeof ROOFING_SYSTEMS;
  complexityFactor?: number; // e.g. 1.0 normal, 1.15 many valleys/dormers
}

export interface EstimateOutput {
  rawFootprint: number;
  calculatedSurfaceArea: number;
  squares: number;
  wasteMarginSqFt: number;
  totalMaterialsAreaSqFt: number;
  estimatedCrewDays: { min: number; max: number };
  system: SystemSpec;
  pitchConfig: PitchConfig;
  scopeBreakdown: string[];
}

export function calculateRoofEstimate(input: EstimateInput): EstimateOutput {
  const footprint = Math.max(200, input.footprintSqFt || 1000);
  const pitchCfg = PITCH_MULTIPLIERS[input.pitch] || PITCH_MULTIPLIERS.medium;
  const system = ROOFING_SYSTEMS[input.systemKey] || ROOFING_SYSTEMS['standing-seam'];
  const complexity = Math.max(1.0, input.complexityFactor || 1.10);

  // Surface calculation with pitch and overhang allowance (approx 6% overhang)
  const surfaceWithOverhang = footprint * 1.06 * pitchCfg.multiplier;
  const calculatedSurfaceArea = Math.round(surfaceWithOverhang);

  // Waste margin based on complexity
  const wastePercent = complexity > 1.15 ? 0.15 : 0.10;
  const wasteMarginSqFt = Math.round(calculatedSurfaceArea * wastePercent);
  const totalMaterialsAreaSqFt = calculatedSurfaceArea + wasteMarginSqFt;

  // 1 Square = 100 sq ft
  const squares = Math.round((totalMaterialsAreaSqFt / 100) * 10) / 10;

  // Estimated crew installation days (assumes standard 4-person professional crew)
  const baseDays = squares * system.baseDaysPerSquare * complexity;
  const minDays = Math.max(1, Math.round(baseDays * 0.85));
  const maxDays = Math.max(minDays + 1, Math.round(baseDays * 1.25));

  const scopeBreakdown = [
    `Complete protective removal and disposal of previous roofing layers down to structural decking`,
    `Comprehensive inspection of wood substrate, fascia, and framing integrity`,
    `Installation of code-compliant ventilation baffles and soffit intake channels`,
    `Application of ${system.underlaymentSpec}`,
    `Precision installation of ${system.name} with custom-bent aluminum/copper valleys and flashings`,
    `Multi-point weather-seal inspection and magnetic debris sweep of grounds`,
  ];

  return {
    rawFootprint: footprint,
    calculatedSurfaceArea,
    squares,
    wasteMarginSqFt,
    totalMaterialsAreaSqFt,
    estimatedCrewDays: { min: minDays, max: maxDays },
    system,
    pitchConfig: pitchCfg,
    scopeBreakdown,
  };
}

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  serviceInterest: string;
  estimatedSqFt: number;
  projectNotes: string;
  preferredTimeline: string;
}

export function validateEnquiryForm(data: Partial<EnquiryFormData>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name or company contact.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasValidEmail = data.email && emailRegex.test(data.email.trim());
  const cleanPhone = (data.phone || '').replace(/\D/g, '');
  const hasValidPhone = cleanPhone.length >= 7;

  if (!hasValidEmail && !hasValidPhone) {
    errors.contact = 'Please provide either a valid email address or phone number.';
  } else {
    if (data.email && !emailRegex.test(data.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (data.phone && cleanPhone.length > 0 && cleanPhone.length < 7) {
      errors.phone = 'Please provide a complete contact phone number.';
    }
  }

  if (!data.propertyType || data.propertyType.trim() === '') {
    errors.propertyType = 'Please select your property type.';
  }

  if (!data.serviceInterest || data.serviceInterest.trim() === '') {
    errors.serviceInterest = 'Please select the primary roofing service required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ProductionRequirement {
  id: string;
  category: 'Legal & Credentials' | 'Contact & Location' | 'Portfolio & Media' | 'Commercial & Warranties';
  title: string;
  description: string;
  status: 'Pending Confirmation' | 'Action Required';
}

export const PRODUCTION_REQUIREMENTS: ProductionRequirement[] = [
  {
    id: 'req-phone',
    category: 'Contact & Location',
    title: 'Official Johnston Roofing Telephone Numbers',
    description: 'Provide the official dispatch phone number and 24/7 emergency leak hotline to connect into the direct click-to-call buttons.',
    status: 'Pending Confirmation',
  },
  {
    id: 'req-email',
    category: 'Contact & Location',
    title: 'Lead Dispatch & Estimation Email',
    description: 'Designate the primary inbox (e.g. quotes@johnstonroofing.com or CRM webhook) where web form enquiries will route instantly.',
    status: 'Pending Confirmation',
  },
  {
    id: 'req-license',
    category: 'Legal & Credentials',
    title: 'State Contractor License & Registration',
    description: 'Confirm the official roofing contractor license ID to display in the footer and proposal trust bar.',
    status: 'Action Required',
  },
  {
    id: 'req-insurance',
    category: 'Legal & Credentials',
    title: 'General Liability & Workers Comp Certificate',
    description: 'Provide limits and coverage details so commercial and residential clients can verify bonded status directly.',
    status: 'Action Required',
  },
  {
    id: 'req-territory',
    category: 'Contact & Location',
    title: 'Operating Service Areas & ZIP Codes',
    description: 'Define specific metropolitan territories and radii so the quote estimator can validate local travel coverage.',
    status: 'Pending Confirmation',
  },
  {
    id: 'req-portfolio',
    category: 'Portfolio & Media',
    title: 'Verified Project Photography Archive',
    description: 'Swap illustrative architectural demo imagery with Johnston Roofing high-resolution completed jobs and in-progress craftsmanship photos.',
    status: 'Action Required',
  },
  {
    id: 'req-warranties',
    category: 'Commercial & Warranties',
    title: 'Manufacturer Certifications & Workmanship Warranties',
    description: 'Specify preferred roofing material manufacturers (e.g., GAF Master Elite, CertainTeed, Drexel Metals) and exact workmanship terms.',
    status: 'Action Required',
  },
];
