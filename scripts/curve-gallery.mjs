import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { easings } from '../dist/named.js';

const columns = 4;
const panelWidth = 220;
const panelHeight = 130;
const paddingX = 22;
const paddingTop = 30;
const plotWidth = panelWidth - paddingX * 2;
const plotHeight = 80;
const rows = Math.ceil(Object.keys(easings).length / columns);
const width = panelWidth * columns;
const height = panelHeight * rows;

const paths = Object.entries(easings).map(([name, easing], index) => {
  const column = index % columns;
  const row = Math.floor(index / columns);
  const left = column * panelWidth;
  const top = row * panelHeight;
  const points = [];
  for (let sample = 0; sample <= 80; sample += 1) {
    const time = sample / 80;
    const value = easing(time);
    const x = left + paddingX + time * plotWidth;
    const y = top + paddingTop + (1.2 - value) * (plotHeight / 1.4);
    points.push(`${sample === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  const startY = top + paddingTop + 1.2 * (plotHeight / 1.4);
  const endY = top + paddingTop + 0.2 * (plotHeight / 1.4);
  return `
    <g>
      <text x="${left + paddingX}" y="${top + 19}" fill="#344054" font-family="ui-monospace, monospace" font-size="13" font-weight="600">${name}</text>
      <path fill="none" stroke="#98a2b3" stroke-dasharray="3 4" stroke-width=".7" d="M${left + paddingX} ${startY.toFixed(2)}H${left + panelWidth - paddingX} M${left + paddingX} ${endY.toFixed(2)}H${left + panelWidth - paddingX}"/>
      <path fill="none" stroke="#7f56d9" stroke-linecap="round" stroke-width="2.2" d="${points.join(' ')}"/>
    </g>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">Easing curve gallery</title>
  <desc id="description">Graphs of every named easing function in the package.</desc>
${paths}
</svg>
`;

const outputUrl = new URL('../docs/curves.svg', import.meta.url);
if (process.argv.includes('--check')) {
  if (readFileSync(outputUrl, 'utf8') !== svg) {
    throw new Error('Curve gallery is stale; run npm run docs:curves');
  }
} else {
  mkdirSync(new URL('../docs', import.meta.url), { recursive: true });
  writeFileSync(outputUrl, svg);
}
