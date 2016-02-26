'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var config = {
    "site_title": "dtysky|一个行者的轨迹",
    //"site_url": "http://dtysky.moe",
    "site_url": "http://localhost:8000",
    "server_url": "http://localhost:4444",
    "disqus_short_name": 'dtysky',
    "tag_cloud_step": 4,
    "articles_per_page": 10,
    "animation_default_duration": 800,
    "links": [
        {"name": "Lm7", "url" : "http://lm7.xxxxxxxx.jp"},
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
        "Create": "/theme/image/create.jpg",
        "Skill": "/theme/image/skill.jpg",
        "Art": "/theme/image/art.jpg",
        "Life": "/theme/image/life.jpg",
        "home": "/theme/image/home.jpg",
        "tags": "/theme/image/tags.jpg",
        "authors": "/theme/image/authors.jpg",
        "404": "/theme/image/404.jpg"
    },
    "default_music": require('./default_music'),
    "share_templates": [
        ["qzone", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}"],
        ["qq", "http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}"],
        ["tencent", "http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}"],
        ["weibo", "http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}"],
        ["douban", "http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11"],
        ["linkedin", "http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin"],
        ["facebook", "https://www.facebook.com/sharer/sharer.php?u={{URL}}"],
        ["twitter", "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}"],
        ["google", 'https://plus.google.com/share?url={{URL}}']
    ]
};

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
