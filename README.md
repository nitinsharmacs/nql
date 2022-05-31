nql

## Description

Demo DBMS

## Functions

### 1. createDb

### 2. createTable

### 3. find
  * Takes criteria
  * No criteria given, gives all records
### 4. insert
  * Inserts single record

### 5. insertMany
  * Inserts multiple records
  
### 6. delete
  * delets all the records matching the criteria
  * if no criteria given i.e. empty criteria {} is given, it deletes all the records
  * It should return deleted records
### 7. update

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