# BlogRework

[dtysky|一个行者的轨迹](http://dtysky.moe)

## Progress

Back -------- done.  

Front -------- done.  

Others ------ done.  

## Description

Reworking my blog, here are what I did for my blog:  

### 2014.05

Creating my blog with [pelican](https://github.com/getpelican/pelican) with a default theme.  
It was deployed on github:  
**https://dtysky.github.io**(It dosn't work now.)

### 2014.06

Changing the theme... emm, my aesthetics at that time, so... 

### 2015.02

With the improved level of aesthetic quality, I  changed the theme again with javascript and css animation, that theme is very close to it now.  
At the same time, I registered domains **dtysky.moe** and move the site to a VPS on DigitalOcean.  
This version is here now:  
[old.dtysky.moe](http://old.dtysky.moe)

### 2016.02

I changed my career from FPGA enginner to software enginner(web).  
Emm...one day, I felt a music player is necessary so that I need change my blog from static to dynamic.  
That's the reason why I do these.  

## To(Never www)Do list

### Adding cache on server

One record will be added to cache while the server recives a request first time.  
All records in cache will be cleared when database is updated.

### Using redux and ES7 to rework "Front" again

Well, this blog is not friendly with search enginner now(although I used react-router server side rendering and fragment meta tag now), for resolving this problem, I must use another framework to make the data sync between the server and client.  
Why using ES7?  
ES5... I can't writing clean code with it... 

## Front

### Platform
  
Node.js 0.10.37  
NPM 1.4.28  

### Dependencies
  
React  
React-router  
Veloctiy-react  
React-modal  
Rrcode.react  
React-helmet  
React-ga  
Jquery  

## Dependencies-server

Express.js  
Tracer  
Request  
Jade(One method for SEO, but it seems... does not work well)  
React and react-router(For server side rendering)

### Dependencies-dev

Grunt and plugins:  
clean, copy, compress, rename, uglify, file-creator  

Webpack and plugins:  
extract-text-webpack-plugin, babel, css-loader, file-loader, json-loader, react-hot-loader, url-loader, style-loader, jsxhint-loader

### Adaptation

[APlayer](https://github.com/DIYgod/APlayer):  
A beautiful music player, the one in blog is based on it with some changes.

### Finish

View:  
All pages.  

Cache:  
A cache for storing data, it's useful for reduce the number of requests.  

Router:  
In stie router with react-router.  

Social-share:  
Sharing articles to socal Apps.  

Animations with js and css3:  
Most of animations are based on css3, a little(title-bar and left-image) are based on velocity.  

Music player:  
The music list can be defined in markdown, if not, a default music list will be used.  

Server side rendering for SEO:  
React router server side rendering and full page rendering with jade.  

## Back

### Platform

Python 2.7.11

### Dependencies

MongoDB  
Markdown  
Pygments  
Watch dog  
Flask  
Flask-compress

### Finish

Most of these use  inheritance and reflection  so that I can add any new function easily.

Server:  
Web server for providing articles.  

Parser:  
File parsers and slug(URL) warppers.  

Feeds and sitemap generator:  
Generating the feeds and sitemap.  

Database manager:  
Writing articles to database with "Incremental build", the desgin of it is here:  
[Database desigin](https://github.com/dtysky/BlogRework/blob/master/Back/Database.md)  

File state monitor:  
Monitoring state of pages , if there are files changed, it will check database and call parsers, warppers and database writers to update database.  

Logger:  
A logger for recording infomations, errors and warnings.  

## Others

Forever.js is used for starting all servers as daemons. 