const assert = require('assert');
const {
  Set,
  Inc,
  Dec,
  Updater,
  getUpdater
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

describe('Inc', () => {
  it('should increment data set in record', () => {
    const record = { age: 22 };
    const expected = { age: 23 };

    const updates = { $inc: { age: 1 } };
    const set = new Inc(updates);

    assert.deepStrictEqual(set.update(record), expected);
  });

  it('should increment multiple data sets in record', () => {
    const record = { age: 22, marks: 12 };
    const expected = { age: 23, marks: 14 };

    const updates = { $inc: { age: 1, marks: 2 } };
    const set = new Inc(updates);

    assert.deepStrictEqual(set.update(record), expected);
  });
});

describe('Dec', () => {
  it('should decrement data set in record', () => {
    const record = { age: 22 };
    const expected = { age: 21 };

    const updates = { $dec: { age: 1 } };
    const set = new Dec(updates);

    assert.deepStrictEqual(set.update(record), expected);
  });

  it('should decrement multiple data sets in record', () => {
    const record = { age: 22, marks: 12 };
    const expected = { age: 21, marks: 10 };

    const updates = { $dec: { age: 1, marks: 2 } };
    const set = new Dec(updates);

    assert.deepStrictEqual(set.update(record), expected);
  });
});

describe('Updater', () => {
  describe('update', () => {
    it('should update the record by given update operators', () => {
      const record = { age: 22 };
      const expected = { age: 21, country: 'India' };

      const decUpdate = { $dec: { age: 1 } };
      const setUpdate = { $set: { country: 'India' } };

      const operators = [];
      operators.push(new Dec(decUpdate));
      operators.push(new Set(setUpdate));
      const updater = new Updater(operators);

      assert.deepStrictEqual(updater.update(record), expected);
    });
  });
});

describe('getUpdater', () => {
  it('should give updater for given updates query', () => {
    const record = { age: 22 };
    const expected = { age: 21, country: 'India' };

    const updates = { $dec: { age: 1 }, $set: { country: 'India' } };
    const updater = getUpdater(updates);

    assert.deepStrictEqual(updater.update(record), expected);
  });
});
