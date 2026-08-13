"use strict";
/*
  Code heavily-adapted from https://github.com/jimjeffers/Easie
  which is itself adapted from http://robertpenner.com/easing

  Original code MIT License + 3-clause BSD http://robertpenner.com/easing_terms_of_use.html
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.spring = exports.steps = exports.cubicBezier = exports.clamp = exports.reverse = exports.combineInOut = exports.createElasticInOut = exports.createElasticOut = exports.createElasticIn = exports.lerp = exports.ease = exports.inOut = exports.sineInOut = exports.sineOut = exports.sineIn = exports.quintInOut = exports.quintOut = exports.quintIn = exports.quartInOut = exports.quartOut = exports.quartIn = exports.quadInOut = exports.quadOut = exports.quadIn = exports.linear = exports.expoInOut = exports.expoOut = exports.expoIn = exports.elasticInOut = exports.elasticIn = exports.elasticOut = exports.cubicInOut = exports.cubicOut = exports.cubicIn = exports.circInOut = exports.circOut = exports.circIn = exports.bounceInOut = exports.bounceIn = exports.bounceOut = exports.backInOut = exports.backOut = exports.backIn = void 0;
const elasticShift = (amplitude, period) => {
    if (!Number.isFinite(amplitude) || amplitude < 1) {
        throw new RangeError('Elastic amplitude must be a finite number greater than or equal to 1');
    }
    if (!Number.isFinite(period) || period <= 0) {
        throw new RangeError('Elastic period must be a finite number greater than 0');
    }
    return (period / (2 * Math.PI)) * Math.asin(1 / amplitude);
};
const backIn = (time, overshoot = 1.70158) => {
    return time * time * ((overshoot + 1) * time - overshoot);
};
exports.backIn = backIn;
const backOut = (time, overshoot = 1.70158) => {
    time = time - 1;
    return time * time * ((overshoot + 1) * time + overshoot) + 1;
};
exports.backOut = backOut;
const backInOut = (time, overshoot = 1.70158) => {
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
exports.backInOut = backInOut;
const bounceOut = (time) => {
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
exports.bounceOut = bounceOut;
const bounceIn = (time) => {
    return 1 - (0, exports.bounceOut)(1 - time);
};
exports.bounceIn = bounceIn;
const bounceInOut = (time) => {
    if (time < 0.5) {
        return (0, exports.bounceIn)(time * 2) * 0.5;
    }
    else {
        return (0, exports.bounceOut)(time * 2 - 1) * 0.5 + 0.5;
    }
};
exports.bounceInOut = bounceInOut;
const circIn = (time) => {
    return -(Math.sqrt(1 - time * time) - 1);
};
exports.circIn = circIn;
const circOut = (time) => {
    time = time - 1;
    return Math.sqrt(1 - time * time);
};
exports.circOut = circOut;
const circInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return -0.5 * (Math.sqrt(1 - time * time) - 1);
    }
    else {
        time = time - 2;
        return 0.5 * (Math.sqrt(1 - time * time) + 1);
    }
};
exports.circInOut = circInOut;
const cubicIn = (time) => {
    return time * time * time;
};
exports.cubicIn = cubicIn;
const cubicOut = (time) => {
    time = time - 1;
    return time * time * time + 1;
};
exports.cubicOut = cubicOut;
const cubicInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time + 2);
    }
};
exports.cubicInOut = cubicInOut;
const elasticOut = (time, amplitude = 1, period = 0.3) => {
    const overshoot = elasticShift(amplitude, period);
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        return (amplitude *
            2 ** (-10 * time) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
            1);
    }
};
exports.elasticOut = elasticOut;
const elasticIn = (time, amplitude = 1, period = 0.3) => {
    const overshoot = elasticShift(amplitude, period);
    if (time === 0) {
        return 0;
    }
    else if (time === 1) {
        return 1;
    }
    else {
        time -= 1;
        return (-(amplitude * 2 ** (10 * time)) *
            Math.sin(((time - overshoot) * (2 * Math.PI)) / period));
    }
};
exports.elasticIn = elasticIn;
const elasticInOut = (time, amplitude = 1, period = 0.45) => {
    const overshoot = elasticShift(amplitude, period);
    time = time * 2;
    if (time === 0) {
        return 0;
    }
    else if (time === 2) {
        return 1;
    }
    else {
        time = time - 1;
        if (time < 0) {
            return (-0.5 *
                (amplitude * 2 ** (10 * time)) *
                Math.sin((time - overshoot) * ((2 * Math.PI) / period)));
        }
        else {
            return (0.5 *
                amplitude *
                2 ** (-10 * time) *
                Math.sin(((time - overshoot) * (2 * Math.PI)) / period) +
                1);
        }
    }
};
exports.elasticInOut = elasticInOut;
const expoIn = (time) => {
    if (time === 0) {
        return 0;
    }
    return 2 ** (10 * (time - 1));
};
exports.expoIn = expoIn;
const expoOut = (time) => {
    if (time === 1) {
        return 1;
    }
    return -(2 ** (-10 * time)) + 1;
};
exports.expoOut = expoOut;
const expoInOut = (time) => {
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
exports.expoInOut = expoInOut;
const linear = (time) => {
    return time;
};
exports.linear = linear;
const quadIn = (time) => {
    return time * time;
};
exports.quadIn = quadIn;
const quadOut = (time) => {
    return -time * (time - 2);
};
exports.quadOut = quadOut;
const quadInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time;
    }
    else {
        time = time - 1;
        return -0.5 * (time * (time - 2) - 1);
    }
};
exports.quadInOut = quadInOut;
const quartIn = (time) => {
    return time * time * time * time;
};
exports.quartIn = quartIn;
const quartOut = (time) => {
    time = time - 1;
    return -(time * time * time * time - 1);
};
exports.quartOut = quartOut;
const quartInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time;
    }
    else {
        time = time - 2;
        return -0.5 * (time * time * time * time - 2);
    }
};
exports.quartInOut = quartInOut;
const quintIn = (time) => {
    return time * time * time * time * time;
};
exports.quintIn = quintIn;
const quintOut = (time) => {
    time = time - 1;
    return time * time * time * time * time + 1;
};
exports.quintOut = quintOut;
const quintInOut = (time) => {
    time = time * 2;
    if (time < 1) {
        return 0.5 * time * time * time * time * time;
    }
    else {
        time = time - 2;
        return 0.5 * (time * time * time * time * time + 2);
    }
};
exports.quintInOut = quintInOut;
const sineIn = (time) => {
    return -Math.cos(time * (Math.PI / 2)) + 1;
};
exports.sineIn = sineIn;
const sineOut = (time) => {
    return Math.sin(time * (Math.PI / 2));
};
exports.sineOut = sineOut;
const sineInOut = (time) => {
    return -0.5 * (Math.cos(Math.PI * time) - 1);
};
exports.sineInOut = sineInOut;
/**
 * Helper function to use different easing functions above and below 0.5
 */
const inOut = (time, start, end) => {
    time = time * 2;
    if (time <= 1) {
        return start(time) * 0.5;
    }
    else {
        return 0.5 + end(time - 1.0) * 0.5;
    }
};
exports.inOut = inOut;
/**
 * Helper function to ease with a function between two values.
 */
const ease = (fn, time, from, to) => from + fn(time) * (to - from);
exports.ease = ease;
/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
const lerp = (time, from, to) => from + (0, exports.linear)(time) * (to - from);
exports.lerp = lerp;
/** Create an elastic-in curve with reusable parameters. */
const createElasticIn = (options = {}) => {
    const { amplitude = 1, period = 0.3 } = options;
    elasticShift(amplitude, period);
    return (time) => (0, exports.elasticIn)(time, amplitude, period);
};
exports.createElasticIn = createElasticIn;
/** Create an elastic-out curve with reusable parameters. */
const createElasticOut = (options = {}) => {
    const { amplitude = 1, period = 0.3 } = options;
    elasticShift(amplitude, period);
    return (time) => (0, exports.elasticOut)(time, amplitude, period);
};
exports.createElasticOut = createElasticOut;
/** Create an elastic-in-out curve with reusable parameters. */
const createElasticInOut = (options = {}) => {
    const { amplitude = 1, period = 0.45 } = options;
    elasticShift(amplitude, period);
    return (time) => (0, exports.elasticInOut)(time, amplitude, period);
};
exports.createElasticInOut = createElasticInOut;
/** Create a curve that uses one easing function for each half. */
const combineInOut = (start, end) => (time) => (0, exports.inOut)(time, start, end);
exports.combineInOut = combineInOut;
/** Reverse an easing function in time and value. */
const reverse = (fn) => (time) => 1 - fn(1 - time);
exports.reverse = reverse;
/** Clamp an easing function's output to a range. */
const clamp = (fn, minimum = 0, maximum = 1) => {
    if (minimum > maximum) {
        throw new RangeError('Clamp minimum must be less than or equal to maximum');
    }
    return (time) => Math.min(maximum, Math.max(minimum, fn(time)));
};
exports.clamp = clamp;
/** Create an easing function equivalent to CSS cubic-bezier(). */
const cubicBezier = (x1, y1, x2, y2) => {
    if (![x1, y1, x2, y2].every(Number.isFinite)) {
        throw new RangeError('Cubic-bezier control points must be finite numbers');
    }
    if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
        throw new RangeError('Cubic-bezier x control points must be in the range [0, 1]');
    }
    if (x1 === y1 && x2 === y2) {
        return exports.linear;
    }
    const coefficientA = (first, second) => 1 - 3 * second + 3 * first;
    const coefficientB = (first, second) => 3 * second - 6 * first;
    const coefficientC = (first) => 3 * first;
    const sample = (time, first, second) => ((coefficientA(first, second) * time + coefficientB(first, second)) * time +
        coefficientC(first)) * time;
    const slope = (time, first, second) => 3 * coefficientA(first, second) * time * time +
        2 * coefficientB(first, second) * time +
        coefficientC(first);
    const solveTime = (x) => {
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
            }
            else {
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
exports.cubicBezier = cubicBezier;
/** Create a stepped easing curve. */
const steps = (count, position = 'end') => {
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
exports.steps = steps;
/** Create a normalized damped-spring easing curve. */
const spring = (options = {}) => {
    const { mass = 1, stiffness = 100, damping = 10, velocity = 0, duration = 1 } = options;
    if (![mass, stiffness, duration].every((value) => Number.isFinite(value) && value > 0)) {
        throw new RangeError('Spring mass, stiffness, and duration must be finite numbers greater than 0');
    }
    if (!Number.isFinite(damping) || damping < 0 || !Number.isFinite(velocity)) {
        throw new RangeError('Spring damping and velocity must be finite, with damping at least 0');
    }
    const angularFrequency = Math.sqrt(stiffness / mass);
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const displacement = (seconds) => {
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
    const response = (time) => 1 + displacement(time * duration);
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
exports.spring = spring;
