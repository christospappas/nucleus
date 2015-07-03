/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _component = __webpack_require__(2);

	var _component2 = _interopRequireDefault(_component);

	var _registry = __webpack_require__(8);

	var _registry2 = _interopRequireDefault(_registry);

	if (!window.Nucleus) {
	  window.Nucleus = {
	    Component: _component2['default'],
	    registry: _registry2['default']
	  };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _base = __webpack_require__(3);

	var _base2 = _interopRequireDefault(_base);

	var _registry = __webpack_require__(8);

	var _registry2 = _interopRequireDefault(_registry);

	exports['default'] = function (name, prototype) {

	  var prototype = _.merge(prototype, _base2['default']);
	  _registry2['default'].register(name, prototype);

	  prototype.registerCallback();

	  var registerOptions = { prototype: prototype };

	  if (prototype['extends']) {
	    registerOptions['extends'] = prototype['extends'];
	  }

	  return document.registerElement(name, registerOptions);
	};

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _properties = __webpack_require__(4);

	var _properties2 = _interopRequireDefault(_properties);

	var _events = __webpack_require__(5);

	var _events2 = _interopRequireDefault(_events);

	var _extends = __webpack_require__(7);

	var _extends2 = _interopRequireDefault(_extends);

	var Base = {

	  registerCallback: function registerCallback() {
	    this._setExtends();
	    this._invokeMethod('registered');
	  },

	  createdCallback: function createdCallback() {
	    this.$el = $(this);

	    this._bindEvents();
	    this._applyProperties();

	    this._invokeMethod('created');
	  },

	  attachCallbacks: function attachCallbacks() {
	    this._invokeMethod('attached');
	  },

	  detachedCallback: function detachedCallback() {
	    this._unbindEvents();
	    this._invokeMethod('detached');
	  },

	  attributeChangedCallback: function attributeChangedCallback(attrName, oldVal, newVal) {
	    var attrName = _.camelCase(attrName);
	    this._setAttributeToProperty(attrName);
	    this._invokeMethod(attrName + 'Changed', [oldVal, newVal]);
	    this._invokeMethod('attributeChanged', arguments);
	  },

	  $: function $(selector) {
	    return this.$el.find(selector);
	  },

	  _invokeMethod: function _invokeMethod(name, args) {
	    var fn = this[name];
	    if (fn) {
	      fn.apply(this, Array.prototype.slice.call(args || [], 0));
	    }
	  }

	};

	_.extend(Base, _events2['default']);
	_.extend(Base, _properties2['default']);
	_.extend(Base, _extends2['default']);

	exports['default'] = Base;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {

	  properties: {},

	  _applyProperties: function _applyProperties() {
	    for (var prop in this.properties) {
	      this._setAttributeToProperty(prop);
	    }
	  },

	  _setAttributeToProperty: function _setAttributeToProperty(attrName) {
	    var definition = this._propertyDefinition(attrName);

	    if (definition !== undefined) {
	      var value = this.getAttribute(_.kebabCase(attrName)) || definition['default'],
	          type = definition.type || String;

	      this[attrName] = this._deserialize(value, type);
	    }
	  },

	  _propertyDefinition: function _propertyDefinition(name) {
	    var prop = this.properties[name];

	    if (prop !== undefined && typeof prop !== 'object') {
	      return { type: prop, 'default': null };
	    }

	    return prop;
	  },

	  _deserialize: function _deserialize(value, type) {
	    switch (type) {
	      case Number:
	        value = Number(value);
	        break;

	      case Boolean:
	        value = value === 'true';
	        break;

	      case Date:
	        value = Date.parse(value);
	        break;

	      case Object:
	      case Array:
	        try {
	          value = JSON.parse(value);
	        } catch (e) {
	          console.error('Unable to deserialize ' + value);
	        }
	        break;

	      default:
	        break;
	    }

	    return value;
	  },

	  _serialize: function _serialize(value, type) {
	    switch (type) {
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
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _constants = __webpack_require__(6);

	exports['default'] = {

	  events: {},

	  _bindEvents: function _bindEvents() {

	    if (this.events) {
	      for (var event in this.events) {
	        var elements;var fn;

	        var _event$match$slice = event.match(_constants.BIND_EVENT_SPLITTER).slice(1);

	        var _event$match$slice2 = _slicedToArray(_event$match$slice, 2);

	        var e = _event$match$slice2[0];
	        var selector = _event$match$slice2[1];
	        var method = this[this.events[event]];

	        if (method) {
	          this.$el.on(e, selector, method.bind(this));
	        } else {
	          console.warn('\'' + this.events[event] + '\' missing for event \'' + event + '\'');
	        }
	      }
	    }
	  },

	  _unbindEvents: function _unbindEvents() {
	    for (var event in this.events) {
	      this.$el.off(event);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BIND_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;
	exports.BIND_EVENT_SPLITTER = BIND_EVENT_SPLITTER;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _registry = __webpack_require__(8);

	var _registry2 = _interopRequireDefault(_registry);

	exports['default'] = {

	  _setExtends: function _setExtends() {
	    this.__proto__ = this._getExtendsPrototype(this['extends']);
	  },

	  _getExtendsPrototype: function _getExtendsPrototype(name) {
	    var component;
	    if (component = _registry2['default'].getComponent[name]) {
	      return component;
	    }

	    return this._getNativeTagPrototype(name);
	  },

	  _getNativeTagPrototype: function _getNativeTagPrototype(tag) {
	    if (tag) {
	      return Object.getPrototypeOf(document.createElement(tag));
	    } else {
	      return HTMLElement.prototype;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var components = {};

	exports["default"] = {
	  isRegistered: function isRegistered(component) {
	    return components[component] ? true : false;
	  },

	  register: function register(name, component) {
	    components[name] = component;
	  },

	  getComponent: function getComponent(component) {
	    return components[component];
	  }
	};
	module.exports = exports["default"];

/***/ }
/******/ ]);