import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  buildMailtoUrl,
  filterProjectsByCategory,
  computeParallaxOffset,
} from './portfolioLogic.ts';

test('validateContactForm rejects empty and malformed inputs', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: 'invalid-email',
    subject: '',
    message: 'short',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);
});

test('validateContactForm accepts valid inquiry payload', () => {
  const validResult = validateContactForm({
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    subject: 'Full-Stack Engineering Opportunity',
    message: 'We would love to discuss an engineering role with you.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoUrl formats recipient, subject, and body cleanly', () => {
  const url = buildMailtoUrl('yashvinodgupta6@gmail.com', {
    name: 'Aarav',
    email: 'aarav@example.com',
    subject: 'Project Inquiry',
    message: 'Looking forward to connecting on a web platform.',
  });
  assert.ok(url.startsWith('mailto:yashvinodgupta6@gmail.com?'));
  assert.ok(url.includes('Project%20Inquiry'));
  assert.ok(url.includes('aarav%40example.com'));
});

test('filterProjectsByCategory returns all items for "all" and filters specific category', () => {
  const sample = [
    { id: '1', category: 'ai-fullstack' },
    { id: '2', category: 'systems-backend' },
    { id: '3', category: 'ai-fullstack' },
  ];
  assert.equal(filterProjectsByCategory(sample, 'all').length, 3);
  assert.equal(filterProjectsByCategory(sample, 'ai-fullstack').length, 2);
  assert.equal(filterProjectsByCategory(sample, 'systems-backend').length, 1);
});

test('computeParallaxOffset respects motionEnabled flag and clamps range', () => {
  assert.deepEqual(computeParallaxOffset(0.5, -0.5, 6, false), { x: 0, y: 0 });
  assert.deepEqual(computeParallaxOffset(0.5, -0.5, 6, true), { x: 3, y: -3 });
  assert.deepEqual(computeParallaxOffset(2.5, -3, 6, true), { x: 6, y: -6 });
});
