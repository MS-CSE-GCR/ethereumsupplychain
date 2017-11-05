'use strict';

function Contract(options) {
    if (!options) {
        options = {};
    }
    
    this.address = options.address;
}

module.exports = Contract;