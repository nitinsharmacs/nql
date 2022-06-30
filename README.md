![nql](https://nitinsharmacs.github.io/projectsImages/nql.png)

A database mechanism system with simple interfaces.

``` js
const {connectDb} = require('nql');

connectDb('./db/dbfile', (err, db) => {
  if (err) {
    console.log(err);
  }

  console.log(db);
});
```

## Installation

This node module can be installed using npm

```
$ npm install https://github.com/nitinsharmacs/nql
```

## How to use?

* Storing the database file is totally in your control. You can specify what database file to connect to.

* `connectDb` gives `db` instance having all the tables.

* Database can be created using `createDb` function.


### Creating database

``` js
const {createDb} = require('nql');

createDb('./db/dbfile', (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log('success');
});

```

### Tables

``` js
const {connectDb} = require('nql');

connectDb('./db/dbfile', (err, db) => {
  if (err) {
    console.log(err);
  }

  db.createTable('students');
});
```

#### Table methods

* insert

``` js
// insertMany(document);

db.students.insert({name:'john', age:23});
```

* insertMany

``` js
// insertMany([documents]);

db.students.insertMany([
  {name:'john', age:23},
  {name:'alice', age:23}
]);
```

* find

``` js
// find(queryObject);

db.students.find({});
```

* findMany

``` js
// findMany(queryObject);

db.students.findMany({});
```

* delete

``` js
// delete(queryObject);

db.students.delete({});
```

* update

``` js
// update(queryObject, update);

db.students.update({}, {});
```

* updateMany

``` js
// updateMany(queryObject, update);

db.students.updateMany({}, {});
```

## Queries

``` js
query = {
  $eq:{name: 'john'}
};
```

* So, a query is a condition on which the data has to be retreived.

### Query operators

There are following query operators supported by `nql`

#### Relational operators

* $eq : equal to
* $ne : not equal to
* $gt : greater than
* $ge : greater than or equal to
* $lt : less than
* $le : less than or equal to

#### Logical operators

* $or: any one of the conditions should match
* $and: all conditions should match
* $not : not of the condition

## Examples

Examples can be found in `examples` directory.

Below query finds the document with age greater than 12.

``` js
db.students.find({$gt: {age: 12}});
```

It finds multiple documents satisfying the query condition.
``` js
db.students.findMany({$gt: {age: 12}});
```
