import escapeRegExp from "../utils/escapeRegExp.js";
import assert from "assert";

console.log("Running Security Tests: ReDoS Protection");

const maliciousPattern = "^(a+)+$";
const maliciousInput = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"; // 30 'a's

const start = Date.now();
const escapedPattern = escapeRegExp(maliciousPattern);
const regex = new RegExp(escapedPattern, "i");
const result = regex.test(maliciousInput);
const end = Date.now();

const duration = end - start;
console.log(`Test completed in ${duration}ms`);

assert.strictEqual(result, false, "Should not match malicious input");
assert.ok(duration < 100, `ReDoS test took too long: ${duration}ms`);

console.log("ReDoS Protection Test: PASSED");

// Test robustness with non-string input
assert.strictEqual(escapeRegExp(123), "123");
assert.strictEqual(escapeRegExp(null), "null");
console.log("Robustness Test: PASSED");
