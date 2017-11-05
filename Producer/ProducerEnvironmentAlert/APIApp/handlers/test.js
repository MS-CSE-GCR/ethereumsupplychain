'use strict';

 //var repository = require('../lib/contactRepository');
 var Test = require('../models/Test.js');

 module.exports = {
     get: function contacts_get(req, res) {
         var ret = new Test();
         ret.id = 'A';
         ret.name = 'B';
         res.json(ret);
     }
 };