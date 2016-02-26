/**
 * Created by dtysky on 16/2/17.
 */
"use strict";

function Cache(){
    this.pages = {};
}

Cache.prototype.add = function(name, content){
    this.pages[name] = content;
};

Cache.prototype.remove = function(name){
    delete this.pages[name];
};

Cache.prototype.has = function(name){
    return this.pages[name] !== undefined;
};

Cache.prototype.get = function(name){
    return this.pages[name];
};

module.exports = new Cache();
