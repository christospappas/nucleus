import { BIND_EVENT_SPLITTER } from './constants';

export default {
  
  events: {},

  _bindEvents: function() {

    if (this.events) {
      for (var event in this.events) {
        var elements, fn,
            [e, selector] = event.match(BIND_EVENT_SPLITTER).slice(1),
            method = this[this.events[event]];
            
        if (method) {
          this.$el.on(e, selector, method.bind(this));
        } else {
          console.warn(`'${this.events[event]}' missing for event '${event}'`);
        }

      }
    }
  },

  _unbindEvents: function() {
    for (var event in this.events) {
      this.$el.off(event);
    }
  }
}