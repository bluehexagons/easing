/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/

export type EasingFunction = (time: number) => number;

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

const elasticShift = (amplitude: number, period: number): number => {
  if (!Number.isFinite(amplitude) || amplitude < 1) {
    throw new RangeError('Elastic amplitude must be a finite number greater than or equal to 1');
  }
  if (!Number.isFinite(period) || period <= 0) {
    throw new RangeError('Elastic period must be a finite number greater than 0');
  }
  return (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
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
  const overshoot = elasticShift(amplitude, period);
  if (time === 0) {
    return 0;
  } else if (time === 1) {
    return 1;
  } else {
    return (
      amplitude *
        2 ** (-10 * time) *
        Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
      1
    );
  }
};

export const elasticIn = (time: number, amplitude: number = 1, period: number = 0.3): number => {
  const overshoot = elasticShift(amplitude, period);
  if (time === 0) {
    return 0;
  } else if (time === 1) {
    return 1;
  } else {
    time -= 1;
    return (
      -(amplitude * 2 ** (10 * time)) *
      Math.sin(((time - overshoot) * (2 * Math.PI)) / period)
    );
  }
};

export const elasticInOut = (time: number, amplitude: number = 1, period: number = 0.45): number => {
  const overshoot = elasticShift(amplitude, period);
  time = time * 2;
  if (time === 0) {
    return 0;
  } else if (time === 2) {
    return 1;
  } else {
    time = time - 1;
    if (time < 0) {
      return (
        -0.5 *
        (amplitude * 2 ** (10 * time)) *
        Math.sin((time - overshoot) * ((2 * Math.PI) / period))
      );
    } else {
      return (
        0.5 *
          amplitude *
          2 ** (-10 * time) *
          Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
        1
      );
    }
  }
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

/** Create an elastic-in curve with reusable parameters. */
export const createElasticIn = (options: ElasticOptions = {}): EasingFunction => {
  const { amplitude = 1, period = 0.3 } = options;
  elasticShift(amplitude, period);
  return (time) => elasticIn(time, amplitude, period);
};

/** Create an elastic-out curve with reusable parameters. */
export const createElasticOut = (options: ElasticOptions = {}): EasingFunction => {
  const { amplitude = 1, period = 0.3 } = options;
  elasticShift(amplitude, period);
  return (time) => elasticOut(time, amplitude, period);
};

/** Create an elastic-in-out curve with reusable parameters. */
export const createElasticInOut = (options: ElasticOptions = {}): EasingFunction => {
  const { amplitude = 1, period = 0.45 } = options;
  elasticShift(amplitude, period);
  return (time) => elasticInOut(time, amplitude, period);
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
  if (minimum > maximum) {
    throw new RangeError('Clamp minimum must be less than or equal to maximum');
  }
  return (time) => Math.min(maximum, Math.max(minimum, fn(time)));
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
      if (Math.abs(currentSlope) < 1e-7) {
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

  return (time) => {
    if (time === 0 || time === 1) {
      return time;
    }
    return sample(solveTime(time), y1, y2);
  };
};

/** Create a stepped easing curve. */
export const steps = (count: number, position: StepPosition = 'end'): EasingFunction => {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('Step count must be a positive integer');
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
  const displacement = (seconds: number): number => {
    if (dampingRatio < 1) {
      const dampedFrequency = angularFrequency * Math.sqrt(1 - dampingRatio * dampingRatio);
      const sineCoefficient = (velocity - dampingRatio * angularFrequency) / dampedFrequency;
      return Math.exp(-dampingRatio * angularFrequency * seconds) *
        (-Math.cos(dampedFrequency * seconds) +
          sineCoefficient * Math.sin(dampedFrequency * seconds));
    }
    if (dampingRatio === 1) {
      return (-1 + (velocity - angularFrequency) * seconds) *
        Math.exp(-angularFrequency * seconds);
    }
    const root = Math.sqrt(dampingRatio * dampingRatio - 1);
    const firstRoot = -angularFrequency * (dampingRatio - root);
    const secondRoot = -angularFrequency * (dampingRatio + root);
    const firstCoefficient = (velocity + secondRoot) / (firstRoot - secondRoot);
    const secondCoefficient = -1 - firstCoefficient;
    return firstCoefficient * Math.exp(firstRoot * seconds) +
      secondCoefficient * Math.exp(secondRoot * seconds);
  };
  const response = (time: number): number => 1 + displacement(time * duration);
  const finalResponse = response(1);
  if (Math.abs(finalResponse) < Number.EPSILON) {
    throw new RangeError('Spring duration is too short to normalize');
  }
  return (time) => {
    if (time === 0 || time === 1) {
      return time;
    }
    return response(time) / finalResponse;
  };
};
