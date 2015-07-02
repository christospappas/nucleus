import properties from './properties';
import events from './events';
import extendElement from './extends';

var Base = {

  registerCallback: function() {
    this._setExtends();
    this._invokeMethod('registered');
  },

  createdCallback: function() {
    this.$el = $(this);
    
    this._bindEvents();
    this._applyProperties();

    this._invokeMethod('created');
  },

  attachCallbacks: function() {
    this._invokeMethod('attached');
  },

  detachedCallback: function() {
    this._unbindEvents();
    this._invokeMethod('detached');
  },

  attributeChangedCallback: function(attrName, oldVal, newVal) {
    var attrName = _.camelCase(attrName);
    this._setAttributeToProperty(attrName);
    this._invokeMethod(`${attrName}Changed`, [oldVal, newVal]);
    this._invokeMethod('attributeChanged', arguments);
  },

  $: function(selector) {
    return this.$el.find(selector);
  },

  _invokeMethod: function(name, args) {
    var fn = this[name];
    if (fn) {
      fn.apply(this, Array.prototype.slice.call(args || [], 0));
    }
  }

};

_.extend(Base, events);
_.extend(Base, properties);
_.extend(Base, extendElement);

export default Base;