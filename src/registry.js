var components = {};

export default {
  isRegistered: function(component) {
    return components[component] ? true : false;
  },

  register: function(name, component) {
    components[name] = component;
  },

  getComponent: function(component) {
    return components[component];
  }
};