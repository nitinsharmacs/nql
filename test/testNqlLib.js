const assert = require('assert');
const {
  insert,
  find } = require('../src/nqlLib.js');

describe('insert', () => {
  it('should insert one entry into the empty table', () => {
    const table = {
      entries: []
    };
    const entry = { name: 'john', age: 21 };
    const expected = {
      entries: [
        { id: 1, name: 'john', age: 21 }
      ]
    };
    assert.deepStrictEqual(insert(table, entry), expected);
  });

  it('should insert one entry into the table with some data', () => {
    const table = {
      entries: [
        { id: 1, name: 'john', age: 21 },
      ]
    };
    const entry = { name: 'hemant', age: 21 };
    const expected = {
      entries: [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 21 },
      ]
    };
    assert.deepStrictEqual(insert(table, entry), expected);
  });
});

describe('find', () => {
  it('should find the record by the id', () => {
    const table = {
      entries: [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 21 },
      ]
    };
    const expected = [
      { id: 2, name: 'hemant', age: 21 }
    ];
    const criteria = { id: 2 };
    assert.deepStrictEqual(find(table, criteria), expected);
  });

  it('should find multiple records', () => {
    const table = {
      entries: [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 21 },
      ]
    };
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 }
    ];
    const criteria = { age: 21 };
    assert.deepStrictEqual(find(table, criteria), expected);
  });

  it('should find records by greater than', () => {
    const table = {
      entries: [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 22 },
      ]
    };
    const expected = [
      { id: 2, name: 'hemant', age: 22 }
    ];
    const criteria = { gt: { age: 21 } };
    assert.deepStrictEqual(find(table, criteria), expected);
  });

  it('should find records by greater than or equal to', () => {
    const table = {
      entries: [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 22 },
      ]
    };
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 }
    ];
    const criteria = { ge: { age: 21 } };
    assert.deepStrictEqual(find(table, criteria), expected);
  });
});
