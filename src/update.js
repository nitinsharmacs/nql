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

exports.Set = Set;
