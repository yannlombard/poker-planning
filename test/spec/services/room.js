'use strict';

describe('Service: Room', function () {

  // load the service's module
  beforeEach(module('PokerPlanningApp'));

  // instantiate service
  var Room;
  beforeEach(inject(function (_Room_) {
    Room = _Room_;
  }));

  it('should do something', function () {
    expect(!!Room).toBe(true);
  });

});
