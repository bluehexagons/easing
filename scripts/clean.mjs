import { rmSync } from 'node:fs';

const target = process.argv[2];
if (target !== 'all' && target !== 'cjs') {
  throw new Error("Build clean target must be either 'all' or 'cjs'");
}

if (target === 'all') {
  rmSync(new URL('../dist', import.meta.url), { force: true, recursive: true });
}
rmSync(new URL('../cjs', import.meta.url), { force: true, recursive: true });
