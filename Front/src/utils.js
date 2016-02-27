'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var config = window.config;

var getLocalUrl = function(type, name, index){
    return index === null ? "/" + type + "/" + name : "/" + type + "/" + name + "/" + index.toString();
};

var redirect = function(){
    console.log("Redirect to 404");
    window.location.href = "/#/404";
};

module.exports = {
    config: config,
    getLocalUrl: getLocalUrl,
    redirect: redirect
};
