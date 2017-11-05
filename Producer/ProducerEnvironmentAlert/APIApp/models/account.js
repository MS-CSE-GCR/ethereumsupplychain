'use strict';

function Account(options) {
    if (!options) {
        options = {};
    }
    
    this.address = options.address;
}

module.exports = Account;