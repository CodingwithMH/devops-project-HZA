const { test } = require('node:test');
const assert = require('node:assert');
const { isSamePage } = require('../tools/samepage');

test('different titles are not the same page', () => {
  assert.strictEqual(isSamePage({ title: 'a' }, { title: 'b' }), false);
});
test('same titles are the same page', () => {
  assert.strictEqual(isSamePage({ title: 'a' }, { title: 'a' }), true);
});
test('a missing page is never the same', () => {
  assert.strictEqual(isSamePage(null, { title: 'a' }), false);
});
