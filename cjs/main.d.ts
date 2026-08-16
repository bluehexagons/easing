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
export declare const backIn: (time: number, overshoot?: number) => number;
export declare const backOut: (time: number, overshoot?: number) => number;
export declare const backInOut: (time: number, overshoot?: number) => number;
export declare const bounceOut: (time: number) => number;
export declare const bounceIn: (time: number) => number;
export declare const bounceInOut: (time: number) => number;
export declare const circIn: (time: number) => number;
export declare const circOut: (time: number) => number;
export declare const circInOut: (time: number) => number;
export declare const cubicIn: (time: number) => number;
export declare const cubicOut: (time: number) => number;
export declare const cubicInOut: (time: number) => number;
export declare const elasticOut: (time: number, amplitude?: number, period?: number) => number;
export declare const elasticIn: (time: number, amplitude?: number, period?: number) => number;
export declare const elasticInOut: (time: number, amplitude?: number, period?: number) => number;
export declare const expoIn: (time: number) => number;
export declare const expoOut: (time: number) => number;
export declare const expoInOut: (time: number) => number;
export declare const linear: (time: number) => number;
/** Smooth interpolation with zero velocity at both endpoints. */
export declare const smoothstep: (time: number) => number;
/** Smooth interpolation with zero velocity and acceleration at both endpoints. */
export declare const smootherstep: (time: number) => number;
/** Create a cubic Hermite curve from 0 to 1 with configurable endpoint slopes. */
export declare const hermite: (options?: HermiteOptions) => EasingFunction;
export declare const quadIn: (time: number) => number;
export declare const quadOut: (time: number) => number;
export declare const quadInOut: (time: number) => number;
export declare const quartIn: (time: number) => number;
export declare const quartOut: (time: number) => number;
export declare const quartInOut: (time: number) => number;
export declare const quintIn: (time: number) => number;
export declare const quintOut: (time: number) => number;
export declare const quintInOut: (time: number) => number;
export declare const sineIn: (time: number) => number;
export declare const sineOut: (time: number) => number;
export declare const sineInOut: (time: number) => number;
/**
 * Helper function to use different easing functions above and below 0.5
 */
export declare const inOut: (time: number, start: EasingFunction, end: EasingFunction) => number;
/**
 * Helper function to ease with a function between two values.
 */
export declare const ease: (fn: EasingFunction, time: number, from: number, to: number) => number;
/**
 * Convenience function to linearly interpolate between two values at a given time.
 */
export declare const lerp: (time: number, from: number, to: number) => number;
/** Create a piecewise-linear curve from normalized time/value points. */
export declare const piecewiseLinear: (points: readonly CurvePoint[]) => EasingFunction;
/**
 * Create a shape-preserving cubic spline from normalized points.
 * Values must be non-decreasing so the resulting curve cannot overshoot them.
 */
export declare const monotoneSpline: (points: readonly CurvePoint[]) => EasingFunction;
/**
 * Create an inverse lookup for a continuous, strictly monotonic curve.
 * The returned function accepts a curve value and returns its normalized time.
 */
export declare const invert: (fn: EasingFunction, options?: InvertOptions) => EasingFunction;
/** Create an elastic-in curve with reusable parameters. */
export declare const createElasticIn: (options?: ElasticOptions) => EasingFunction;
/** Create an elastic-out curve with reusable parameters. */
export declare const createElasticOut: (options?: ElasticOptions) => EasingFunction;
/** Create an elastic-in-out curve with reusable parameters. */
export declare const createElasticInOut: (options?: ElasticOptions) => EasingFunction;
/** Create a curve that uses one easing function for each half. */
export declare const combineInOut: (start: EasingFunction, end: EasingFunction) => EasingFunction;
/** Reverse an easing function in time and value. */
export declare const reverse: (fn: EasingFunction) => EasingFunction;
/** Clamp an easing function's output to a range. */
export declare const clamp: (fn: EasingFunction, minimum?: number, maximum?: number) => EasingFunction;
/** Compose two curves, applying the inner curve before the outer curve. */
export declare const compose: (outer: EasingFunction, inner: EasingFunction) => EasingFunction;
/** Blend two curves, where weight 0 selects the first and weight 1 the second. */
export declare const mix: (first: EasingFunction, second: EasingFunction, weight?: number) => EasingFunction;
/** Repeat a curve for a fixed number of cycles. */
export declare const repeat: (fn: EasingFunction, count: number) => EasingFunction;
/** Repeat a curve while reversing its direction on alternating cycles. */
export declare const alternate: (fn: EasingFunction, count: number) => EasingFunction;
/** Create an easing function equivalent to CSS cubic-bezier(). */
export declare const cubicBezier: (x1: number, y1: number, x2: number, y2: number) => EasingFunction;
/** Create a stepped easing curve. */
export declare const steps: (count: number, position?: StepPosition) => EasingFunction;
/** Create a normalized damped-spring easing curve. */
export declare const spring: (options?: SpringOptions) => EasingFunction;
