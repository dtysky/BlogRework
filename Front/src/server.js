/**
 * Created by dtysky on 16/2/27.
 * A mini size page which rendering from jade templates will be sent while the visitor is bot.
 * This server uses this method for SEO:
 * http://blog.vararu.org/adding-pushstate-support-mean-seo/
 * It just works for a part of search engine...
 */

"use strict";

var fs = require('fs');
var express = require('express');
var path = require('path');
var request = require('request');

var port = 233;
var public_path = './';
var log_path = path.resolve(public_path, "logs");
var logger_console = require('tracer').colorConsole();
var logger_file = require('tracer').dailyfile({root: log_path, maxLogFiles: 10});

var React = require('react');
var Router = require('react-router');
var renderToString = require('react-dom/server').renderToString;
var match = require('react-router/lib/match');
var RouterContext = require('react-router/lib/RoutingContext');
var routes = require('./routes');
var url = require('url');

var has = require("./templates/utils").has;
var errorHandler = require("./templates/utils").errorHandler;
var getListContent = require("./templates/utils").getListContent;
var getPageContent = require("./templates/utils").getPageContent;

var config = require("./config");
var site_title = config.site_title;
var server_url = config.server_url;
var outer_links = config.links;
var articles_per_page = config.articles_per_page;
var theme_background = config.theme_background;
var theme_color = config.theme_color;

var redirect_table = JSON.parse(fs.readFileSync("./table.json"));

function log_info(){
    logger_console.info(arguments);
    logger_file.info(arguments);
}

function log_error(){
    logger_console.error(arguments);
    logger_file.error(arguments);
}

var app = express();
app.set("view engine", "jade");
app.set("views", "./templates");

function log(req, res, next){
    log_info("Req", req.method, req.url);
    next();
}

app.use(log);

function redirect(req, res, next){
    if(req.path in redirect_table){
        log_info("Redirect: from", req.path, "to ", redirect_table[req.path]);
        res.redirect(301, redirect_table[req.path])
    }else{
        next();
    }
}

app.use(redirect);

app.use(express.static(
    public_path,
    {
        setHeaders: function (res, p, stat) {
            var name = path.extname(p);
            if(name === ".js" || name === ".css"){
                log_info(name);
                res.set({
                    "Content-Encoding": "gzip"
                });
            }
        }
    }
));

//Handlers for search engine

//From: http://blog.vararu.org/adding-pushstate-support-mean-seo/
//Adding this to html header:
//<meta name="fragment" content="!">
function SEO(req, res, next) {
    var escapedFragment = req.query._escaped_fragment_;
    if (escapedFragment !== undefined) {
        var parsed_url = url.parse(req.url);
        var rd_path = "/jade" + parsed_url.pathname;
        log_info("Redirect: from", req.path, "to ", rd_path);
        res.redirect(rd_path);
    } else {
        next();
    }
}
app.use(SEO);

app.get("/jade/", function(req, res){
    var type = "archives";
    var index = 0;
    var option = {
        url: server_url + "/" + path.join(type, "all")
    };
    request(option, function(err, response, body) {
        if(err || response.statusCode !== 200){
            errorHandler(res);
            return;
        }
        var content = getListContent(body, index, articles_per_page);
        res.render("list", {
            title: "",
            type: "home",
            site_title: site_title,
            keywords: "dtysky,博客,blog,技术,文化",
            authors: "dtysky,命月天宇",
            rss_link: "/feeds/all",
            rss_title: site_title,
            pages: content.data,
            max_index: content.max_index,
            outer_links: outer_links,
            theme_background: theme_background,
            theme_color: theme_color,
            theme_info: "home"
        });
    });
});

app.get("/jade/:type", function(req, res){
    var type = req.params.type;
    if(has(["tags", "authors"], type)){
        res.render("special_page", {
            type: req.params.type,
            site_title: site_title,
            outer_links: outer_links,
            theme_background: theme_background,
            theme_color: theme_color,
            theme_info: type
        });
    }
    else if (type == "archives"){
        var index = 0;
        var option = {
            url: server_url + "/" + path.join(type, "all")
        };
        request(option, function(err, response, body) {
            if(err || response.statusCode !== 200){
                errorHandler(res);
                return;
            }
            var content = getListContent(body, index, articles_per_page);
            res.render("list", {
                title: type,
                type: req.params.type,
                site_title: site_title,
                keywords: content.view,
                authors: "dtysky,命月天宇",
                rss_link: "/feeds/all",
                rss_title: site_title,
                pages: content.data,
                max_index: content.max_index,
                outer_links: outer_links,
                theme_background: theme_background,
                theme_color: theme_color,
                theme_info: "home"
            });
        });
    }
    else{
        errorHandler(res);
    }
});


app.get("/jade/archives/:index", function(req, res){
    var type = "archives";
    var index = parseInt(req.params.index);
    var option = {
        url: server_url + "/" + path.join(type, "all")
    };
    request(option, function(err, response, body) {
        if (err || response.statusCode !== 200) {
            errorHandler(res);
            return;
        }
        var content = getListContent(body, index, articles_per_page);
        if(index >= content.max_index){
            errorHandler(res);
            return;
        }
        res.render("list", {
            title: type,
            type: req.params.type,
            site_title: site_title,
            keywords: content.view,
            authors: "dtysky,命月天宇",
            rss_link: "/feeds/all",
            rss_title: site_title,
            pages: content.data,
            max_index: content.max_index,
            outer_links: outer_links,
            theme_background: theme_background,
            theme_color: theme_color,
            theme_info: "home"
        });
    });
});


app.get("/jade/article/:name", function(req, res){
    var type = "article";
    var name = req.params.name;
    var option = {
        url: server_url + "/" + path.join(type, name)
    };
    request(option, function(err, response, body) {
        if (err || response.statusCode !== 200) {
            errorHandler(res);
            return;
        }
        var content = getPageContent(body);
        res.render("article", {
            site_title: site_title,
            keywords: content.keywords,
            authors: content.authors,
            page: content.page,
            outer_links: outer_links,
            theme_background: theme_background,
            theme_color: theme_color,
            theme_info: content.page.category.view
        });
    });
});

app.get("/jade/:type/:name", function(req, res){
    var type = req.params.type;
    var name = req.params.name;
    var index = 0;
    var option = {
        url: server_url + "/" + path.join(type, name)
    };
    request(option, function(err, response, body) {
        if (err || response.statusCode !== 200) {
            errorHandler(res);
            return;
        }
        var content = getListContent(body, index, articles_per_page);
        res.render("list", {
            title: name,
            type: req.params.type,
            site_title: site_title,
            keywords: content.view,
            authors: "dtysky,命月天宇",
            rss_link: type === "tag" ? "/feeds/all" : "/feeds/" + content.view,
            rss_title: type === "tag" ? site_title : content.view + "-" + site_title,
            pages: content.data,
            max_index: content.max_index,
            outer_links: outer_links,
            theme_background: theme_background,
            theme_color: theme_color,
            theme_info: type === "category" ? name : type
        });
    });
});

app.get("/jade/:type/:name/:index", function(req, res){
    var type = req.params.type;
    var name = req.params.name;
    var index = parseInt(req.params.index);
    var option = {
        url: server_url + "/" + path.join(type, name)
    };
    request(option, function(err, response, body) {
        if (err || response.statusCode !== 200) {
            errorHandler(res);
            return;
        }
        var content = getListContent(body, index, articles_per_page);
        if(index >= content.max_index){
            errorHandler(res);
            return;
        }
        res.render("list", {
            title: name,
            type: req.params.type,
            site_title: site_title,
            keywords: content.view,
            authors: "dtysky,命月天宇",
            rss_link: type === "tag" ? "/feeds/all" : "/feeds/" + content.view,
            rss_title: type === "tag" ? site_title : content.view + "-" + site_title,
            pages: content.data,
            max_index: content.max_index,
            outer_links: outer_links,
            theme_background: theme_background,
            theme_color: theme_color,
            theme_info: type === "category" ? name : type
        });
    });
});

//Handlers for sitemap and feeds, forwarding to Back

app.get("/sitemap", function(req, res){
    var url = server_url + "/sitemap/all";
    log_info("Forwarding", url);
    try {
        request(url).pipe(res);
    }catch(e) {
        log_error(url, e);
    }
});

app.get("/feeds/:slug", function(req, res){
    var url = server_url + "/" + path.join("feeds", req.params.slug.replace(".rss.xml", ""));
    log_info("Forwarding", url);
    try {
        request(url).pipe(res);
    }catch(e) {
        log_error(url, e);
    }
});

//Handler for user

app.get("*", function(req, res){
    match(
        {
            routes: routes,
            location: req.url
        },
        function(error, redirectLocation, renderProps) {
        if (error) {
            res.status(500).end(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.status(200).end(
                fs.readFileSync("./base.html").toString().replace(
                    "{{markup}}",
                    renderToString(<RouterContext {...renderProps}/>)
                )
            )
        } else {
            res.status(404).end('Not found')
        }
    })
});

app.listen(port, function(){
    log_info("Server start:", port);
});