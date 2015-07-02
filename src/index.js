import Component from './component';
import registry from './registry';

if (!window.Nucleus) {
	window.Nucleus = {
		Component: Component,
		registry: registry
	};	
}