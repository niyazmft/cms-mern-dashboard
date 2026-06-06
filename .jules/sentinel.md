## 2026-06-06 - [Sensitive Data Exposure in User Endpoint]
**Vulnerability:** The `/general/user/:id` endpoint returned the entire user object from MongoDB, including the hashed password, exposing sensitive authentication data to the client.
**Learning:** Developers frequently return the raw document directly from Mongoose `findById` or `find` calls without explicitly excluding sensitive fields.
**Prevention:** Always append `.select("-password")` (or explicitly project allowed fields) when retrieving user data, and verify the record's existence (`if (!user)`) before sending a successful response to prevent null reference issues and data leaks.
## 2026-06-06 - [Missing API Key Validation in User Endpoint]
**Vulnerability:** The `/general/user/:id` endpoint was completely unauthenticated. Attackers could directly hit the API, bypass frontend controls, and extract sensitive user information without providing the required API key.
**Learning:** Endpoints should never assume the client automatically includes an `x-api-key` header unless validated server-side. Global middleware or specific checks in each controller are required to enforce this.
**Prevention:** Always implement explicit authorization checks on sensitive backend routes (e.g., verifying `process.env.API_KEY` against `req.headers['x-api-key']`) before querying the database or returning data.
