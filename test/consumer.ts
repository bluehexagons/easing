import {
  alternate,
  combineInOut,
  compose,
  createElasticInOut,
  cubicBezier,
  hermite,
  invert,
  mix,
  monotoneSpline,
  piecewiseLinear,
  quadIn,
  quadOut,
  repeat,
  spring,
  steps,
  smoothstep,
  smootherstep,
  type EasingFunction,
} from '@bluehexagons/easing';
import { easings, type EasingName } from '@bluehexagons/easing/named';

const curves: EasingFunction[] = [
  combineInOut(quadIn, quadOut),
  createElasticInOut({ amplitude: 1.5 }),
  cubicBezier(0.25, 0.1, 0.25, 1),
  spring(),
  steps(4),
  hermite(),
  piecewiseLinear([
    [0, 0],
    [1, 1],
  ] as const),
  piecewiseLinear([
    { at: 0, value: 0 },
    { at: 1, value: 1 },
  ]),
  monotoneSpline([
    [0, 0],
    [1, 1],
  ] as const),
  invert(quadIn),
  compose(quadIn, quadOut),
  mix(quadIn, quadOut),
  repeat(quadIn, 2),
  alternate(quadIn, 2),
  smoothstep,
  smootherstep,
];
const name: EasingName = 'quadInOut';

curves.push(easings[name]);
