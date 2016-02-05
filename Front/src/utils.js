'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var Mongo = require('mongodb').MongoClient;

var config = JSON.load("../config.json");

var database = {
    ready: false,
    db: undefined
};

Mongo.connect(config.mongo_url, function(db){
    database.ready = true;
    database.db = db;
});

var changeTheme = function(id){
    var color = config.theme_color[id];
    var background = config.theme_background[id];
    var left = $("#home-left");
    var title_bar = $("#home-main-title-bar");
    var menu = $("#home-main-menu");
    var footer = $("#footer");
    var hr = $(".home-sphr");
    var blockquote = $("blockquote");
    //left.animate({})
};

var changeWebMode = function(width){
    return;
};

var getLocalUrl = function(type, name, index){
    return index === null ? "/" + type + "/" + name : "/" + type + "/" + name + "/" + index.toString();
};

module.exports = {
    config: config,
    database: database,
    getLocalUrl: getLocalUrl
};
