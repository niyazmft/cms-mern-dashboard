## 2024-06-01 - [MongoDB Aggregation for Grouping]
**Learning:** For large datasets like geographic user distributions, fetching all users in-memory with `User.find()` to perform a `.reduce()` causes O(N) memory complexity.
**Action:** Use MongoDB's `$group` in an `aggregate` pipeline (`$sum: 1`) to offload the grouping and counting to the database, resulting in O(1) memory usage in Node.js.
