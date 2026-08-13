import {
  combineInOut,
  createElasticInOut,
  cubicBezier,
  quadIn,
  quadOut,
  spring,
  steps,
  type EasingFunction
} from '@bluehexagons/easing';
import { easings, type EasingName } from '@bluehexagons/easing/named';

const curves: EasingFunction[] = [
  combineInOut(quadIn, quadOut),
  createElasticInOut({ amplitude: 1.5 }),
  cubicBezier(0.25, 0.1, 0.25, 1),
  spring(),
  steps(4)
];
const name: EasingName = 'quadInOut';

curves.push(easings[name]);
