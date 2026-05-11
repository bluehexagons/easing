/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/
export const backIn = (time, overshoot = 1.70158) => {
    return time * time * ((overshoot + 1) * time - overshoot);
};
export const backOut = (time, overshoot = 1.70158) => {
    time = time - 1;
    return time * time * ((overshoot + 1) * time + overshoot) + 1;
};
export const backInOut = (time, overshoot = 1.70158) => {
    time = time * 2;
    overshoot = overshoot * 1.525;
    if (time < 1) {
        return 0.5 * (time * time * ((overshoot + 1) * time - overshoot));
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * ((overshoot + 1) * time + overshoot) + 2);
    }
};
export const bounceOut = (time) => {
    if (time < 1 / 2.75) {
        return 7.5625 * time * time;
    }
    else if (time < 2 / 2.75) {
        return 7.5625 * (time -= 1.5 / 2.75) * time + 0.75;
    }
    else if (time < 2.5 / 2.75) {
        return 7.5625 * (time -= 2.25 / 2.75) * time + 0.9375;
    }
    else {
        return 7.5625 * (time -= 2.625 / 2.75) * time + 0.984375;
    }
};
export const bounceIn = (time) => {
    return 1 - bounceOut(1 - time);
};
export const bounceInOut = (time) => {
    if (time < 0.5) {
        return bounceIn(time * 2) * 0.5;
    }
    else {
        return bounceOut(time * 2 - 1) * 0.5 + 0.5;
    }
};
export const circIn = (time) => {
    return -(Math.sqrt(1 - time * time) - 1);
};
export const circOut = (time) => {
    time = time - 1;
    return Math.sqrt(1 - time * time);
};
export const circInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return -0.5 * (Math.sqrt(1 - time * time) - 1);
    }
    else {
        time = time - 2;
        return 0.5 * (Math.sqrt(1 - time * time) + 1);
    }
};
export const cubicIn = (time) => {
    return time * time * time;
};
export const cubicOut = (time) => {
    time = time - 1;
    return time * time * time + 1;
};
export const cubicInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time + 2);
    }
};
export const elasticOut = (time, amplitude = 1, period = 0.3) => {
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        return (amplitude *
            2 ** (-10 * time) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
            1);
    }
};
export const elasticIn = (time, amplitude = 1, period = 0.3) => {
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        time -= 1;
        return (-(amplitude * 2 ** (10 * time)) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period));
    }
};
export const elasticInOut = (time, amplitude = 1, period = 0.45) => {
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else {
        const overshoot = (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
        time = time - 1;
        if (time < 0) {
            return (-0.5 *
                (amplitude * 2 ** (10 * time)) *
                Math.sin((time - overshoot) * ((2 * Math.PI) / period)));
        }
        else {
            return (amplitude *
                2 ** (-10 * time) *
                Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
                1);
        }
    }
};
export const expoIn = (time) => {
    if (time === 0) {
        return 0;
    }
    return 2 ** (10 * (time - 1));
};
export const expoOut = (time) => {
    if (time === 1) {
        return 1;
    }
    return -(2 ** (-10 * time)) + 1;
};
export const expoInOut = (time) => {
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else if (time < 1) {
        return 0.5 * 2 ** (10 * (time - 1));
    }
    else {
        return 0.5 * (-(2 ** (-10 * (time - 1))) + 2);
    }
};
export const linear = (time) => {
    return time;
};
export const quadIn = (time) => {
    return time * time;
};
export const quadOut = (time) => {
    return -time * (time - 2);
};
export const quadInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time;
    }
    else {
        time = time - 1;
        return -0.5 * (time * (time - 2) - 1);
    }
};
export const quartIn = (time) => {
    return time * time * time * time;
};
export const quartOut = (time) => {
    time = time - 1;
    return -(time * time * time * time - 1);
};
export const quartInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time;
    }
    else {
        time = time - 2;
        return -0.5 * (time * time * time * time - 2);
    }
};
export const quintIn = (time) => {
    return time * time * time * time * time;
};
export const quintOut = (time) => {
    time = time - 1;
    return time * time * time * time * time + 1;
};
export const quintInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time * time * time + 2);
    }
};
export const sineIn = (time) => {
    return -Math.cos(time * (Math.PI / 2)) + 1;
};
export const sineOut = (time) => {
    return Math.sin(time * (Math.PI / 2));
};
export const sineInOut = (time) => {
    return -0.5 * (Math.cos(Math.PI * time) - 1);
};
/**
 * Helper function to use different easing functions above and below 0.5
 */
export const inOut = (time, start, end) => {
    time = time * 2;
    if (time <= 1) {
        return start(time) * 0.5;
    }
    else {
        return 0.5 + end(time - 1.0) * 0.5;
    }
};
/**
 * Helper function to ease with a function between two values.
 */
export const ease = (fn, time, from, to) => from + fn(time) * (to - from);
/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
export const lerp = (time, from, to) => from + linear(time) * (to - from);
