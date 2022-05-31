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
      return operator.match(record);
    });
  }
}

exports.Table = Table;
