const assert = require('assert');
const {
  Set
} = require('../src/updatesOperators.js');

describe('Set', () => {
  it('should set single update into the record', () => {
    const record = { age: 21 };
    const expected = { age: 23 };
    const updates = { $set: { age: 23 } };
    const set = new Set(updates);
    assert.deepStrictEqual(set.update(record), expected);
  });

  it('should set multiple updates into the record', () => {
    const record = { age: 21 };
    const expected = { age: 23, name: 'nitin' };
    const updates = { $set: { age: 23, name: 'nitin' } };
    const set = new Set(updates);
    assert.deepStrictEqual(set.update(record), expected);
  });
});
