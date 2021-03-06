
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const getEntryJs = require('./get-js-entry');
const cheerio = require('cheerio');

const donoConfig = require('../dono.config');

const projectPath = process.cwd();

module.exports = async () => {

	let result = {};

	let defaultHtmlEntry = donoConfig['html-entry'] || './src/**/page/*.html';

	let htmlFiles = glob.sync(path.join(projectPath, defaultHtmlEntry));
	let jsFiles = await getEntryJs();

	try {
		htmlFiles.map((item, index) => {

			let content = fs.readFileSync(item, {
				encoding: 'utf-8'
			});

			let $ = cheerio.load(content);

			$('script').map((index, ele) => {
				let src = $(ele).attr('src');

				if(src.replace(/.js$/, '') in jsFiles) {
					result[src] = item;
				}
			});
		});
	}
	catch(e) {
		console.error(e);
	}

	return result;
};
