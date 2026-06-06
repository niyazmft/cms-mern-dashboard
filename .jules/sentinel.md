## 2026-06-06 - [Sensitive Data Exposure in User Endpoint]
**Vulnerability:** The `/general/user/:id` endpoint returned the entire user object from MongoDB, including the hashed password, exposing sensitive authentication data to the client.
**Learning:** Developers frequently return the raw document directly from Mongoose `findById` or `find` calls without explicitly excluding sensitive fields.
**Prevention:** Always append `.select("-password")` (or explicitly project allowed fields) when retrieving user data, and verify the record's existence (`if (!user)`) before sending a successful response to prevent null reference issues and data leaks.
