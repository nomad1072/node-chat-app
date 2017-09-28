var moment = require('moment');

var createdAt = 1234;
var date = moment(createdAt);
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

// 10:35 am
