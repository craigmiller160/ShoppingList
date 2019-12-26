const { JSDOM } = require('jsdom');
const formatXml = require('xml-formatter');

const DOCTYPE = '<!DOCTYPE html>'; // TODO want to figure out if this can be incorporated
const BASE_HTML = '<html><head></head><body></body></html>';

const removeElements = (elements) => 
	[...new Array(elements.length).keys()]
		.map((index) => elements.item(index))
		.forEach((element) => element.parentElement.removeChild(element));

class HtmlBuilder {
	constructor() {
		this.dom = new JSDOM(BASE_HTML);
		this.document = this.dom.window.document;
	}

	setCss(css) {
		const styles = this.document.getElementsByTagName('style');
		removeElements(styles);

		const style = this.createElement({
			tagName: 'style',
			textContent: css
		});
		this.document.head.appendChild(style);
	}

	setTitle(title) {
		const titles = this.document.getElementsByTagName('title');
		removeElements(titles);

		const titleElem = this.createElement({
			tagName: 'title',
			textContent: title
		});
		this.document.head.appendChild(titleElem);
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

	appendElement(parentSelector, element) {
		this.document.querySelector(parentSelector).appendChild(element);
	}

	serialize() {
		return formatXml(this.dom.serialize()); // TODO drop the formatXml eventually... maybe...
	}
}

module.exports = {
	HtmlBuilder
};