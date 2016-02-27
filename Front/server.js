/**
 * Created by dtysky on 16/2/27.
 */
"use strict";

var express = require('express');
var path = require('path');
var request = require('request');

var server_url = "http://localhost:4444/";
var port = 2333;
var public_path = path.resolve(__dirname, "dist");
var log_path = path.resolve(__dirname, "logs");
var logger_console = require('tracer').colorConsole();
var logger_file = require('tracer').dailyfile({root: log_path, maxLogFiles: 10});

function log_info(){
    logger_console.info(arguments);
    logger_file.info(arguments);
}

function log_error(){
    logger_console.error(arguments);
    logger_file.error(arguments);
}

var app = express();

function log(req, res, next){
    log_info("Req", req.method, req.url);
    next();
}

app.use(log);

app.get("/sitemap", function(req, res){
    var url = server_url + "sitemap/all";
    log_info("Forwarding", url);
    try {
        request(url).pipe(res);
    }catch(e) {
        log_error(url, e);
    }
});

app.get("/feeds/:slug", function(req, res){
    var url = server_url + path.join("feeds", req.params.slug);
    log_info("Forwarding", url);
    try {
        request(url).pipe(res);
    }catch(e) {
        log_error(url, e);
    }
});

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

app.listen(port);
log_info("Server start:", port);