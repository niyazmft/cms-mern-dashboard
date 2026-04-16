import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log("Running Security Tests: SQL Injection Protection in updateProduct");

const filePath = path.resolve('controllers/postgresController/pgProduct.js');
const content = fs.readFileSync(filePath, 'utf8');

// 1. Check that string concatenation with image_url is NOT present
const vulnerablePattern = /ARRAY\[\${imageUrlsString}\]/;
const isVulnerable = vulnerablePattern.test(content);

// 2. Check that parameterized query with $2 (or similar) is present in updateProduct
const updateProductSection = content.slice(content.indexOf('export const updateProduct'));
const parameterizedPattern = /UPDATE products SET image_url = array_cat\(image_url, \$2::text\[\]\) WHERE id = \$1/;
const isFixed = parameterizedPattern.test(updateProductSection);

if (isVulnerable) {
    console.error("FAIL: The code still contains string concatenation for image_url, which is vulnerable to SQL injection.");
    process.exit(1);
}

if (!isFixed) {
    console.error("FAIL: The code does not use the expected parameterized query for updateProduct.");
    // Log what was found to help debugging
    console.log("Found updateProduct section:\n", updateProductSection.substring(0, 300));
    process.exit(1);
}

console.log("PASS: SQL Injection Protection Test (Static Analysis)");
