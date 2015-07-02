import Base from './base';
import registry from './registry';

export default function(name, prototype) {
	
	var prototype = _.merge(prototype, Base);
	registry.register(name, prototype);

	prototype.registerCallback();

	var registerOptions = { prototype: prototype };

	if (prototype.extends) {
		registerOptions.extends = prototype.extends;
	}


	return document.registerElement(name, registerOptions);
}