const entries = Object.entries;

class Eq {
  constructor({ eq }) {
    this.operands = eq;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] === opValue;
    });
  }
}

class Ne {
  constructor({ ne }) {
    this.operands = ne;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] !== opValue;
    });
  }
}

class Gt {
  constructor({ gt }) {
    this.operands = gt;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] > opValue;
    });
  }
}

class Ge {
  constructor({ ge }) {
    this.operands = ge;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] >= opValue;
    });
  }
}

class Lt {
  constructor({ lt }) {
    this.operands = lt;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] < opValue;
    });
  }
}

class Le {
  constructor({ le }) {
    this.operands = le;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] <= opValue;
    });
  }
}

// operands: or: [ {lt:{}}, gt:{} ]
class Or {
  constructor({ or }) {
    this.operands = or;
  }
  match(record) {
    return this.operands.some(operand => {
      const operator = createOperator(operand);
      return operator.match(record);
    });
  }
}

const relationalOperator = (operatorName) => {
  const operators = {
    'eq': Eq,
    'ne': Ne,
    'gt': Gt,
    'ge': Ge,
    'lt': Lt,
    'le': Le,
  };
  return operators[operatorName];
};

const logicalOperator = (operatorName) => {
  const operators = {
    'or': Or,
  };
  return operators[operatorName];
};

const isLogialOperator = (operatorName) => {
  const logicalOperators = ['or', 'and', 'not'];
  return logicalOperators.includes(operatorName);
};

const isRelationalOperator = (operatorName) => {
  const relationalOperators = ['eq', 'ne', 'gt', 'ge', 'lt', 'le'];
  return relationalOperators.includes(operatorName);
};

const createOperator = (criteria) => {
  const [operatorName] = Object.keys(criteria);

  if (isLogialOperator(operatorName)) {
    const Operator = logicalOperator(operatorName);
    return new Operator(criteria);
  }

  if (isRelationalOperator(operatorName)) {
    const Operator = relationalOperator(operatorName);
    return new Operator(criteria);
  }

  throw {
    code: 'NOOPENT',
    message: 'operator not found',
    operator: operatorName
  };
};

exports.createOperator = createOperator;
