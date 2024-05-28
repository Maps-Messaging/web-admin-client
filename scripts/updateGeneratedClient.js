// scripts/updateGeneratedClient.js
const fs = require('fs');
const path = require('path');

const GENERATED_CLIENT_DIR = path.resolve(__dirname, '../src/generated');

const replaceAxiosImport = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace the axios import statement
  content = content.replace(/import axios from 'axios'/g, "import axiosInstance from '../../axiosInstance';");
  // Replace instances of axios with axiosInstance
  content = content.replace(/axios\./g, 'axiosInstance.');
  fs.writeFileSync(filePath, content, 'utf8');
};

const updateGeneratedClient = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      updateGeneratedClient(filePath);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
      replaceAxiosImport(filePath);
    }
  });
};

updateGeneratedClient(GENERATED_CLIENT_DIR);
console.log('Generated client updated to use custom Axios instance.');
