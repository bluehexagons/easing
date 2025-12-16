/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/

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
  if (time === 0) {
    return 0;
  } else if (time === 1) {
    return 1;
  } else {
    const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
    return (
      amplitude *
        2 ** (-10 * time) *
        Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
      1
    );
  }
};

export const elasticIn = (time: number, amplitude: number = 1, period: number = 0.3): number => {
  if (time === 0) {
    return 0;
  } else if (time === 1) {
    return 1;
  } else {
    const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
    time -= 1;
    return (
      -(amplitude * 2 ** (10 * time)) *
      Math.sin(((time - overshoot) * (2 * Math.PI)) / period)
    );
  }
};

export const elasticInOut = (time: number, amplitude: number = 1, period: number = 0.45): number => {
  time = time * 2;
  if (time === 0) {
    return 0;
  } else if (time === 2) {
    return 1;
  } else {
    const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
    time = time - 1;
    if (time < 0) {
      return (
        -0.5 *
        (amplitude * 2 ** (10 * time)) *
        Math.sin((time - overshoot) * ((2 * Math.PI) / period))
      );
    } else {
      return (
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

export type EasingFunction = (time: number) => number;

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
    return 0.5 + end(time - 1.0);
  }
};

/**
 * Helper function to ease with a function between two values.
 */
export const ease = (fn: EasingFunction, time: number, from: number, to: number): number => from + fn(time) * (to - from);

/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
export const lerp = (time: number, from: number, to: number): number => from + linear(time) * (to - from);
