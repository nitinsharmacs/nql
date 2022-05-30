const assert = require('assert');
const {
  insert,
  find } = require('../src/nqlLib.js');

describe('insert', () => {
  it('should insert one record into the empty table', () => {
    const records = [];
    const record = { name: 'john', age: 21 };
    const expected = [
      { id: 1, name: 'john', age: 21 }
    ];
    assert.deepStrictEqual(insert(records, record), expected);
  });

  it('should insert one record into the table with some data', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
    ];
    const record = { name: 'hemant', age: 21 };
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 },
    ];
    assert.deepStrictEqual(insert(records, record), expected);
  });
});

describe('find', () => {
  it('should find the record by the id', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 },
    ];
    const expected = [
      { id: 2, name: 'hemant', age: 21 }
    ];
    const criteria = { eq: { id: 2 } };
    assert.deepStrictEqual(find(records, criteria), expected);
  });

  it('should find multiple records', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 },
    ];
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 }
    ];
    const criteria = { eq: { age: 21 } };
    assert.deepStrictEqual(find(records, criteria), expected);
  });

  it('should find records by greater than', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 },
    ];
    const expected = [
      { id: 2, name: 'hemant', age: 22 }
    ];
    const criteria = { gt: { age: 21 } };
    assert.deepStrictEqual(find(records, criteria), expected);
  });

  it('should find records by greater than or equal to', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 },
    ];
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 }
    ];
    const criteria = { ge: { age: 21 } };
    assert.deepStrictEqual(find(records, criteria), expected);
  });

});
