export default {
	
	properties: {},

	_applyProperties: function() {
		for (var prop in this.properties) {
			this._setAttributeToProperty(prop);
		}
	},

	_setAttributeToProperty: function(attrName) {
		var definition = this._propertyDefinition(attrName);

		if (definition !== undefined) {
			var value = this.getAttribute(_.kebabCase(attrName)) || definition.default,
					type = definition.type || String;

			this[attrName] = this._deserialize(value, type);
		}
	},

	_propertyDefinition: function(name) {
		var prop = this.properties[name];

		if (prop !== undefined && typeof prop !== 'object') {
			return {type: prop, default: null};
		}

		return prop;
	},

	_deserialize: function(value, type) {
		switch(type) {
			case Number:
				value = Number(value);
				break;

			case Boolean:
				value = (value === 'true');
				break;

			case Date:
				value = Date.parse(value);
				break;

			case Object:
			case Array:
				try {
					value = JSON.parse(value);
				} catch(e) {
					console.error(`Unable to deserialize ${value}`);
				}
				break;

			default:
				break;
		}

		return value;
	},

	_serialize: function(value, type) {
		switch(type) {
			case Object:
				value = JSON.stringify(value);
				break;

			case Array:
				value = value.toString();
				break;

			default:
				value = String(value);
		}

		return value;
	}

};