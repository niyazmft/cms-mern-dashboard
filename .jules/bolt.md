## 2026-06-02 - Optimize getUserPerformance N+1 queries

Replaced an iterative sequence of database calls inside `Promise.all` with a single `$in` query. Fetching related models within `map` array functions triggers O(n) roundtrips to the database leading to severe degradation for large volumes of related records. The Mongo `$in` operator easily batches queries fetching all associated items simultaneously.

## 2026-06-02 - Restore missing safety checks

When optimizing MongoDB queries (like moving `$lookup` properties to isolated `$in` operations), take care to preserve existing response checks (like 404 validation) and sensitive data stripping (like `$project: { password: 0 }`). Security trumps optimizations.
