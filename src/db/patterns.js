const fs = require('fs');

const patterns = fs
  .readFileSync('./public/patterns.jsonl')
  .toString()
  .split('\n')
  .filter((x) => x)
  .map((x) => JSON.parse(x));

module.exports = patterns;
