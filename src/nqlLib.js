const {
  Operators
} = require('./query.js');

const {
  Set
} = require('./update.js');

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
    const operators = new Operators();
    const operator = operators.getOperator(query);

    const record = this.records.find(record => operator.match(record));
    const set = new Set(updates);
    return set.update(record);
  }
}

exports.Table = Table;
