'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var config = window.config;
var format = require('util').format;

var getLocalUrl = function(type, name, index){
    if(name === undefined){
        return index === undefined ? format("/%s", type) : format("/%s/%d", type, index);
    }
    return index === undefined ? format("/%s/%s", type, name) : format("/%s/%s/%d", type, name, index);
};

var redirect = function(){
    console.log("Redirect to 404");
    window.location.href = "/404";
};

module.exports = {
    config: config,
    getLocalUrl: getLocalUrl,
    redirect: redirect
};