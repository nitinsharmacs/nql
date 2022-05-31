const {
  Operators
} = require('./operators.js');

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

  find(criteria) {
    if (isEmpty(criteria)) {
      return this.records;
    }
    const operators = new Operators();
    const operator = operators.getOperator(criteria);
    return this.records.filter(record => {
      return operator.match(record, operators);
    });
  }

  delete(criteria) {
    if (isEmpty(criteria)) {
      const deleted = this.records;
      this.records = [];
      return deleted;
    }

    const operators = new Operators();
    const operator = operators.getOperator(criteria);

    const deletionPredicate = (listItem) => operator.match(listItem);
    const { matches, rest } = partition(this.records, deletionPredicate);

    this.records = rest;
    return matches;
  }
}

exports.Table = Table;
