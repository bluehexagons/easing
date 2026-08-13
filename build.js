import { rmSync, writeFileSync } from 'node:fs';

// Mark the secondary build as CommonJS without duplicating the TypeScript sources.
try {
  rmSync(new URL('./cjs/main.cjs', import.meta.url), { force: true });
  writeFileSync(new URL('./cjs/package.json', import.meta.url), '{"type":"commonjs"}\n');
} catch (error) {
  throw new Error('Failed to mark the CommonJS build', { cause: error });
}
