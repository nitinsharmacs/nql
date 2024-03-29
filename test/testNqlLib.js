const assert = require('assert');
const { Table } = require('../src/nqlLib.js');

describe('Table', () => {
  describe('insert', () => {
    it('should insert one record into the empty table', () => {
      const records = [];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const record = { name: 'john', age: 21 };
      const expected = [
        { objectId: 1, name: 'john', age: 21 }
      ];
      assert.deepStrictEqual(table.insert(record), expected);
    });

    it('should insert one record into the table with some data', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const record = { name: 'hemant', age: 21 };
      const expected = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      assert.deepStrictEqual(table.insert(record), expected);
    });
  });

  describe('insertMany', () => {
    it('should insert multiple records', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const record = [
        { name: 'hemant', age: 21 }, { name: 'rehan', age: 23 }
      ];
      const expected = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
        { objectId: 3, name: 'rehan', age: 23 }
      ];
      assert.deepStrictEqual(table.insertMany(record), expected);
    });
  });

  describe('find', () => {
    it('should find the record by the id', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = { objectId: 2, name: 'hemant', age: 21 };
      const query = { $eq: { objectId: 2 } };
      assert.deepStrictEqual(table.find(query), expected);
    });

    it('should find nothing for no match', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = undefined;
      const query = { $eq: { objectId: 12 } };
      assert.strictEqual(table.find(query), expected);
    });
  });

  describe('findMany [Eq]', () => {
    it('should find the record by the id', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 2, name: 'hemant', age: 21 }
      ];
      const query = { $eq: { objectId: 2 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });

    it('should find multiple records', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 }
      ];
      const query = { $eq: { age: 21 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('findMany [Ne]', () => {
    it('should find all records $not equal to the query', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 1, name: 'john', age: 21 },
      ];
      const query = { $ne: { objectId: 2 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('findMany [Gt]', () => {
    it('should find records by greater than', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 22 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 2, name: 'hemant', age: 22 }
      ];
      const query = { $gt: { age: 21 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('findMany [Ge]', () => {
    it('should find records by greater than $or equal to', () => {
      const records = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 22 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 1, name: 'john', age: 21 },
        { objectId: 2, name: 'hemant', age: 22 }
      ];
      const query = { $ge: { age: 21 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('findMany [Lt]', () => {
    it('should find records by less than', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'hemant', age: 22 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      let expected = [
        { objectId: 1, name: 'john', age: 11 },
      ];
      let query = { $lt: { age: 21 } };
      assert.deepStrictEqual(table.findMany(query), expected);

      expected = [];
      query = { $lt: { age: 11 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('findMany [Le]', () => {
    it('should find records by less than $or equal to', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
        { objectId: 3, name: 'hemant', age: 22 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      let expected = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
      ];
      let query = { $le: { age: 21 } };
      assert.deepStrictEqual(table.findMany(query), expected);

      expected = [{ objectId: 1, name: 'john', age: 11 }];
      query = { $le: { age: 11 } };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('findMany [$or]', () => {
    it('should find records by less than $or greater than', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
        { objectId: 3, name: 'hemant', age: 22 },
        { objectId: 4, name: 'rehan', age: 23 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      let expected = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 4, name: 'rehan', age: 23 },
      ];
      let query = { $or: [{ $lt: { age: 21 } }, { $gt: { age: 22 } }] };
      assert.deepStrictEqual(table.findMany(query), expected);

      expected = [{ objectId: 1, name: 'john', age: 11 }];
      query = { $or: [{ $le: { age: 11 } }] };
      assert.deepStrictEqual(table.findMany(query), expected);
    });

    it('should find records by less than $or $not equal to', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
        { objectId: 3, name: 'hemant', age: 22 },
        { objectId: 4, name: 'rehan', age: 23 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
        { objectId: 4, name: 'rehan', age: 23 },
      ];
      const query = { $or: [{ $lt: { age: 21 } }, { $ne: { age: 22 } }] };
      assert.deepStrictEqual(table.findMany(query), expected);
    });
  });

  describe('delete', () => {
    it('should delete the matched record from records', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 2, name: 'john', age: 21 },
      ];
      const query = { $eq: { objectId: 2 } };
      assert.deepStrictEqual(table.delete(query), expected);
      const newRecords = [
        { objectId: 1, name: 'john', age: 11 },
      ];
      assert.deepStrictEqual(table.findMany({}), newRecords);
    });

    it('should delete the matched records from records', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
        { objectId: 3, name: 'john', age: 23 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 2, name: 'john', age: 21 },
        { objectId: 3, name: 'john', age: 23 },
      ];
      const query = { $gt: { age: 20 } };
      assert.deepStrictEqual(table.delete(query), expected);

      const newRecords = [
        { objectId: 1, name: 'john', age: 11 },
      ];
      assert.deepStrictEqual(table.findMany({}), newRecords);
    });

    it('should delete nothing for no match', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 }
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [];
      const query = { $gt: { objectId: 20 } };
      assert.deepStrictEqual(table.delete(query), expected);

      assert.deepStrictEqual(table.findMany({}), records);
    });

    it('should delete all if no query given', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 }
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 }
      ];
      const query = {};
      assert.deepStrictEqual(table.delete(query), expected);

      assert.deepStrictEqual(table.findMany({}), []);
    });
  });

  describe('update', () => {
    it('should update single record', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = {
        updateCount: 1,
        record: { objectId: 2, name: 'john', age: 23 }
      };
      const query = { $eq: { objectId: 2 } };
      const updates = { $set: { age: 23 } };
      assert.deepStrictEqual(table.update(query, updates), expected);
      const newRecords = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 23 },
      ];
      assert.deepStrictEqual(table.findMany({}), newRecords);
    });

    it('should update multiple records', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'john', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = {
        updateCount: 2,
        records: [
          { objectId: 1, name: 'john', age: 23 },
          { objectId: 2, name: 'john', age: 23 }
        ]
      };
      const query = { $ge: { objectId: 1 } };
      const updates = { $set: { age: 23 } };
      const options = { multi: true };

      assert.deepStrictEqual(table.update(query, updates, options), expected);
      const newRecords = [
        { objectId: 1, name: 'john', age: 23 },
        { objectId: 2, name: 'john', age: 23 },
      ];
      assert.deepStrictEqual(table.findMany({}), newRecords);
    });
  });

  describe('updateMany', () => {
    it('should update records', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = {
        updateCount: 2,
        records: [
          { objectId: 1, name: 'john', age: 23 },
          { objectId: 2, name: 'hemant', age: 23 },
        ]
      };
      const query = { $ge: { objectId: 1 } };
      const updates = { $set: { age: 23 } };

      assert.deepStrictEqual(table.updateMany(query, updates), expected);
      const newRecords = [
        { objectId: 1, name: 'john', age: 23 },
        { objectId: 2, name: 'hemant', age: 23 },
      ];
      assert.deepStrictEqual(table.findMany({}), newRecords);
    });

    it('should update all records if query is empty', () => {
      const records = [
        { objectId: 1, name: 'john', age: 11 },
        { objectId: 2, name: 'hemant', age: 21 },
      ];
      const table = new Table('./db/school.json', 'student', {
        records: records
      });
      const expected = {
        updateCount: 2,
        records: [
          { objectId: 1, name: 'john', age: 23 },
          { objectId: 2, name: 'hemant', age: 23 },
        ]
      };
      const query = {};
      const updates = { $set: { age: 23 } };

      assert.deepStrictEqual(table.updateMany(query, updates), expected);
      const newRecords = [
        { objectId: 1, name: 'john', age: 23 },
        { objectId: 2, name: 'hemant', age: 23 },
      ];
      assert.deepStrictEqual(table.findMany({}), newRecords);
    });
  });
});
