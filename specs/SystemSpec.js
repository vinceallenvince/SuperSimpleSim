'use strict';

describe("System", function() {

  var system = SuperSimpleSim.System;

  beforeEach(function() {

  });

  it("should have its required properties.", function() {
    expect(typeof system.name).toEqual('string');
  });

});
