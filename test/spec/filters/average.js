'use strict';

describe('Filter: average', function () {

  // load the filter's module
  beforeEach(module('pokerPlanningApp'));

  // initialize a new instance of the filter before each test
  var average;
  beforeEach(inject(function ($filter) {
    average = $filter('average');
  }));

  it('should return the input prefixed with "average filter:"', function () {
    var text = 'angularjs';
    expect(average(text)).toBe('average filter: ' + text);
  });

});
