// var date=new Date();
// console.log(date.getMonth() + 1);
//refer moment.js doct
var moment = require('moment');

var date = moment();

date.add(100,'year').subtract(9,'months');
// console.log(date.format());
console.log(date.format('MMM'));
console.log(date.format('MMM YYYY'));
console.log(date.format('DD MMM YYYY'));
console.log(date.format('Do MMM, YYYY'));

console.log(date.format('h:mm a'));

var someTimeStamp = moment().valueOf();
var createdAt = 1234;
var datenew = moment(createdAt);
console.log(datenew.format('h:mm a'));
console.log(someTimeStamp);
