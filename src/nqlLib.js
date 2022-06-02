const {
  Operators
} = require('./queryOperators.js');

const {
  Update
} = require('./updatesOperators.js');

const newId = (tableEntries) => {
  const lastEntry = tableEntries[tableEntries.length - 1];
  if (lastEntry === undefined) {
    return 1;
  }

  return lastEntry.id + 1;
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const partition = (list, predicate) => {
  const matches = [];
  const rest = [];

  for (const listItem of list) {
    if (predicate(listItem)) {
      matches.push(listItem);
    } else {
      rest.push(listItem);
    }
  }

  return { matches, rest };
};

class Table {
  constructor({ records }) {
    this.records = records;
  }

  insert(record) {
    const id = newId(this.records);
    this.records.push({ id, ...record });
    return this.records;
  }

  insertMany(records) {
    records.forEach(record => this.insert(record));
    return this.records;
  }

  find(query) {
    let findPredicate = () => true;
    if (!isEmpty(query)) {
      const operators = new Operators();
      const operator = operators.getOperator(query);
      findPredicate = (record) => operator.match(record);
    }

    return this.records.find(findPredicate);
  }

  findMany(query) {
    if (isEmpty(query)) {
      return this.records;
    }

    const operators = new Operators();
    const operator = operators.getOperator(query);

    return this.records.filter(record => {
      return operator.match(record, operators);
    });
  }

  delete(query) {
    if (isEmpty(query)) {
      const deleted = this.records;
      this.records = [];
      return deleted;
    }

    const operators = new Operators();
    const operator = operators.getOperator(query);

    const deletionPredicate = (listItem) => operator.match(listItem);
    const { matches, rest } = partition(this.records, deletionPredicate);

    this.records = rest;
    return matches;
  }

  update(query, updates, options) {
    if (options && options.multi) {
      return this.updateMany(query, updates);
    }

    const record = this.find(query);
    if (record === undefined) {
      return { updateCount: 0, record: undefined };
    }

    const update = new Update(updates);
    const updater = update.getUpdater();

    return {
      updateCount: 1,
      record: updater.update(record)
    };
  }

  updateMany(query, updates) {
    const records = this.findMany(query);

    const update = new Update(updates);
    const updater = update.getUpdater();

    const modifiedRecords = records.map(record => {
      return updater.update(record);
    });

    return {
      updateCount: modifiedRecords.length,
      records: modifiedRecords
    };
  }
}

exports.Table = Table;
