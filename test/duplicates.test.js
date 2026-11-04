const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isDuplicate } = require('../tools/duplicates');

test('different page titles are not duplicates', { skip: true }, () => {
  assert.equal(isDuplicate({ title: 'a' }, { title: 'b' }), false);
});

test('matching page titles are duplicates', () => {
  assert.equal(isDuplicate({ title: 'a' }, { title: 'a' }), true);
});

test('missing first page is not a duplicate', () => {
  assert.equal(isDuplicate(null, { title: 'a' }), false);
});

test('missing second page is not a duplicate', () => {
  assert.equal(isDuplicate({ title: 'a' }, null), false);
});
