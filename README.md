# Nucleus

Nucleus is a lightweight web component library that leverages [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/).

Nucleus provides a simple way to register custom DOM elements, bind to their lifecycle and handle events.

#### Why Nucleus?

* Multiple component instances!
* Lifecycle hooks for free
* Property bindings
* Components are just DOM elements

## Installation

Nucleus has a dependency on [JQuery](https://jquery.com/), [Lodash](https://lodash.com) and a [Custom Elements Polyfill](https://github.com/WebReflection/document-register-element).

## Usage


### Lifecycle Hooks

```javascript

  Nucleus.Component('my-element', {

    created: function() {
      // component created
    },

    attached: function() {
      // component added to DOM
    }

    detached: function() {
      // component removed from DOM
    },

    attributeChanged: function(attrName, oldVal, newVal) {
      // attribute changed using element.setAttribute()
    }

  });

```


### Events

```javascript

  Nucleus.Component('my-element', {

    events: {
      'click': 'handleClick',
      'click .class-selector': 'handleChildClick'
    },

    handleClick: function() {
      // do stuff here
    },

    handleChildClick: function() {
      // do more stuff here
    }
  });

```

### Properties

```javascript

  Nucleus.Component('my-element', {
    
    properties: {
      name: String,
      age: Number,
      location: {
        type: String,
        default: "San Francisco"
      },
      stats: Object
    },

    nameChanged: function() {
      console.log(this.name);
    }
  });

```


```html
<my-element name="Christos" age="32" stats='{"data": "goes here"}'></my-element>
```

### Extend 

```javascript
  Nucleus.Component('x-button', {
    extends: 'button'
  });
```

```html
<button is="x-button">Submit</button>
```