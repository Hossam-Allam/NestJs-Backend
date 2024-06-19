const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'templates');
const destDir = path.join(__dirname, 'dist', 'templates');

fs.copy(srcDir, destDir, err => {
  if (err) return console.error(err);
  console.log('Templates copied successfully!');
});
