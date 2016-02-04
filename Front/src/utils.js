/**
 * Created by dtysky on 16/2/3.
 */

var Mongo = require('mongodb').MongoClient;
var $ = require('jquery');

var config = JSON.load("../config.json");

var database = {
    ready: false,
    db: undefined
};

Mongo.connect(url, function(db){
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

};

var getLocalUrl = function(type, title, index){
    return "/" + type + "/" + title + "/" + index.toString()
};

module.exports = {
    config: config,
    database: database,
    getLocalUrl: getLocalUrl
};
