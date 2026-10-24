import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRoofEstimate,
  validateEnquiryForm,
  PITCH_MULTIPLIERS,
  ROOFING_SYSTEMS,
  PRODUCTION_REQUIREMENTS,
} from './roofingCalculations';

test('calculateRoofEstimate produces accurate surface area and squares with pitch multiplier', () => {
  const result = calculateRoofEstimate({
    footprintSqFt: 2000,
    pitch: 'medium', // 1.20 multiplier
    systemKey: 'standing-seam',
    complexityFactor: 1.10,
  });

  assert.equal(result.rawFootprint, 2000);
  // 2000 * 1.06 (overhang) * 1.20 = 2544
  assert.equal(result.calculatedSurfaceArea, 2544);
  // Waste is 10%: Math.round(2544 * 0.10) = 254
  assert.equal(result.wasteMarginSqFt, 254);
  assert.equal(result.totalMaterialsAreaSqFt, 2798);
  // 2798 / 100 = 28 squares
  assert.equal(result.squares, 28);
  assert.ok(result.estimatedCrewDays.min >= 1);
  assert.ok(result.estimatedCrewDays.max >= result.estimatedCrewDays.min);
  assert.equal(result.system.name, ROOFING_SYSTEMS['standing-seam'].name);
});

test('calculateRoofEstimate handles steep pitch with higher material requirements', () => {
  const resultFlat = calculateRoofEstimate({
    footprintSqFt: 1500,
    pitch: 'flat',
    systemKey: 'commercial-tpo',
  });

  const resultSteep = calculateRoofEstimate({
    footprintSqFt: 1500,
    pitch: 'steep',
    systemKey: 'composite-slate',
  });

  assert.ok(resultSteep.calculatedSurfaceArea > resultFlat.calculatedSurfaceArea);
  assert.ok(resultSteep.squares > resultFlat.squares);
});

test('validateEnquiryForm catches missing or invalid fields', () => {
  const emptyResult = validateEnquiryForm({});
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.contact);
  assert.ok(emptyResult.errors.propertyType);
  assert.ok(emptyResult.errors.serviceInterest);
});

test('validateEnquiryForm passes with complete and valid contact data', () => {
  const validResult = validateEnquiryForm({
    fullName: 'Alexander Wright',
    email: 'awright@example.com',
    phone: '555-234-5678',
    propertyType: 'Modern Residential',
    serviceInterest: 'Standing Seam Metal Installation',
    estimatedSqFt: 3200,
    projectNotes: 'Architectural renovation requiring standing seam charcoal metal roof.',
    preferredTimeline: 'Within 2 months',
  });

  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('production checklist contains all necessary onboarding criteria', () => {
  assert.ok(PRODUCTION_REQUIREMENTS.length >= 5);
  const categories = new Set(PRODUCTION_REQUIREMENTS.map((r) => r.category));
  assert.ok(categories.has('Legal & Credentials'));
  assert.ok(categories.has('Contact & Location'));
  assert.ok(categories.has('Portfolio & Media'));
  assert.ok(categories.has('Commercial & Warranties'));
});
