#!usr/bin/env node

const program = require('commander');
const start = require('../src/compile/dono-start');


program
	.parse(process.argv);


start({env: 'development'});
