/**
 * Created by dtysky on 16/2/27.
 */
"use strict";

var express = require('express');
var path = require('path');
var request = require('request');

var server_url = "http://localhost:4444";
var port = 2333;
var public_path = path.resolve(__dirname, "dist");
var log_path = path.resolve(__dirname, "logs");
var logger_console = require('tracer').colorConsole();
var logger_file = require('tracer').dailyfile(log_path);

function log_info(){
    logger_console.info(arguments);
    logger_file.info(arguments);
}

function log_warn(){
    logger_console.warn(arguments);
    logger_file.warn(arguments);
}

function log_error(){
    logger_console.error(arguments);
    logger_file.error(arguments);
}

var app = express();

function log(err, req, res, next){
    log_info("Req: ", req);
    if(err !== null){
        log_error("Error: ", err);
        next(err);
    }
    next();
}

app.use(log);

app.get("/sitmap", function(req, res){
    log_info(req);
    request(path.resolve(server_url, "sitemap")).pipe(res);
});

app.get("/feeds/:slug", function(req, res){
    log_info(req);
    request(path.resolve(server_url, "feeds", req.params.slug)).pipe(res);
});

//app.use(express.static(public_path));

app.listen(port);
log_info("Server start:", port);