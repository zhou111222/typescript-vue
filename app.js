// app.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk')
const app = express();
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/home.html'), 'utf-8')
    res.send(html)
})

app.get('/home', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/home.html'), 'utf-8')
    res.send(html)
})

app.get('/about', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/about.html'), 'utf-8')
    res.send(html)
})
app.listen(8082, res => {
    console.log(chalk.yellow('Start Service On 8082'));
});