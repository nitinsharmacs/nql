const fs = require('fs');
const { Table } = require('./src/nqlLib.js');

class Db {
  #dbName;
  #tables;
  constructor(dbName) {
    this.#dbName = dbName;
    this.#tables = [];
  }

  addTable(tableName, tableData) {
    this[tableName] = new Table(this.#dbName, tableName, tableData);
    this.#tables.push(tableName);
  }

  createTable(tableName) {
    const dbFile = fs.readFileSync(this.#dbName, 'utf8');
    const dbContent = JSON.parse(dbFile);

    dbContent['tables'][tableName] = { fields: [], records: [] };

    fs.writeFileSync(this.#dbName, JSON.stringify(dbContent), 'utf8');

    this.addTable(tableName, dbContent['tables'][tableName]);
  }

  tables() {
    return this.#tables;
  }
}

class ConnectionError {
  constructor(code, dbName, message) {
    this.code = code;
    this.dbName = dbName;
    this.message = message;
  }

  toString() {
    return `${this.message}`;
  }
}

const createError = ({ dbName }) => {
  return new ConnectionError('NO_DB_FOUND',
    dbName,
    'database not found, try creating db using createDb'
  );
};

const connectDb = (dbName, cb) => {
  fs.readFile(dbName, 'utf8', (err, dbFileContent) => {
    if (err) {
      return cb(createError({ dbName }), null);
    }

    const { tables } = JSON.parse(dbFileContent);

    const db = new Db(dbName);

    for (const tableName in tables) {
      db.addTable(tableName, tables[tableName]);
    }

    cb(null, db);
  });
};

const createDb = (dbName) => {
  const db = {
    tables: {}
  };

  fs.writeFileSync(dbName, JSON.stringify(db), 'utf8');
};

module.exports = { connectDb, createDb };
