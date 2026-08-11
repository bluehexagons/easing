import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import * as esm from '@bluehexagons/easing';

const cjs = createRequire(import.meta.url)('@bluehexagons/easing');

const assertSame = (actual, expected, message) => {
  assert.ok(actual === expected, `${message}: expected ${expected}, got ${actual}`);
};

const assertClose = (actual, expected, message) => {
  assert.ok(
    Math.abs(actual - expected) <= Number.EPSILON * 4,
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
  for (const time of [0.25, 0.5, 0.75]) {
    assertSame(cjs[name](time), esm[name](time), `CommonJS parity for ${name}(${time})`);
  }
}

// Every easing function should preserve the conventional endpoints.
for (const name of easingFunctions) {
  const easing = esm[name];
  assertClose(easing(0), 0, `${name}(0)`);
  assertClose(easing(1), 1, `${name}(1)`);
  assert.ok(Number.isFinite(easing(0.5)), `${name}(0.5) should be finite`);
}

const time = 0.5;
const start = 0;
const end = 100;

assertSame(esm.lerp(time, start, end), 50, 'lerp');
assertSame(esm.ease(esm.quadIn, time, start, end), 25, 'ease with quadIn');
assertSame(esm.ease((value) => value ** 2, time, start, end), 25, 'ease with a custom function');
assertSame(esm.elasticInOut(time, 1.5, 0.3), 0, 'elasticInOut');
assertSame(esm.backInOut(1), 1, 'backInOut endpoint');

// Use different easing functions for each half of an in/out easing curve.
assertSame(esm.inOut(0, esm.linear, esm.linear), 0, 'inOut at start');
assertSame(esm.inOut(0.5, esm.linear, esm.linear), 0.5, 'inOut midpoint');
assertSame(esm.inOut(1, esm.linear, esm.linear), 1, 'inOut at end');
