import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const version = packageJson.version;
const remote = process.env.EASING_RELEASE_REMOTE || 'origin';
const tagName = `v${version}`;
const releaseNotes = `Release @bluehexagons/easing ${tagName}.`;

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (options.allowFailure) {
    return result;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }

  return result;
};

const requireCleanWorktree = () => {
  const status = run('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
    capture: true,
  });
  if (status.stdout.trim() !== '') {
    throw new Error('Release tagging requires a completely clean git worktree');
  }
};

const requirePublishedMainHead = () => {
  const branch = run('git', ['branch', '--show-current'], { capture: true }).stdout.trim();
  if (branch !== 'main') {
    throw new Error(`Release tagging must run from main, got ${branch || 'detached HEAD'}`);
  }
  const localHead = run('git', ['rev-parse', 'HEAD'], { capture: true }).stdout.trim();
  const remoteHead = run('git', ['ls-remote', '--heads', remote, 'refs/heads/main'], {
    capture: true,
  })
    .stdout.trim()
    .split(/\s+/u)[0];
  if (remoteHead !== localHead) {
    throw new Error(`Push the release commit to ${remote}/main before tagging`);
  }
};

const localTagExists = (tag) =>
  run('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`], { allowFailure: true })
    .status === 0;

const remoteTagExists = (tag) =>
  run('git', ['ls-remote', '--exit-code', '--tags', remote, `refs/tags/${tag}`], {
    allowFailure: true,
    capture: true,
  }).status === 0;

const releaseExists = (tag) =>
  run('gh', ['release', 'view', tag], {
    allowFailure: true,
    capture: true,
  }).status === 0;

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`Package version must be semver x.y.z for release tagging, got ${version}`);
}

requireCleanWorktree();
requirePublishedMainHead();

run('gh', ['--version'], { capture: true });

if (localTagExists(tagName)) {
  throw new Error(`Release tag ${tagName} already exists locally`);
}

if (remoteTagExists(tagName)) {
  throw new Error(`Release tag ${tagName} already exists on ${remote}`);
}

if (releaseExists(tagName)) {
  throw new Error(`GitHub Release ${tagName} already exists`);
}

run('npm', ['run', 'check']);
run('npm', ['pack', '--dry-run']);
requireCleanWorktree();
requirePublishedMainHead();
run('git', ['tag', '-a', tagName, '-m', `Easing ${tagName}`]);
run('git', ['push', remote, `refs/tags/${tagName}`]);
run('gh', [
  'release',
  'create',
  tagName,
  '--verify-tag',
  '--title',
  tagName,
  '--notes',
  releaseNotes,
]);
