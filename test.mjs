import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import * as esm from '@bluehexagons/easing';
import { easings } from '@bluehexagons/easing/named';

const cjs = createRequire(import.meta.url)('@bluehexagons/easing');

const assertSame = (actual, expected, message) => {
  assert.ok(actual === expected, `${message}: expected ${expected}, got ${actual}`);
};

const assertClose = (actual, expected, message) => {
  assert.ok(
    Math.abs(actual - expected) <= 1e-12,
    `${message}: expected ${expected}, got ${actual}`,
  );
};

const easingFunctions = [
  'backIn',
  'backOut',
  'backInOut',
  'bounceIn',
  'bounceOut',
  'bounceInOut',
  'circIn',
  'circOut',
  'circInOut',
  'cubicIn',
  'cubicOut',
  'cubicInOut',
  'elasticIn',
  'elasticOut',
  'elasticInOut',
  'expoIn',
  'expoOut',
  'expoInOut',
  'linear',
  'quadIn',
  'quadOut',
  'quadInOut',
  'quartIn',
  'quartOut',
  'quartInOut',
  'quintIn',
  'quintOut',
  'quintInOut',
  'sineIn',
  'sineOut',
  'sineInOut',
];

// Verify that both package formats expose the same public runtime API.
assert.deepEqual(Object.keys(cjs).sort(), Object.keys(esm).sort());
for (const name of Object.keys(esm)) {
  assert.equal(typeof cjs[name], 'function', `${name} is missing from CommonJS`);
}

for (const name of easingFunctions) {
  for (const time of [0.1, 0.25, 0.5, 0.75, 0.9]) {
    assertSame(cjs[name](time), esm[name](time), `CommonJS parity for ${name}(${time})`);
  }
}

// Every easing function should preserve the conventional endpoints.
for (const name of easingFunctions) {
  const easing = esm[name];
  assertClose(easing(0), 0, `${name}(0)`);
  assertClose(easing(1), 1, `${name}(1)`);
  for (let sample = 0; sample <= 100; sample += 1) {
    assert.ok(Number.isFinite(easing(sample / 100)), `${name} should be finite at sample ${sample}`);
  }
}

// In/out curves should be symmetric, and out curves should reverse their in curve.
for (const family of ['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ', 'back', 'bounce', 'elastic']) {
  for (const time of [0.1, 0.25, 0.4]) {
    assertClose(
      esm[`${family}InOut`](time),
      1 - esm[`${family}InOut`](1 - time),
      `${family}InOut symmetry at ${time}`,
    );
    assertClose(
      esm[`${family}Out`](time),
      1 - esm[`${family}In`](1 - time),
      `${family} in/out reversal at ${time}`,
    );
  }
}

const time = 0.5;
const start = 0;
const end = 100;

assertSame(esm.lerp(time, start, end), 50, 'lerp');
assertSame(esm.ease(esm.quadIn, time, start, end), 25, 'ease with quadIn');
assertSame(esm.ease((value) => value ** 2, time, start, end), 25, 'ease with a custom function');
assertSame(esm.elasticInOut(time, 1.5, 0.3), 0.5, 'elasticInOut midpoint');
assertSame(esm.backInOut(1), 1, 'backInOut endpoint');

// Use different easing functions for each half of an in/out easing curve.
assertSame(esm.inOut(0, esm.linear, esm.linear), 0, 'inOut at start');
assertSame(esm.inOut(0.5, esm.linear, esm.linear), 0.5, 'inOut midpoint');
assertSame(esm.inOut(1, esm.linear, esm.linear), 1, 'inOut at end');

const configuredElastic = esm.createElasticInOut({ amplitude: 1.5, period: 0.3 });
assertSame(configuredElastic(0.5), 0.5, 'configured elastic midpoint');
assert.throws(() => esm.elasticIn(0.5, 0.5), RangeError);
assert.throws(() => esm.elasticIn(0, 0.5), RangeError);
assert.throws(() => esm.elasticOut(0.5, 1, 0), RangeError);
assert.throws(() => esm.createElasticInOut({ amplitude: Number.NaN }), RangeError);

const combined = esm.combineInOut(esm.quadIn, esm.quadOut);
assertSame(combined(0.25), 0.125, 'combined in/out first half');
assertSame(combined(0.75), 0.875, 'combined in/out second half');
assertClose(esm.reverse(esm.quadIn)(0.25), esm.quadOut(0.25), 'reverse');
assertSame(esm.clamp(esm.backOut)(0.5), 1, 'clamp overshoot');
assert.throws(() => esm.clamp(esm.linear, 1, 0), RangeError);

const cssEase = esm.cubicBezier(0.25, 0.1, 0.25, 1);
assertSame(cssEase(0), 0, 'cubicBezier start');
assertSame(cssEase(1), 1, 'cubicBezier end');
assertClose(cssEase(0.5), 0.8024033876954126, 'CSS ease midpoint');
assert.throws(() => esm.cubicBezier(-0.1, 0, 0.5, 1), RangeError);

assertSame(esm.steps(4)(0.24), 0, 'steps end before first boundary');
assertSame(esm.steps(4)(0.25), 0.25, 'steps end at first boundary');
assertSame(esm.steps(4, 'start')(0.01), 0.25, 'steps start');
assert.throws(() => esm.steps(0), RangeError);

const spring = esm.spring();
assertSame(spring(0), 0, 'spring start');
assertSame(spring(1), 1, 'spring end');
for (let sample = 0; sample <= 100; sample += 1) {
  assert.ok(Number.isFinite(spring(sample / 100)), `spring should be finite at sample ${sample}`);
}
assert.throws(() => esm.spring({ mass: 0 }), RangeError);
for (const damping of [5, 20, 30]) {
  const configuredSpring = esm.spring({ damping });
  for (let sample = 0; sample <= 100; sample += 1) {
    assert.ok(
      Number.isFinite(configuredSpring(sample / 100)),
      `spring with damping ${damping} should be finite at sample ${sample}`,
    );
  }
}

assert.deepEqual(Object.keys(easings).sort(), [...easingFunctions].sort());
for (const [name, easing] of Object.entries(easings)) {
  assertSame(easing, esm[name], `named registry entry ${name}`);
}
