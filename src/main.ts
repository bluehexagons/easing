/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/

export type EasingFunction = (time: number) => number;

/** A normalized stop object used by piecewise curve constructors. */
export interface CurveStop {
  readonly at: number;
  readonly value: number;
}

/** A normalized time/value pair or stop object used by piecewise curves. */
export type CurvePoint = readonly [time: number, value: number] | CurveStop;

export interface ElasticOptions {
  amplitude?: number;
  period?: number;
}

export interface SpringOptions {
  mass?: number;
  stiffness?: number;
  damping?: number;
  velocity?: number;
  duration?: number;
}

export type StepPosition = 'start' | 'end';

export interface InvertOptions {
  /** Maximum acceptable error in time or curve value. */
  tolerance?: number;
  /** Maximum number of bisection iterations. */
  iterations?: number;
}

export interface HermiteOptions {
  /** Derivative at time 0, measured in normalized value per normalized time. */
  startSlope?: number;
  /** Derivative at time 1, measured in normalized value per normalized time. */
  endSlope?: number;
}

interface ElasticParameters {
  frequency: number;
  phase: number;
}

interface ValidatedCurvePoints {
  times: number[];
  values: number[];
}

const validateCurvePoints = (
  points: readonly CurvePoint[],
  name: string
): ValidatedCurvePoints => {
  if (!Array.isArray(points) || points.length < 2) {
    throw new RangeError(`${name} requires at least two points`);
  }

  const times: number[] = [];
  const values: number[] = [];
  for (const point of points) {
    const time = Array.isArray(point) ? point[0] : point?.at;
    const value = Array.isArray(point) ? point[1] : point?.value;
    if ((Array.isArray(point) && point.length !== 2) ||
      !Number.isFinite(time) || !Number.isFinite(value)) {
      throw new RangeError(`${name} points must contain two finite numbers`);
    }
    times.push(time);
    values.push(value);
  }

  if (times[0] !== 0 || times[times.length - 1] !== 1) {
    throw new RangeError(`${name} point times must start at 0 and end at 1`);
  }
  for (let index = 1; index < times.length; index += 1) {
    if (times[index] <= times[index - 1]) {
      throw new RangeError(`${name} point times must be strictly increasing`);
    }
  }
  return { times, values };
};

const findCurveSegment = (time: number, times: readonly number[]): number => {
  if (time <= times[0]) {
    return 0;
  }
  if (time >= times[times.length - 1]) {
    return times.length - 2;
  }
  let lower = 0;
  let upper = times.length - 1;
  while (upper - lower > 1) {
    const middle = Math.floor((lower + upper) * 0.5);
    if (times[middle] <= time) {
      lower = middle;
    } else {
      upper = middle;
    }
  }
  return lower;
};

const elasticParameters = (amplitude: number, period: number): ElasticParameters => {
  if (!Number.isFinite(amplitude) || amplitude < 1) {
    throw new RangeError('Elastic amplitude must be a finite number greater than or equal to 1');
  }
  if (!Number.isFinite(period) || period <= 0) {
    throw new RangeError('Elastic period must be a finite number greater than 0');
  }
  const frequency = (2 * Math.PI) / period;
  if (!Number.isFinite(frequency)) {
    throw new RangeError('Elastic period is too small to calculate a finite curve');
  }
  return { frequency, phase: Math.asin(1 / amplitude) };
};

const elasticOutValue = (
  time: number,
  amplitude: number,
  parameters: ElasticParameters
): number => {
  if (time === 0 || time === 1) {
    return time;
  }
  return amplitude * 2 ** (-10 * time) *
    Math.sin(time * parameters.frequency - parameters.phase) + 1;
};

const elasticInValue = (
  time: number,
  amplitude: number,
  parameters: ElasticParameters
): number => {
  if (time === 0 || time === 1) {
    return time;
  }
  return -(amplitude * 2 ** (10 * (time - 1))) *
    Math.sin((1 - time) * parameters.frequency - parameters.phase);
};

const elasticInOutValue = (
  time: number,
  amplitude: number,
  parameters: ElasticParameters
): number => {
  if (time < 0.5) {
    return elasticInValue(time * 2, amplitude, parameters) * 0.5;
  }
  return elasticOutValue(time * 2 - 1, amplitude, parameters) * 0.5 + 0.5;
};

export const backIn = (time: number, overshoot: number = 1.70158): number => {
  return time * time * ((overshoot + 1) * time - overshoot);
};

export const backOut = (time: number, overshoot: number = 1.70158): number => {
  time = time - 1;
  return time * time * ((overshoot + 1) * time + overshoot) + 1;
};

export const backInOut = (time: number, overshoot: number = 1.70158): number => {
  time = time * 2;
  overshoot = overshoot * 1.525;
  if (time < 1) {
    return 0.5 * (time * time * ((overshoot + 1) * time - overshoot));
  } else {
    time = time - 2;
    return 0.5 * (time * time * ((overshoot + 1) * time + overshoot) + 2);
  }
};

export const bounceOut = (time: number): number => {
  if (time < 1 / 2.75) {
    return 7.5625 * time * time;
  } else if (time < 2 / 2.75) {
    return 7.5625 * (time -= 1.5 / 2.75) * time + 0.75;
  } else if (time < 2.5 / 2.75) {
    return 7.5625 * (time -= 2.25 / 2.75) * time + 0.9375;
  } else {
    return 7.5625 * (time -= 2.625 / 2.75) * time + 0.984375;
  }
};

export const bounceIn = (time: number): number => {
  return 1 - bounceOut(1 - time);
};

export const bounceInOut = (time: number): number => {
  if (time < 0.5) {
    return bounceIn(time * 2) * 0.5;
  } else {
    return bounceOut(time * 2 - 1) * 0.5 + 0.5;
  }
};

export const circIn = (time: number): number => {
  return -(Math.sqrt(1 - time * time) - 1);
};

export const circOut = (time: number): number => {
  time = time - 1;
  return Math.sqrt(1 - time * time);
};

export const circInOut = (time: number): number => {
  time = time * 2;
  if (time < 1) {
    return -0.5 * (Math.sqrt(1 - time * time) - 1);
  } else {
    time = time - 2;
    return 0.5 * (Math.sqrt(1 - time * time) + 1);
  }
};

export const cubicIn = (time: number): number => {
  return time * time * time;
};

export const cubicOut = (time: number): number => {
  time = time - 1;
  return time * time * time + 1;
};

export const cubicInOut = (time: number): number => {
  time = time * 2;
  if (time < 1) {
    return 0.5 * time * time * time;
  } else {
    time = time - 2;
    return 0.5 * (time * time * time + 2);
  }
};

export const elasticOut = (time: number, amplitude: number = 1, period: number = 0.3): number => {
  return elasticOutValue(time, amplitude, elasticParameters(amplitude, period));
};

export const elasticIn = (time: number, amplitude: number = 1, period: number = 0.3): number => {
  return elasticInValue(time, amplitude, elasticParameters(amplitude, period));
};

export const elasticInOut = (time: number, amplitude: number = 1, period: number = 0.45): number => {
  return elasticInOutValue(time, amplitude, elasticParameters(amplitude, period));
};

export const expoIn = (time: number): number => {
  if (time === 0) {
    return 0;
  }
  return 2 ** (10 * (time - 1));
};

export const expoOut = (time: number): number => {
  if (time === 1) {
    return 1;
  }
  return -(2 ** (-10 * time)) + 1;
};

export const expoInOut = (time: number): number => {
  time = time * 2;
  if (time === 0) {
    return 0;
  } else if (time === 2) {
    return 1;
  } else if (time < 1) {
    return 0.5 * 2 ** (10 * (time - 1));
  } else {
    return 0.5 * (-(2 ** (-10 * (time - 1))) + 2);
  }
};

export const linear = (time: number): number => {
  return time;
};

/** Smooth interpolation with zero velocity at both endpoints. */
export const smoothstep = (time: number): number =>
  time * time * (3 - 2 * time);

/** Smooth interpolation with zero velocity and acceleration at both endpoints. */
export const smootherstep = (time: number): number =>
  time * time * time * (time * (time * 6 - 15) + 10);

/** Create a cubic Hermite curve from 0 to 1 with configurable endpoint slopes. */
export const hermite = (options: HermiteOptions = {}): EasingFunction => {
  const { startSlope = 0, endSlope = 0 } = options;
  if (!Number.isFinite(startSlope) || !Number.isFinite(endSlope)) {
    throw new RangeError('Hermite slopes must be finite numbers');
  }
  return (time) => {
    const squared = time * time;
    const cubed = squared * time;
    return (cubed - 2 * squared + time) * startSlope +
      (-2 * cubed + 3 * squared) +
      (cubed - squared) * endSlope;
  };
};

export const quadIn = (time: number): number => {
  return time * time;
};

export const quadOut = (time: number): number => {
  return -time * (time - 2);
};

export const quadInOut = (time: number): number => {
  time = time * 2;
  if (time < 1) {
    return 0.5 * time * time;
  } else {
    time = time - 1;
    return -0.5 * (time * (time - 2) - 1);
  }
};

export const quartIn = (time: number): number => {
  return time * time * time * time;
};

export const quartOut = (time: number): number => {
  time = time - 1;
  return -(time * time * time * time - 1);
};

export const quartInOut = (time: number): number => {
  time = time * 2;
  if (time < 1) {
    return 0.5 * time * time * time * time;
  } else {
    time = time - 2;
    return -0.5 * (time * time * time * time - 2);
  }
};

export const quintIn = (time: number): number => {
  return time * time * time * time * time;
};

export const quintOut = (time: number): number => {
  time = time - 1;
  return time * time * time * time * time + 1;
};

export const quintInOut = (time: number): number => {
  time = time * 2;
  if (time < 1) {
    return 0.5 * time * time * time * time * time;
  } else {
    time = time - 2;
    return 0.5 * (time * time * time * time * time + 2);
  }
};

export const sineIn = (time: number): number => {
  return -Math.cos(time * (Math.PI / 2)) + 1;
};

export const sineOut = (time: number): number => {
  return Math.sin(time * (Math.PI / 2));
};

export const sineInOut = (time: number): number => {
  return -0.5 * (Math.cos(Math.PI * time) - 1);
};

/**
 * Helper function to use different easing functions above and below 0.5
 */
export const inOut = (
  time: number,
  start: EasingFunction,
  end: EasingFunction
): number => {
  time = time * 2;
  if (time <= 1) {
    return start(time) * 0.5;
  } else {
    return 0.5 + end(time - 1.0) * 0.5;
  }
};

/**
 * Helper function to ease with a function between two values.
 */
export const ease = (
  fn: EasingFunction,
  time: number,
  from: number,
  to: number
): number => from + fn(time) * (to - from);

/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
export const lerp = (time: number, from: number, to: number): number =>
  from + linear(time) * (to - from);

/** Create a piecewise-linear curve from normalized time/value points. */
export const piecewiseLinear = (points: readonly CurvePoint[]): EasingFunction => {
  const { times, values } = validateCurvePoints(points, 'piecewiseLinear');
  for (let index = 1; index < values.length; index += 1) {
    if (!Number.isFinite(values[index] - values[index - 1])) {
      throw new RangeError('piecewiseLinear points produce non-finite differences');
    }
  }
  return (time) => {
    if (time === times[0]) {
      return values[0];
    }
    if (time === times[times.length - 1]) {
      return values[values.length - 1];
    }
    const index = findCurveSegment(time, times);
    const span = times[index + 1] - times[index];
    const progress = (time - times[index]) / span;
    return values[index] + progress * (values[index + 1] - values[index]);
  };
};

const endpointTangent = (
  firstInterval: number,
  secondInterval: number,
  firstSecant: number,
  secondSecant: number
): number => {
  let tangent = ((2 * firstInterval + secondInterval) * firstSecant -
    firstInterval * secondSecant) / (firstInterval + secondInterval);
  if (tangent * firstSecant <= 0) {
    return 0;
  }
  if (firstSecant * secondSecant < 0 && Math.abs(tangent) > Math.abs(3 * firstSecant)) {
    tangent = 3 * firstSecant;
  }
  return tangent;
};

/**
 * Create a shape-preserving cubic spline from normalized points.
 * Values must be non-decreasing so the resulting curve cannot overshoot them.
 */
export const monotoneSpline = (points: readonly CurvePoint[]): EasingFunction => {
  const { times, values } = validateCurvePoints(points, 'monotoneSpline');
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] < values[index - 1]) {
      throw new RangeError('monotoneSpline point values must be non-decreasing');
    }
  }

  const intervals: number[] = [];
  const secants: number[] = [];
  for (let index = 0; index < times.length - 1; index += 1) {
    const interval = times[index + 1] - times[index];
    const secant = (values[index + 1] - values[index]) / interval;
    if (!Number.isFinite(secant)) {
      throw new RangeError('monotoneSpline points produce non-finite slopes');
    }
    intervals.push(interval);
    secants.push(secant);
  }

  const tangents: number[] = new Array(times.length);
  if (secants.length === 1) {
    tangents[0] = secants[0];
    tangents[1] = secants[0];
  } else {
    tangents[0] = endpointTangent(intervals[0], intervals[1], secants[0], secants[1]);
    tangents[tangents.length - 1] = endpointTangent(
      intervals[intervals.length - 1],
      intervals[intervals.length - 2],
      secants[secants.length - 1],
      secants[secants.length - 2]
    );
    for (let index = 1; index < tangents.length - 1; index += 1) {
      const previousSecant = secants[index - 1];
      const nextSecant = secants[index];
      if (previousSecant * nextSecant <= 0) {
        tangents[index] = 0;
      } else {
        const previousInterval = intervals[index - 1];
        const nextInterval = intervals[index];
        const firstWeight = 2 * nextInterval + previousInterval;
        const secondWeight = nextInterval + 2 * previousInterval;
        tangents[index] = (firstWeight + secondWeight) /
          (firstWeight / previousSecant + secondWeight / nextSecant);
      }
    }
  }
  if (!tangents.every(Number.isFinite)) {
    throw new RangeError('monotoneSpline points produce non-finite tangents');
  }

  return (time) => {
    if (time === times[0]) {
      return values[0];
    }
    if (time === times[times.length - 1]) {
      return values[values.length - 1];
    }
    const index = findCurveSegment(time, times);
    const interval = intervals[index];
    const progress = (time - times[index]) / interval;
    const progressSquared = progress * progress;
    const progressCubed = progressSquared * progress;
    const startBasis = 2 * progressCubed - 3 * progressSquared + 1;
    const startTangentBasis = progressCubed - 2 * progressSquared + progress;
    const endBasis = -2 * progressCubed + 3 * progressSquared;
    const endTangentBasis = progressCubed - progressSquared;
    return startBasis * values[index] +
      startTangentBasis * interval * tangents[index] +
      endBasis * values[index + 1] +
      endTangentBasis * interval * tangents[index + 1];
  };
};

/**
 * Create an inverse lookup for a continuous, strictly monotonic curve.
 * The returned function accepts a curve value and returns its normalized time.
 */
export const invert = (
  fn: EasingFunction,
  options: InvertOptions = {}
): EasingFunction => {
  const { tolerance = 1e-8, iterations = 50 } = options;
  if (!Number.isFinite(tolerance) || tolerance <= 0) {
    throw new RangeError('Invert tolerance must be a finite number greater than 0');
  }
  if (!Number.isSafeInteger(iterations) || iterations < 1) {
    throw new RangeError('Invert iterations must be a positive safe integer');
  }

  const startValue = fn(0);
  const endValue = fn(1);
  if (!Number.isFinite(startValue) || !Number.isFinite(endValue) || startValue === endValue) {
    throw new RangeError('Cannot invert a curve with equal or non-finite endpoint values');
  }
  const ascending = endValue > startValue;
  let previousValue = startValue;
  for (let sample = 1; sample <= 32; sample += 1) {
    const currentValue = fn(sample / 32);
    if (!Number.isFinite(currentValue) ||
      (ascending ? currentValue <= previousValue : currentValue >= previousValue)) {
      throw new RangeError('Cannot invert a curve that is not strictly monotonic');
    }
    previousValue = currentValue;
  }

  const minimum = Math.min(startValue, endValue);
  const maximum = Math.max(startValue, endValue);
  return (value) => {
    if (!Number.isFinite(value) || value < minimum || value > maximum) {
      throw new RangeError('Inverted value must be finite and within the curve endpoint range');
    }
    if (value === startValue) {
      return 0;
    }
    if (value === endValue) {
      return 1;
    }
    let lower = 0;
    let upper = 1;
    for (let iteration = 0; iteration < iterations; iteration += 1) {
      const middle = (lower + upper) * 0.5;
      const currentValue = fn(middle);
      if (!Number.isFinite(currentValue)) {
        throw new RangeError('Cannot invert a curve that produces non-finite values');
      }
      if (Math.abs(currentValue - value) <= tolerance || upper - lower <= tolerance) {
        return middle;
      }
      if (ascending ? currentValue < value : currentValue > value) {
        lower = middle;
      } else {
        upper = middle;
      }
    }
    return (lower + upper) * 0.5;
  };
};

/** Create an elastic-in curve with reusable parameters. */
export const createElasticIn = (options: ElasticOptions = {}): EasingFunction => {
  const { amplitude = 1, period = 0.3 } = options;
  const parameters = elasticParameters(amplitude, period);
  return (time) => elasticInValue(time, amplitude, parameters);
};

/** Create an elastic-out curve with reusable parameters. */
export const createElasticOut = (options: ElasticOptions = {}): EasingFunction => {
  const { amplitude = 1, period = 0.3 } = options;
  const parameters = elasticParameters(amplitude, period);
  return (time) => elasticOutValue(time, amplitude, parameters);
};

/** Create an elastic-in-out curve with reusable parameters. */
export const createElasticInOut = (options: ElasticOptions = {}): EasingFunction => {
  const { amplitude = 1, period = 0.45 } = options;
  const parameters = elasticParameters(amplitude, period);
  return (time) => elasticInOutValue(time, amplitude, parameters);
};

/** Create a curve that uses one easing function for each half. */
export const combineInOut = (
  start: EasingFunction,
  end: EasingFunction
): EasingFunction => (time) => inOut(time, start, end);

/** Reverse an easing function in time and value. */
export const reverse = (fn: EasingFunction): EasingFunction =>
  (time) => 1 - fn(1 - time);

/** Clamp an easing function's output to a range. */
export const clamp = (
  fn: EasingFunction,
  minimum: number = 0,
  maximum: number = 1
): EasingFunction => {
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) {
    throw new RangeError('Clamp bounds must be finite numbers');
  }
  if (minimum > maximum) {
    throw new RangeError('Clamp minimum must be less than or equal to maximum');
  }
  return (time) => Math.min(maximum, Math.max(minimum, fn(time)));
};

/** Compose two curves, applying the inner curve before the outer curve. */
export const compose = (
  outer: EasingFunction,
  inner: EasingFunction
): EasingFunction => (time) => outer(inner(time));

/** Blend two curves, where weight 0 selects the first and weight 1 the second. */
export const mix = (
  first: EasingFunction,
  second: EasingFunction,
  weight: number = 0.5
): EasingFunction => {
  if (!Number.isFinite(weight)) {
    throw new RangeError('Mix weight must be a finite number');
  }
  return (time) => first(time) * (1 - weight) + second(time) * weight;
};

const validateCycleCount = (count: number, name: string): void => {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new RangeError(`${name} count must be a positive safe integer`);
  }
};

/** Repeat a curve for a fixed number of cycles. */
export const repeat = (fn: EasingFunction, count: number): EasingFunction => {
  validateCycleCount(count, 'Repeat');
  return (time) => {
    if (time === 1) {
      return fn(1);
    }
    const scaledTime = time * count;
    const cycleProgress = scaledTime - Math.floor(scaledTime);
    return fn(cycleProgress);
  };
};

/** Repeat a curve while reversing its direction on alternating cycles. */
export const alternate = (fn: EasingFunction, count: number): EasingFunction => {
  validateCycleCount(count, 'Alternate');
  return (time) => {
    const scaledTime = time * count;
    const cycle = Math.floor(scaledTime);
    const cycleProgress = scaledTime - cycle;
    if (time === 1) {
      return fn(count % 2 === 1 ? 1 : 0);
    }
    return cycle % 2 === 0 ? fn(cycleProgress) : fn(1 - cycleProgress);
  };
};

/** Create an easing function equivalent to CSS cubic-bezier(). */
export const cubicBezier = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): EasingFunction => {
  if (![x1, y1, x2, y2].every(Number.isFinite)) {
    throw new RangeError('Cubic-bezier control points must be finite numbers');
  }
  if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
    throw new RangeError('Cubic-bezier x control points must be in the range [0, 1]');
  }
  if (x1 === y1 && x2 === y2) {
    return linear;
  }

  const coefficientA = (first: number, second: number): number =>
    1 - 3 * second + 3 * first;
  const coefficientB = (first: number, second: number): number =>
    3 * second - 6 * first;
  const coefficientC = (first: number): number => 3 * first;
  const sample = (time: number, first: number, second: number): number =>
    ((coefficientA(first, second) * time + coefficientB(first, second)) * time +
      coefficientC(first)) * time;
  const slope = (time: number, first: number, second: number): number =>
    3 * coefficientA(first, second) * time * time +
    2 * coefficientB(first, second) * time +
    coefficientC(first);

  const solveTime = (x: number): number => {
    let estimate = x;
    for (let iteration = 0; iteration < 8; iteration += 1) {
      const difference = sample(estimate, x1, x2) - x;
      if (Math.abs(difference) < 1e-7) {
        return estimate;
      }
      const currentSlope = slope(estimate, x1, x2);
      if (Math.abs(currentSlope) < 1e-7 || estimate < 0 || estimate > 1) {
        break;
      }
      estimate -= difference / currentSlope;
    }

    let lower = 0;
    let upper = 1;
    estimate = x;
    for (let iteration = 0; iteration < 20; iteration += 1) {
      const difference = sample(estimate, x1, x2) - x;
      if (Math.abs(difference) < 1e-7) {
        break;
      }
      if (difference < 0) {
        lower = estimate;
      } else {
        upper = estimate;
      }
      estimate = (lower + upper) * 0.5;
    }
    return estimate;
  };

  const startSlope = x1 > 0 ? y1 / x1 : x2 > 0 ? y2 / x2 : 0;
  const endSlope = x2 < 1 ? (1 - y2) / (1 - x2) : x1 < 1 ? (1 - y1) / (1 - x1) : 0;

  return (time) => {
    if (time === 0 || time === 1) {
      return time;
    }
    if (time < 0) {
      return startSlope === 0 ? 0 : time * startSlope;
    }
    if (time > 1) {
      return endSlope === 0 ? 1 : 1 + (time - 1) * endSlope;
    }
    return sample(solveTime(time), y1, y2);
  };
};

/** Create a stepped easing curve. */
export const steps = (count: number, position: StepPosition = 'end'): EasingFunction => {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new RangeError('Step count must be a positive safe integer');
  }
  if (position !== 'start' && position !== 'end') {
    throw new RangeError("Step position must be either 'start' or 'end'");
  }
  return (time) => {
    if (time === 0 || time === 1) {
      return time;
    }
    const step = position === 'start' ? Math.ceil(time * count) : Math.floor(time * count);
    return step / count;
  };
};

/** Create a normalized damped-spring easing curve. */
export const spring = (options: SpringOptions = {}): EasingFunction => {
  const {
    mass = 1,
    stiffness = 100,
    damping = 10,
    velocity = 0,
    duration = 1
  } = options;
  if (![mass, stiffness, duration].every((value) => Number.isFinite(value) && value > 0)) {
    throw new RangeError('Spring mass, stiffness, and duration must be finite numbers greater than 0');
  }
  if (!Number.isFinite(damping) || damping < 0 || !Number.isFinite(velocity)) {
    throw new RangeError('Spring damping and velocity must be finite, with damping at least 0');
  }

  const angularFrequency = Math.sqrt(stiffness / mass);
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  if (!Number.isFinite(angularFrequency) || angularFrequency <= 0 || !Number.isFinite(dampingRatio)) {
    throw new RangeError('Spring options must produce finite frequency and damping');
  }
  const criticalTolerance = 1e-8;
  let displacement: (seconds: number) => number;
  if (dampingRatio < 1 - criticalTolerance) {
    const dampedFrequency = angularFrequency * Math.sqrt(1 - dampingRatio * dampingRatio);
    const sineCoefficient = (velocity - dampingRatio * angularFrequency) / dampedFrequency;
    if (!Number.isFinite(dampedFrequency) || !Number.isFinite(sineCoefficient)) {
      throw new RangeError('Spring options must produce finite response coefficients');
    }
    displacement = (seconds) =>
      Math.exp(-dampingRatio * angularFrequency * seconds) *
        (-Math.cos(dampedFrequency * seconds) +
          sineCoefficient * Math.sin(dampedFrequency * seconds));
  } else if (dampingRatio <= 1 + criticalTolerance) {
    displacement = (seconds) =>
      (-1 + (velocity - angularFrequency) * seconds) *
        Math.exp(-angularFrequency * seconds);
  } else {
    const root = Math.sqrt(dampingRatio * dampingRatio - 1);
    const rootSum = dampingRatio + root;
    const firstRoot = -angularFrequency / rootSum;
    const secondRoot = -angularFrequency * rootSum;
    if (!Number.isFinite(firstRoot) || !Number.isFinite(secondRoot)) {
      throw new RangeError('Spring options must produce finite response roots');
    }
    const firstCoefficient = (velocity + secondRoot) / (firstRoot - secondRoot);
    const secondCoefficient = -1 - firstCoefficient;
    if (!Number.isFinite(firstCoefficient) || !Number.isFinite(secondCoefficient)) {
      throw new RangeError('Spring options must produce finite response coefficients');
    }
    displacement = (seconds) => firstCoefficient * Math.exp(firstRoot * seconds) +
      secondCoefficient * Math.exp(secondRoot * seconds);
  }
  const response = (time: number): number => 1 + displacement(time * duration);
  const finalResponse = response(1);
  if (!Number.isFinite(finalResponse) || Math.abs(finalResponse) < Number.EPSILON) {
    throw new RangeError('Spring response cannot be normalized for these options');
  }
  return (time) => {
    if (time === 0 || time === 1) {
      return time;
    }
    return response(time) / finalResponse;
  };
};
