'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var config = {
    "site_title": "dtysky|一个行者的轨迹",
    //"site_url": "http://dtysky.moe",
    "site_url": "http://localhost:8000",
    "server_url": "http://localhost:4444",
    "tag_cloud_step": 4,
    "articles_per_page": 10,
    "links": [
        {"name": "Pelican", "url" : "http://getpelican.com"},
        {"name": "Lm7", "url" : "http://lm7.xxxxxxxx.jp"},
        {"name": "JqColor", "url" : "https://github.com/jquery/jquery-color"},
        {"name": "APlayer", "url" : "https://github.com/DIYgod/APlayer"},
        {"name": "Glyph", "url" : "http://glyphicons.com"},
        {"name": "Nekohand", "url" : "http://blog.nekohand.moe/"}
    ],
    "theme_color": {
        "title-create": "#586181",
        "title-skill": "#808d6a",
        "title-art": "#a69e5c",
        "title-life": "#b57e79",
        "home-menu-home": "#6ca82b",
        "home-menu-tags": "#12678e",
        "home-menu-authors": "#72944e",
        "home-menu-home-phone": "#6ca82b",
        "home-menu-tags-phone": "#12678e",
        "home-menu-authors-phone": "#72944e"
    },
    "theme_background": {
        "title-create": "/theme/image/create.jpg",
        "title-skill": "/theme/image/skill.jpg",
        "title-art": "/theme/image/art.jpg",
        "title-life": "/theme/image/life.jpg",
        "home-menu-home": "/theme/image/home.jpg",
        "home-menu-tags": "/theme/image/tags.jpg",
        "home-menu-authors": "/theme/image/authors.jpg",
        "home-menu-home-phone": "/theme/image/home.jpg",
        "home-menu-tags-phone": "/theme/image/tags.jpg",
        "home-menu-authors-phone": "/theme/image/tags.jpg"
    }
};

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
    getLocalUrl: getLocalUrl
};
