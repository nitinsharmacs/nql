const entries = Object.entries;

const newId = (tableEntries) => {
  const lastEntry = tableEntries[tableEntries.length - 1];
  if (lastEntry === undefined) {
    return 1;
  }
  return lastEntry.id + 1;
};

const insert = (table, entry) => {
  const id = newId(table.entries);
  table.entries.push({ id, ...entry });
  return table;
};

const isRelationalOperator = (field) => {
  const operators = ['gt', 'ge'];
  return operators.includes(field);
};

const gt = (operands, record) => {
  return entries(operands).every(([opKey, opValue]) => {
    return record[opKey] > opValue;
  });
};

const ge = (operands, record) => {
  return entries(operands).every(([opKey, opValue]) => {
    return record[opKey] >= opValue;
  });
};

const getPredicate = (operator, operands, record) => {
  if (operator === 'gt') {
    return gt(operands, record);
  }

  if (operator === 'ge') {
    return ge(operands, record);
  }
};

const doCriteriaMet = (record, criteria) => {
  return entries(criteria).every(([field, value]) => {
    let predicate = record[field] === value;
    if (isRelationalOperator(field)) {
      predicate = getPredicate(field, value, record);
    }
    return predicate;
  });
};

const find = (table, criteria) => {
  return table.entries.filter(entry => {
    return doCriteriaMet(entry, criteria);
  });
};

class Table {
  constructor(table) {
    this.entries = table;
  }
  insert(entry) {
    return insert(this.table, entry);
  }
  find(criteria) {
    return find(this.table, criteria);
  }
};

exports.insert = insert;
exports.find = find;
