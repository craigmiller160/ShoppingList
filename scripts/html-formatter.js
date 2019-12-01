const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><head /><body /></html>');
const document = dom.window.document;

const createElement = ({ tagName, textContent }) => {
	const elem = document.createElement(tagName);
	elem.textContent = textContent;
	return elem;
};

document.head.appendChild(createElement({ 
	tagName: 'title', 
	textContent: 'Shopping List'
}));

console.log(dom.serialize()); // TODO delete this