const assert = require('assert');
const {
  Eq,
  Ne,
  Gt,
  Ge,
  Lt,
  Le,
  Or,
  And,
  Not,
  Operators
} = require('../src/query.js');

describe('Eq', () => {
  it('should match record by equality', () => {
    const record = { age: 22 };
    let eq = new Eq({ eq: { age: 22 } });
    assert.ok(eq.match(record));

    eq = new Eq({ eq: { age: 21 } });
    assert.strictEqual(eq.match(record), false);
  });
});

describe('Ne', () => {
  it('should match record by non-equality', () => {
    const record = { age: 22 };
    let ne = new Ne({ ne: { age: 21 } });
    assert.ok(ne.match(record));

    ne = new Ne({ ne: { age: 22 } });
    assert.strictEqual(ne.match(record), false);
  });
});

describe('Gt', () => {
  it('should match record Greater than', () => {
    const record = { age: 22 };
    let gt = new Gt({ gt: { age: 21 } });
    assert.ok(gt.match(record));

    gt = new Gt({ gt: { age: 23 } });
    assert.strictEqual(gt.match(record), false);
  });
});

describe('Ge', () => {
  it('should match record Greater than or equal to', () => {
    const record = { age: 22 };
    let ge = new Ge({ ge: { age: 22 } });
    assert.ok(ge.match(record));

    ge = new Ge({ ge: { age: 21 } });
    assert.ok(ge.match(record));

    ge = new Ge({ ge: { age: 23 } });
    assert.strictEqual(ge.match(record), false);
  });
});

describe('Lt', () => {
  it('should match record Less than', () => {
    const record = { age: 21 };
    let lt = new Lt({ lt: { age: 22 } });
    assert.ok(lt.match(record));

    lt = new Lt({ lt: { age: 20 } });
    assert.strictEqual(lt.match(record), false);
  });
});

describe('Le', () => {
  it('should match record Less than or equal to', () => {
    const record = { age: 21 };
    let le = new Le({ le: { age: 21 } });
    assert.ok(le.match(record));

    le = new Le({ le: { age: 23 } });
    assert.ok(le.match(record));

    le = new Le({ le: { age: 20 } });
    assert.strictEqual(le.match(record), false);
  });
});

describe('Or', () => {
  it('should match record by or operator having two operands', () => {
    const record = { age: 25 };
    const operators = new Operators();
    let or = new Or({ or: [{ lt: { age: 21 } }, { gt: { age: 23 } }] });
    assert.ok(or.match(record, operators));

    or = new Or({ or: [{ gt: { age: 26 } }, { lt: { age: 21 } }] });
    assert.strictEqual(or.match(record, operators), false);
  });

  it('should match record by or operator having one operands', () => {
    const record = { age: 25 };
    const operators = new Operators();
    const or = new Or({ or: [{ gt: { age: 23 } }] });
    assert.ok(or.match(record, operators));
  });

  it('should check if given operator is or operator', () => {
    const or = new Or({ or: [] });
    assert.ok(or.is('or'));
  });
});

describe('And', () => {
  it('should match record by and operator having two operands', () => {
    const record = { age: 22 };
    const operators = new Operators();
    let and = new And({ and: [{ gt: { age: 21 } }, { lt: { age: 23 } }] });
    assert.ok(and.match(record, operators));

    and = new And({ and: [{ gt: { age: 16 } }, { lt: { age: 21 } }] });
    assert.strictEqual(and.match(record, operators), false);
  });

  it('should match record by or operator having one operand', () => {
    const record = { age: 25 };
    const operators = new Operators();
    const and = new And({ and: [{ gt: { age: 23 } }] });
    assert.ok(and.match(record, operators));
  });

  it('should check if given operator is or operator', () => {
    const and = new And({ and: [] });
    assert.ok(and.is('and'));
  });
});

describe('Not', () => {
  it('should match record by not operator', () => {
    const record = { age: 20 };
    const operators = new Operators();
    let not = new Not({ not: { gt: { age: 21 } } });
    assert.ok(not.match(record, operators));

    not = new Not({ not: { or: [{ gt: { age: 16 } }, { lt: { age: 21 } }] } });
    assert.strictEqual(not.match(record, operators), false);
  });

  it('should check if given operator is or operator', () => {
    const not = new Not({ not: {} });
    assert.ok(not.is('not'));
  });
});

describe('Operators', () => {
  describe('getOperator', () => {
    it('should give relational operator eq', () => {
      const operators = new Operators();
      const query = { eq: {} };
      const eq = operators.getOperator(query);
      assert.ok(eq.is('eq'));
    });

    it('should give relational operator gt', () => {
      const operators = new Operators();
      const query = { gt: {} };
      const gt = operators.getOperator(query);
      assert.ok(gt.is('gt'));
    });

    it('should give logical operator or', () => {
      const operators = new Operators();
      const query = { or: [] };
      const or = operators.getOperator(query);
      assert.ok(or.is('or'));
    });

    it('should give logical operator and', () => {
      const operators = new Operators();
      const query = { and: [] };
      const and = operators.getOperator(query);
      assert.ok(and.is('and'));
    });

    it('should give logical operator and', () => {
      const operators = new Operators();
      const query = { not: {} };
      const not = operators.getOperator(query);
      assert.ok(not.is('not'));
    });
  });
});
