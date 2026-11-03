const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isDuplicate } = require('../tools/duplicates');

test('different page titles are not duplicates', () => {
  assert.equal(isDuplicate({ title: 'a' }, { title: 'b' }), false);
});

test('matching page titles are duplicates', () => {
  assert.equal(isDuplicate({ title: 'a' }, { title: 'a' }), true);
});
