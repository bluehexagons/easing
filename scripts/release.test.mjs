import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'easing-release-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const repo = path.join(root, 'source');
  mkdirSync(path.join(repo, 'scripts'), { recursive: true });
  copyFileSync(new URL('./release.mjs', import.meta.url), path.join(repo, 'scripts/release.mjs'));
  writeFileSync(path.join(repo, 'package.json'), '{"version":"1.0.0"}\n');
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd: repo, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  git('init', '-b', 'main');
  git('add', '.');
  git(
    '-c',
    'user.name=Release Test',
    '-c',
    'user.email=test@example.invalid',
    'commit',
    '-m',
    'Fixture',
  );
  const remote = path.join(root, 'remote.git');
  git('init', '--bare', remote);
  git('remote', 'add', 'origin', remote);
  git('push', 'origin', 'main');
  const release = () =>
    spawnSync(process.execPath, ['scripts/release.mjs'], {
      cwd: repo,
      encoding: 'utf8',
      env: { ...process.env, EASING_RELEASE_REMOTE: 'origin' },
    });
  return { repo, git, release };
}

test('release refuses an unpublished main commit before publishing', (t) => {
  const { git, release } = fixture(t);
  git(
    '-c',
    'user.name=Release Test',
    '-c',
    'user.email=test@example.invalid',
    'commit',
    '--allow-empty',
    '-m',
    'Unpublished',
  );
  const result = release();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Push the release commit to origin\/main before tagging/);
  assert.equal(git('tag', '--list'), '');
});

for (const detached of [false, true]) {
  test(`release refuses ${detached ? 'detached HEAD' : 'another branch'}`, (t) => {
    const { git, release } = fixture(t);
    git('checkout', ...(detached ? ['--detach'] : ['-b', 'other']));
    const result = release();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Release tagging must run from main/);
    assert.equal(git('tag', '--list'), '');
  });
}

test('release refuses untracked package inputs', (t) => {
  const { repo, git, release } = fixture(t);
  writeFileSync(path.join(repo, 'untracked.txt'), 'not in the release commit');
  const result = release();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /completely clean git worktree/);
  assert.equal(git('tag', '--list'), '');
});
