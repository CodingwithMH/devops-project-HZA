// test/render.test.js — unit tests that load tools/build.js directly.
const { test } = require('node:test');
const assert = require('node:assert');
const { renderPage, makeTitle, main } = require('../tools/build');

test('a heading becomes an h1', () => {
  assert.match(renderPage('# Hello', 'x'), /<h1>Hello<\/h1>/);
});

test('the title is the one we pass in', () => {
  assert.match(renderPage('text', 'notes'), /<title>notes<\/title>/);
});

test('file names become pretty titles', () => {
  assert.strictEqual(makeTitle('src/my-page.md'), 'My Page');
});

test('missing arguments give the usage exit code', () => {
  assert.strictEqual(main([]), 2);
});

test('main writes the page it was asked for', () => {
  const os = require('os');
  const fs = require('fs');
  const path = require('path');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-'));
  const src = path.join(dir, 'hello-world.md');
  fs.writeFileSync(src, '# Hi');
  assert.strictEqual(main([src, path.join(dir, 'out', 'hello.html')]), 0);
  assert.match(fs.readFileSync(path.join(dir, 'out', 'hello.html'), 'utf8'),
    /<title>Hello World<\/title>/);
});

