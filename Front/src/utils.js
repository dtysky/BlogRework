'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var velocityHelpers = require('velocity-react').velocityHelpers;


var config = {
    "site_title": "dtysky|一个行者的轨迹",
    //"site_url": "http://dtysky.moe",
    "site_url": "http://localhost:8000",
    "server_url": "http://localhost:4444",
    "tag_cloud_step": 4,
    "articles_per_page": 10,
    "animation_default_duration": 800,
    "links": [
        {"name": "Pelican", "url" : "http://getpelican.com"},
        {"name": "Lm7", "url" : "http://lm7.xxxxxxxx.jp"},
        {"name": "JqColor", "url" : "https://github.com/jquery/jquery-color"},
        {"name": "APlayer", "url" : "https://github.com/DIYgod/APlayer"},
        {"name": "Glyph", "url" : "http://glyphicons.com"},
        {"name": "Nekohand", "url" : "http://blog.nekohand.moe/"}
    ],
    "theme_color": {
        "Create": "#586181",
        "Skill": "#808d6a",
        "Art": "#a69e5c",
        "Life": "#b57e79",
        "home": "#6ca82b",
        "tags": "#12678e",
        "authors": "#72944e",
        "404": "#666666"
    },
    "theme_background": {
        "Create": "theme/image/create.jpg",
        "Skill": "theme/image/skill.jpg",
        "Art": "theme/image/art.jpg",
        "Life": "theme/image/life.jpg",
        "home": "theme/image/home.jpg",
        "tags": "theme/image/tags.jpg",
        "authors": "theme/image/authors.jpg",
        "404": "theme/image/404.jpg"
    }
};

var getLocalUrl = function(type, name, index){
    return index === null ? "/" + type + "/" + name : "/" + type + "/" + name + "/" + index.toString();
};

var redirect = function(){
    console.log("Redirect to 404");
    window.location.href = "/#/404";
};

var colorNextEffect = function(color_info){
    return velocityHelpers.registerEffect({
        defaultDuration: config.animation_default_duration,
        calls:[
            [{
                backgroundColor: config.theme_color[color_info]
            },
                1,
                {
                    delay: 0,
                    easing: "ease-in"
                }]
        ]
    });
};

module.exports = {
    config: config,
    getLocalUrl: getLocalUrl,
    redirect: redirect,
    colorNextEffect: colorNextEffect
};
