const entries = Object.entries;

class Eq {
  constructor({ eq }) {
    this.name = 'eq';
    this.operands = eq;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] === opValue;
    });
  }

  is(operator) {
    return operator === this.name;
  }
}

class Ne {
  constructor({ ne }) {
    this.name = 'ne';
    this.operands = ne;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] !== opValue;
    });
  }

  is(operator) {
    return operator === this.name;
  }
}

class Gt {
  constructor({ gt }) {
    this.name = 'gt';
    this.operands = gt;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] > opValue;
    });
  }

  is(operator) {
    return operator === this.name;
  }
}

class Ge {
  constructor({ ge }) {
    this.name = 'ge';
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
    this.name = 'lt';
    this.operands = lt;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] < opValue;
    });
  }

  is(operator) {
    return operator === this.name;
  }
}

class Le {
  constructor({ le }) {
    this.name = 'le';
    this.operands = le;
  }

  match(record) {
    return entries(this.operands).every(([opKey, opValue]) => {
      return record[opKey] <= opValue;
    });
  }

  is(operator) {
    return operator === this.name;
  }
}

class Or {
  constructor({ or }) {
    this.name = 'or';
    this.operands = or;
  }
  match(record) {
    return this.operands.some(operand => {
      const operators = new Operators();
      const operator = operators.getOperator(operand);
      return operator.match(record);
    });
  }

  is(operator) {
    return operator === this.name;
  }
}

class Operators {
  constructor() {
    this.operators = {
      'eq': Eq,
      'ne': Ne,
      'gt': Gt,
      'ge': Ge,
      'lt': Lt,
      'le': Le,
      'or': Or
    };
  }

  getOperator(criteria) {
    const [operatorName] = Object.keys(criteria);
    const Operator = this.operators[operatorName];
    if (Operator) {
      return new Operator(criteria);
    }
    throw {
      code: 'NOOPENT',
      message: 'operator not found',
      operator: operatorName
    };
  }
}

exports.Eq = Eq;
exports.Ne = Ne;
exports.Gt = Gt;
exports.Ge = Ge;
exports.Lt = Lt;
exports.Le = Le;
exports.Operators = Operators;
