## 2024-06-01 - [Parallelizing database queries]
**Learning:** In MongoDB, `find()` and `countDocuments()` are independent queries. When executed sequentially, they increase the total response time by the sum of their latencies.
**Action:** Use `Promise.all()` to execute independent database queries concurrently to significantly reduce request response latency.
