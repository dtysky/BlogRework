/**
 * Created by dtysky on 16/2/27.
 */
"use strict";

var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');

var port = 2333;
var public_path = path.resolve(__dirname, "dist");
var log_path = path.resolve(__dirname, "logs");
var logger_console = require('tracer').colorConsole();
var logger_file = require('tracer').dailyfile({root: log_path, maxLogFiles: 10});

var has = require("./templates/utils").has;
var errorHandler = require("./templates/utils").errorHandler;
var getListContent = require("./templates/utils").getListContent;
var getPageContent = require("./templates/utils").getPageContent;


var config = JSON.parse(fs.readFileSync("./config.json"));
var site_title = config.site_title;
var server_url = config.server_url;
var outer_links = config.links;
var articles_per_page = config.articles_per_page;

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
    var url = server_url + "/" + path.join("feeds", req.params.slug);
    log_info("Forwarding", url);
    try {
        request(url).pipe(res);
    }catch(e) {
        log_error(url, e);
    }
});


//Handlers for search engine

//From: http://blog.vararu.org/adding-pushstate-support-mean-seo/
//Adding this to html header:
//<meta name="fragment" content="!">
function SEO(req, res, next) {
    var escapedFragment = req.query._escaped_fragment_;
    if (escapedFragment !== undefined) {
        res.redirect("/jade" + req.baseUrl)
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
            outer_links: outer_links
        });
    });
});

app.get("/jade/:type", function(req, res){
    var type = req.params.type;
    if(has(["tags", "authors"], type)){
        res.render("special_page", {
            type: req.params.type,
            site_title: site_title,
            outer_links: outer_links
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
                outer_links: outer_links
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
            outer_links: outer_links
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
            outer_links: outer_links
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
            outer_links: outer_links
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
            outer_links: outer_links
        });
    });
});


//Handler for user

app.use(express.static(
    public_path,
    {
        setHeaders: function (res, p, stat) {
            var name = path.basename(p);
            if(name === "bundle.js" || name === "main.css"){
                log_info(name);
                res.set({
                    "Content-Encoding": "gzip"
                });
            }
        }
    }
));

app.get('*', function (request, response){
    response.sendFile(path.join(public_path, 'index.html'))
});


app.listen(port, function(){
    log_info("Server start:", port);
});