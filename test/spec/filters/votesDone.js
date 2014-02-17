'use strict';

describe('Filter: votesDone', function () {

  // load the filter's module
  beforeEach(module('pokerPlanningApp'));

  // initialize a new instance of the filter before each test
  var votesDone;
  beforeEach(inject(function ($filter) {
    votesDone = $filter('votesDone');
  }));

  it('should return the input prefixed with "votesDone filter:"', function () {
    var text = 'angularjs';
    expect(votesDone(text)).toBe('votesDone filter: ' + text);
  });

});
