import { lerp, ease, quadIn, linear, elasticInOut } from './src/main.mjs';
// const { lerp, ease, quadIn, linear, elasticInOut } = require('@bluehexagons/easing');

const time = 0.5;
const start = 0;
const end = 100;
let failed = false;

/**
 * Tests something.
 * 
 * @param {number} v Value to test
 * @param {number} expect Expected value
 */
const check = (v, expect) => {
  const ok = v === expect;

  if (!ok) {
    failed = true;
  }

  console.log(ok ? 'OK' : ':(', v, expect);
}

/**
 * Concludes testing and exits the process.
 */
const conclude = () => {
  console.log(failed ? 'Test Failed' : 'Test Passed');
  process.exit(failed ? 1 : 0);
}

// TODO: real tests

// Linearly interpolate between a start and end value
check(
  lerp(time, start, end),
  50,
);


// Apply an EasingFunction to interpolate between start and end values
check(
  ease(quadIn, time, start, end),
  25,
);

// Use an EasingFunction directly
check(
  linear(time),
  0.5,
);

// elasticInOut is a more complicated easing function
const amplitude = 1.5;
const period = 0.3;
check(
  elasticInOut(time, amplitude, period),
  0,
);

// Using elasticInOut with the ease helper function, if you really want to
check(
  ease(t => elasticInOut(t, amplitude, period), time, start, end),
  0,
);

// Or the ease helper function on its own (quadIn)
check(
  ease(t => t ** 2, time, start, end),
  25,
);

conclude();