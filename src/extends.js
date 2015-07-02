import registry from './registry';

export default {

	_setExtends: function() {
		this.__proto__ = this._getExtendsPrototype(this.extends);
	},

	_getExtendsPrototype: function(name) {
		var component;
		if (component = registry.getComponent[name]) {
			return component;
		}

		return this._getNativeTagPrototype(name);
	},

	_getNativeTagPrototype: function(tag) {
		if (tag) {
			return Object.getPrototypeOf(document.createElement(tag))
		} else {
			return HTMLElement.prototype
		}
	}
}