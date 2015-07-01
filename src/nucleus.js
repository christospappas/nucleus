// TODO: clean up module pattern
var Nucleus = {
	components: {},
	isRegistered: function(component) {
		return this.components[component] ? true : false;
	}
};

Nucleus.Component = (function(window, undefined) {

	// Regular expression used to split event strings.
  const bindEventSplitter = /^(\S+)\s*(.*)$/;
  const _reservedPropertiesRegex = /created|attached|detached|attributeChanged|events|extends/;

  // The components custom element prototype
	var _elementPrototype;

	// Register and configure custom element
	function element(tagName, definition) {
		_elementPrototype = Object.create(getExtendsPrototype(definition.extends));

		attachCallbacks(definition);
		attachProperties(definition);

		_elementPrototype.$ = function(selector) {
      return this.$el.find(selector);
    }

		Nucleus.components[tagName] = _elementPrototype;

		var registerElementOptions = { prototype: _elementPrototype };

		if (definition.extends) {
			registerElementOptions.extends = definition.extends;
		}

		return document.registerElement(tagName, registerElementOptions);
	}

	// Return the prototype of the element to extend.
	// If we aren't extending from an existing Nucleus component 
	// look for the native tag prototype
	function getExtendsPrototype(name) {
		if (Nucleus.components[name]) {
			return Nucleus.components[name];
		}

		return getTagPrototype(name);
	}

	function getTagPrototype(tag) {
		if (tag) {
			return Object.getPrototypeOf(document.createElement(tag))
		} else {
			return HTMLElement.prototype
		}
	}

	// Attach custom element lifecycle hooks and register property observers
	function attachCallbacks(definition) {
		
		_elementPrototype.createdCallback = function() {
			// Object.observe(this, propertyChanged.bind(this));
			bindEvents.call(this, definition.events);
			
			this.$el = $(this);

			// TODO: Cleanup attribute assignment
			for (var i=0; i < this.attributes.length; i++) {
				var attr = this.attributes[i];
				this[attr.name] = attr.value;
			}

			if (definition.created) {
      	definition.created.call(this);
      }
		}
		
		if (definition.attached) {
			_elementPrototype.attachedCallback = definition.attached;
		}
		
		_elementPrototype.detachedCallback = function() {
			// unbindEvents.call(this, definition.events);
			if (definition.detached) {
				definition.detached.call(this);
			}
		}

		if (definition.attributeChanged) {
			_elementPrototype.attributeChangedCallback = function(attrName, oldVal, newVal) {
				this[attrName] = newVal;
				definition.attributeChanged.call(this, attrName, oldVal, newVal);
			}
		}

	}

	function attachProperties(definition) {

		for (var key in definition) {

			if (key in _elementPrototype) {
				console.warn(`property '${key}' already set.`);
				continue;
			}

			if (definition.hasOwnProperty(key)) {
				if (key.match(_reservedPropertiesRegex)) { continue; }
				_elementPrototype[key] = definition[key];
			}
		}
	}

	function bindEvents(events) {
		if (events) {
			for (var event in events) {
				var elements, fn,
						[e, selector] = event.match(bindEventSplitter).slice(1),
						method = this[events[event]];
						
				if (method) {
					$(this).on(e, selector, method.bind(this));
				} else {
					console.warn(`'${events[event]}' missing for event '${event}'`);
				}
				
			}
		}
	}

	function unbindEvents(events) {
		for (var event in events) {
			$(this).off(event);
		}
	}

	return element;

})(window);

export default Nucleus;