nql

## Description

Demo DBMS

## Functions

### 1. createDb

### 2. createTable

### 3. find
  * Takes query
  * No query given, gives all records
### 4. insert
  * Inserts single record

### 5. insertMany
  * Inserts multiple records
  
### 6. delete
  * delets all the records matching the query
  * if no query given i.e. empty query {} is given, it deletes all the records
  * It should return deleted records
### 7. update
  
  ```
  update(query, update, options)
  ```

  * Updates the matching records by update. 
  
#### Update operators :
  1. set: Replaces the given data sets

  ``` js
    update({id: 1}, {$set: {age: 12}});
    // replaces the age by 12
  ```
  2. inc: Increments the numerical data set

  ``` js
    update({id: 1}, {$inc: {age: 1}});
    // increments age by 1
  ```

  3. dec: Decrements the numerical data set

  ``` js
    update({id: 1}, {$dec: {age: 1}});
    // decrements age by 1
  ```

#### Options

  1. multi : true/false. Update multiple records

#### Return value

It returns updated record(s).

# Data structure

{
  table: {
    fields: [
      {name, type}
    ],
    entries: [
      {
        field,
        value
      }
    ]
  }
}