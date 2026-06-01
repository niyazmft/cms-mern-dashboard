## 2024-05-18 - [Prevent Password Leak in User Objects]
**Vulnerability:** User objects fetched via `findById` or `aggregate` were leaking the user's password field in API responses.
**Learning:** `User.findById(id)` and `User.aggregate` returned the entire user document by default.
**Prevention:** Always use `.select("-password")` for Mongoose models when fetching or `{ $project: { password: 0 } }` in aggregation pipelines to omit sensitive fields.
