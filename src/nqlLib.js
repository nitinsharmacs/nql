const entries = Object.entries;

const newId = (tableEntries) => {
  const lastEntry = tableEntries[tableEntries.length - 1];
  if (lastEntry === undefined) {
    return 1;
  }
  return lastEntry.id + 1;
};

const insert = (records, newRecord) => {
  const id = newId(records);
  records.push({ id, ...newRecord });
  return records;
};

class Eq {
  constructor({ eq }) {
    this.criteria = eq;
  }

  match(record) {
    return entries(this.criteria).every(([opKey, opValue]) => {
      return record[opKey] === opValue;
    });
  }
}

class Gt {
  constructor({ gt }) {
    this.criteria = gt;
  }

  match(record) {
    return entries(this.criteria).every(([opKey, opValue]) => {
      return record[opKey] > opValue;
    });
  }
}

class Ge {
  constructor({ ge }) {
    this.criteria = ge;
  }

  match(record) {
    return entries(this.criteria).every(([opKey, opValue]) => {
      return record[opKey] >= opValue;
    });
  }
}

const createOperator = (criteria) => {
  const [operatorName] = Object.keys(criteria);
  if (operatorName === 'eq') {
    return new Eq(criteria);
  }

  if (operatorName === 'gt') {
    return new Gt(criteria);
  }

  if (operatorName === 'ge') {
    return new Ge(criteria);
  }

  throw {
    code: 'NOOPENT',
    message: 'operator not found'
  };
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const find = (records, criteria) => {
  if (isEmpty(criteria)) {
    return records;
  }
  const operator = createOperator(criteria);
  return records.filter(entry => {
    return operator.match(entry);
  });
};

class Table {
  constructor({ entries }) {
    this.entries = entries;
  }
  insert(entry) {
    return insert(this.entries, entry);
  }
  find(criteria) {
    return find(this.entries, criteria);
  }
}

exports.insert = insert;
exports.find = find;
exports.Table = Table;
