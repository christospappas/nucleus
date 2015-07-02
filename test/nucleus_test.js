QUnit.module("Nucleus", {
  beforeEach: function( assert ) {

  }
});

QUnit.test("registers component", function(assert) {
	Nucleus.Component('custom-element', {});
	var elem = document.createElement('custom-element');
  assert.ok( Nucleus.registry.isRegistered('custom-element'), "Registered" );
  assert.ok( elem.constructor !== HTMLElement, "Correct Constructor");
});

QUnit.test("registers type extension custom element", function(assert) {
	var elem = document.createElement('button');
	elem.is = "x-button";
	assert.ok( elem.constructor == HTMLButtonElement, "Type extension registered" );
});