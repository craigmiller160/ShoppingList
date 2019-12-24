const { JSDOM } = require('jsdom');
const formatXml = require('xml-formatter');

const DOCTYPE = '<!DOCTYPE html>'; // TODO want to figure out if this can be incorporated
const BASE_HTML = '<html><head /><body /></html>';

class HtmlBuilder {
	constructor() {
		this.dom = new JSDOM(BASE_HTML);
		this.document = this.dom.window.document;
	}

	addCss(css) {
		const style = this.createElement({ tagName: 'style', textContent: css });
		this.document.head.appendChild(style);
	}

	createElement({ tagName, textContent, className }) {
		const elem = this.document.createElement(tagName);
		if (textContent) {
			elem.textContent = textContent;
		}
		if (className) {
			elem.className = className;
		}
		return elem;
	}

	serialize() {
		return formatXml(this.dom.serialize()); // TODO drop the formatXml eventually... maybe...
	}
}

module.exports = {
	HtmlBuilder
};