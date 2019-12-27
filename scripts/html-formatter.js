const { JSDOM } = require('jsdom');
const { HtmlBuilder } = require('./html/builder');
const fs = require('fs');
const path = require('path');

const title = process.env.PROD ? 'Shopping List' : 'Dev Shopping List';

// TODO sort the data so the aisles are alphabetical

const organizeData = (data) => {
	const aisleMap = data.items
		.reduce((acc, item) => {
			if (acc[item.aisle]) {
				acc[item.aisle].push(item);
			} else {
				acc[item.aisle] = [item];
			}
			return acc;
		}, {});
	return Object.entries(aisleMap)
		.reduce((acc, [aisle, items]) => {
			const values = Object.values(acc);
			if (values.length === 0) {
				acc.row1 = {
					[aisle]: items
				};
			} else if (Object.keys(values[values.length - 1]).length < 2) {
				values[values.length - 1][aisle] = items;
			} else {
				acc[`row${values.length + 1}`] = {
					[aisle]: items
				};
			}
			return acc;
		}, {});
};

const buildHeader = (htmlBuilder) => {
	const headerElem = htmlBuilder.createElement({ tagName: 'header' });
	htmlBuilder.appendElement('body', headerElem);

	const headerTitleDiv = htmlBuilder.createElement({
		tagName: 'div',
		className: 'title'
	});
	headerElem.appendChild(headerTitleDiv);

	const titleH1 = htmlBuilder.createElement({
		tagName: 'h1',
		textContent: title
	});
	headerTitleDiv.appendChild(titleH1);
};

const buildItem = (htmlBuilder, item, listElem) => {
	const itemElem = htmlBuilder.createElement({
		tagName: 'p',
		className: 'list__item'
	});
	const box = htmlBuilder.createElement({
		tagName: 'span',
		className: 'list__box'
	});
	const text = htmlBuilder.createTextNode(item.name);
	const tooltip = htmlBuilder.createElement({
		tagName: 'span',
		className: 'list__tooltip',
		textContent: `ID: ${item.id}`
	});

	itemElem.appendChild(box);
	itemElem.appendChild(text);
	itemElem.appendChild(tooltip);
	listElem.appendChild(itemElem);
};

const buildRow = (htmlBuilder, aisle, items, rowElem) => {
	const colElem = htmlBuilder.createElement({
		tagName: 'div',
		className: 'col'
	});
	rowElem.appendChild(colElem);

	const listElem = htmlBuilder.createElement({
		tagName: 'div',
		className: 'list'
	});
	colElem.appendChild(listElem);

	const listHeader = htmlBuilder.createElement({
		tagName: 'h2',
		className: 'list__header',
		textContent: `Aisle: ${aisle}`
	});
	listElem.appendChild(listHeader);

	items.forEach((item) => buildItem(htmlBuilder, item, listElem));
};

const buildMain = (htmlBuilder, data) => {
	const mainElem = htmlBuilder.createElement({ tagName: 'main' });
	htmlBuilder.appendElement('body', mainElem);

	Object.values(data)
		.forEach((row) => {
			const rowElem = htmlBuilder.createElement({
				tagName: 'div',
				className: 'row'
			});
			mainElem.appendChild(rowElem);

			Object.entries(row)
				.forEach(([aisle, items]) => buildRow(htmlBuilder, aisle, items, rowElem));

			if (Object.keys(row).length === 1) {
				const colElem = htmlBuilder.createElement({
					tagName: 'div',
					className: 'col'
				});
				rowElem.appendChild(colElem);
			}
		});
};

const formatDataHtml = (data) => {
	const organizedData = organizeData(data);

	const css = fs.readFileSync(path.resolve(require.main.path, 'scripts/html/styles.css'), 'utf8');

	const htmlBuilder = new HtmlBuilder();
	htmlBuilder.setCss(css);
	htmlBuilder.setTitle(title);

	buildHeader(htmlBuilder);
	buildMain(htmlBuilder, organizedData);

	return htmlBuilder.serialize();
};

module.exports = formatDataHtml;