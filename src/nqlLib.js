const entries = Object.entries;

const newId = (tableEntries) => {
  const lastEntry = tableEntries[tableEntries.length - 1];
  if (lastEntry === undefined) {
    return 1;
  }
  return lastEntry.id + 1;
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

class Lt {
  constructor({ lt }) {
    this.criteria = lt;
  }

  match(record) {
    return entries(this.criteria).every(([opKey, opValue]) => {
      return record[opKey] < opValue;
    });
  }
}

class Le {
  constructor({ le }) {
    this.criteria = le;
  }

  match(record) {
    return entries(this.criteria).every(([opKey, opValue]) => {
      return record[opKey] <= opValue;
    });
  }
}

const createOperator = (criteria) => {
  const [operatorName] = Object.keys(criteria);
  const operators = {
    'eq': Eq,
    'gt': Gt,
    'ge': Ge,
    'lt': Lt,
    'le': Le,
  };

  const Operator = operators[operatorName];
  if (Operator !== undefined) {
    return new Operator(criteria);
  }

  throw {
    code: 'NOOPENT',
    message: 'operator not found',
    operator: operatorName
  };
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
    const operator = createOperator(criteria);
    return this.records.filter(record => {
      return operator.match(record);
    });
  }
}

exports.Table = Table;
