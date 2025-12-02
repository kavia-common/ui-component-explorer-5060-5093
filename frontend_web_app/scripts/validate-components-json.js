#!/usr/bin/env node
/**
 * PUBLIC_INTERFACE
 * validate-components-json - Quick validator for src/data/components.json.
 * Ensures file parses and each component has required fields and at least one of code or jsxCode.
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data', 'components.json');

function fail(msg) {
  console.error('components.json validation failed:', msg);
  process.exit(1);
}

try {
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);

  if (!Array.isArray(data)) {
    fail('Root must be an array');
  }

  const required = ['id', 'name', 'slug', 'category'];
  let ok = true;
  data.forEach((item, idx) => {
    const where = `index ${idx} (id: ${item && item.id})`;
    required.forEach((k) => {
      if (!item || typeof item[k] !== 'string' || !item[k].trim()) {
        ok = false;
        console.error(`- Missing required field "${k}" at ${where}`);
      }
    });
    if (!item || (!item.code && !item.jsxCode)) {
      ok = false;
      console.error(`- Missing "code" or "jsxCode" at ${where}`);
    }
    if (!item.previewProps && !item.props && !item.component) {
      // previewProps not strictly required, but warn if missing props too
      console.warn(`- Note: No previewProps/props defined at ${where}`);
    }
  });

  if (!ok) {
    fail('See errors above.');
  }
  console.log('components.json validation passed ✓');
} catch (err) {
  fail(err.message);
}
