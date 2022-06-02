const entries = Object.entries;

class Set {
  constructor({ $set }) {
    this.updates = $set;
  }

  update(record) {
    entries(this.updates).forEach(([key, value]) => {
      record[key] = value;
    });
    return record;
  }
}

class Inc {
  constructor({ $inc }) {
    this.inc = $inc;
  }

  update(record) {
    entries(this.inc).forEach(([key, value]) => {
      record[key] = record[key] + value;
    });
    return record;
  }
}

class Dec {
  constructor({ $dec }) {
    this.dec = $dec;
  }

  update(record) {
    entries(this.dec).forEach(([key, value]) => {
      record[key] = record[key] - value;
    });
    return record;
  }
}

class Updater {
  constructor(operators) {
    this.operators = operators;
  }

  update(record) {
    this.operators.forEach(operator => {
      operator.update(record);
    });
    return record;
  }
}

const getUpdater = (updates) => {
  const updateOperators = {
    '$set': Set,
    '$inc': Inc,
    '$dec': Dec
  };
  const operators = Object.keys(updates).map(operatorName => {
    const Operator = updateOperators[operatorName];
    const operator = new Operator(updates);
    return operator;
  });
  return new Updater(operators);
};

exports.Set = Set;
exports.Inc = Inc;
exports.Dec = Dec;
exports.Updater = Updater;
exports.getUpdater = getUpdater;
