const { connectDb, createDb } = require('../db.js');

createDb('./sample.json', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  connectDb('./sample.json', (err, db) => {
    if (err) {
      console.log(err);
      return;
    }

    db.createTable('students');

    db.students.insertMany([{
      name: 'john',
      age: 21
    }]);
  });
});
