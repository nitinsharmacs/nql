const assert = require('assert');
const { Table } = require('../src/nqlLib.js');

describe('Table', () => {
  describe('insert', () => {
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

  describe('insertMany', () => {
    it('should insert multiple records', () => {
      const records = [
        { id: 1, name: 'john', age: 21 },
      ];
      const table = new Table({
        records: records
      });
      const record = [
        { name: 'hemant', age: 21 }, { name: 'rehan', age: 23 }
      ];
      const expected = [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 21 },
        { id: 3, name: 'rehan', age: 23 }
      ];
      assert.deepStrictEqual(table.insertMany(record), expected);
    });
  });

  describe('find [Eq]', () => {
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
      const query = { eq: { id: 2 } };
      assert.deepStrictEqual(table.find(query), expected);
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
      const query = { eq: { age: 21 } };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('find [Ne]', () => {
    it('should find all records not equal to the query', () => {
      const records = [
        { id: 1, name: 'john', age: 21 },
        { id: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table({
        records: records
      });
      const expected = [
        { id: 1, name: 'john', age: 21 },
      ];
      const query = { ne: { id: 2 } };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('find [Gt]', () => {
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
      const query = { gt: { age: 21 } };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('find [Ge]', () => {
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
      const query = { ge: { age: 21 } };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('find [Lt]', () => {
    it('should find records by less than', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'hemant', age: 22 },
      ];
      const table = new Table({
        records: records
      });
      let expected = [
        { id: 1, name: 'john', age: 11 },
      ];
      let query = { lt: { age: 21 } };
      assert.deepStrictEqual(table.find(query), expected);

      expected = [];
      query = { lt: { age: 11 } };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('find [Le]', () => {
    it('should find records by less than or equal to', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
        { id: 3, name: 'hemant', age: 22 },
      ];
      const table = new Table({
        records: records
      });
      let expected = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
      ];
      let query = { le: { age: 21 } };
      assert.deepStrictEqual(table.find(query), expected);

      expected = [{ id: 1, name: 'john', age: 11 }];
      query = { le: { age: 11 } };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('find [or]', () => {
    it('should find records by less than or greater than', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
        { id: 3, name: 'hemant', age: 22 },
        { id: 4, name: 'rehan', age: 23 },
      ];
      const table = new Table({
        records: records
      });
      let expected = [
        { id: 1, name: 'john', age: 11 },
        { id: 4, name: 'rehan', age: 23 },
      ];
      let query = { or: [{ lt: { age: 21 } }, { gt: { age: 22 } }] };
      assert.deepStrictEqual(table.find(query), expected);

      expected = [{ id: 1, name: 'john', age: 11 }];
      query = { or: [{ le: { age: 11 } }] };
      assert.deepStrictEqual(table.find(query), expected);
    });

    it('should find records by less than or not equal to', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
        { id: 3, name: 'hemant', age: 22 },
        { id: 4, name: 'rehan', age: 23 },
      ];
      const table = new Table({
        records: records
      });
      const expected = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
        { id: 4, name: 'rehan', age: 23 },
      ];
      const query = { or: [{ lt: { age: 21 } }, { ne: { age: 22 } }] };
      assert.deepStrictEqual(table.find(query), expected);
    });
  });

  describe('delete', () => {
    it('should delete the matched record from records', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
      ];
      const table = new Table({
        records: records
      });
      const expected = [
        { id: 2, name: 'john', age: 21 },
      ];
      const query = { eq: { id: 2 } };
      assert.deepStrictEqual(table.delete(query), expected);
      const newRecords = [
        { id: 1, name: 'john', age: 11 },
      ];
      assert.deepStrictEqual(table.find({}), newRecords);
    });

    it('should delete the matched records from records', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
        { id: 3, name: 'john', age: 23 },
      ];
      const table = new Table({
        records: records
      });
      const expected = [
        { id: 2, name: 'john', age: 21 },
        { id: 3, name: 'john', age: 23 },
      ];
      const query = { gt: { age: 20 } };
      assert.deepStrictEqual(table.delete(query), expected);

      const newRecords = [
        { id: 1, name: 'john', age: 11 },
      ];
      assert.deepStrictEqual(table.find({}), newRecords);
    });

    it('should delete nothing for no match', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 }
      ];
      const table = new Table({
        records: records
      });
      const expected = [];
      const query = { gt: { id: 20 } };
      assert.deepStrictEqual(table.delete(query), expected);

      assert.deepStrictEqual(table.find({}), records);
    });

    it('should delete all if no query given', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 }
      ];
      const table = new Table({
        records: records
      });
      const expected = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 }
      ];
      const query = {};
      assert.deepStrictEqual(table.delete(query), expected);

      assert.deepStrictEqual(table.find({}), []);
    });
  });

  describe('update', () => {
    it('should update single record', () => {
      const records = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 21 },
      ];
      const table = new Table({
        records: records
      });
      const expected = { id: 2, name: 'john', age: 23 };
      const query = { eq: { id: 2 } };
      const updates = { $set: { age: 23 } };
      assert.deepStrictEqual(table.update(query, updates), expected);
      const newRecords = [
        { id: 1, name: 'john', age: 11 },
        { id: 2, name: 'john', age: 23 },
      ];
      assert.deepStrictEqual(table.find({}), newRecords);
    });
  });
});
