const assert = require('assert');
const { Table } = require('../src/nqlLib.js');

describe('table insert', () => {
  it('should insert one record into the empty table', () => {
    const records = [];
    const table = new Table({
      records: records
    });
    const record = { name: 'john', age: 21 };
    const expected = [
      { id: 1, name: 'john', age: 21 }
    ];
    assert.deepStrictEqual(table.insert(record), expected);
  });

  it('should insert one record into the table with some data', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
    ];
    const table = new Table({
      records: records
    });
    const record = { name: 'hemant', age: 21 };
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 },
    ];
    assert.deepStrictEqual(table.insert(record), expected);
  });
});

describe('find', () => {
  it('should find the record by the id', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 },
    ];
    const table = new Table({
      records: records
    });
    const expected = [
      { id: 2, name: 'hemant', age: 21 }
    ];
    const criteria = { eq: { id: 2 } };
    assert.deepStrictEqual(table.find(criteria), expected);
  });

  it('should find multiple records', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 },
    ];
    const table = new Table({
      records: records
    });
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 21 }
    ];
    const criteria = { eq: { age: 21 } };
    assert.deepStrictEqual(table.find(criteria), expected);
  });

  it('should find records by greater than', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 },
    ];
    const table = new Table({
      records: records
    });
    const expected = [
      { id: 2, name: 'hemant', age: 22 }
    ];
    const criteria = { gt: { age: 21 } };
    assert.deepStrictEqual(table.find(criteria), expected);
  });

  it('should find records by greater than or equal to', () => {
    const records = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 },
    ];
    const table = new Table({
      records: records
    });
    const expected = [
      { id: 1, name: 'john', age: 21 },
      { id: 2, name: 'hemant', age: 22 }
    ];
    const criteria = { ge: { age: 21 } };
    assert.deepStrictEqual(table.find(criteria), expected);
  });

});
