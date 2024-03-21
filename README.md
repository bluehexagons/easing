# @bluehexagons/easing

A simple easing library.

All functions expect a time constraint of \[0-1\].

Code heavily-adapted from https://github.com/jimjeffers/Easie
which is itself adapted from http://robertpenner.com/easing

MIT license.

## Usage
```js
import { lerp } from "@bluehexagons/easing";

const time = 0.5;
const start = 0;
const end = 100;

console.log(lerp(time, start, end));
```

## Contributing

Pull requests are welcome.

## TypeScript

`src/main.d.ts` contains typings.

To build TypeScript definitions for development, run `npm run build`
