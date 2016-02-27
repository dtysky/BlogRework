# BlogRework

[dtysky|一个行者的轨迹](http://dtysky.moe)

## Progress

Back -------- done.  

Front -------- 80%:  
Using server rendering  

Others ------ 0%:  
Deploying on the VPS 

## Description

This project is used for reworking my blog, here are what I did for my blog:  

### 2014.05

Creating my blog by pelican with a default theme.  
It was deployed on github:  
**https://dtysky.github.io**(It dosn't work now.)

### 2014.06

Changing the theme... emm, as you known, my aesthetics at that time, so...

### 2015.02

With the improved level of aesthetic quality, I  changed the theme again with using javascript and css animation, that theme is very close to it now.  
At the same time, I registered domains **dtysky.moe** and move the site to a DO VPS.

### 2016.02

I changed my career from FPGA enginner to software enginner(web).  
Emm...one day, I find a music player is needed so that i need make my blog from static to dynamic.  
That's the reason why i does these.  

## To(Never www)Do list

### Adding cache on server

One record will be added to cache while the server recives a request first time.  
All records in cache will be cleared when database is updated.

## Front

### Dependencies

Node.js  
React.js  
React-router  
Veloctiy-react  
React-modal  
Rrcode.react  
React-helmet  
Jquery  

## Dependencies-server
Express.js  
Tracer  
Request  
React and React-router(rendering on server))

### Dependencies-dev

Grunt  
Webpack  

### Adaptation

APlayer

### Finish

View  
Cache  
Router  
Social-share  
Animations with js and css3  
Music player(the music list can be defined in markdown)

## Back

### Dependencies

Python  
MongoDB  
Markdown  
Pygments  
Watch dog  
Flask  
Flask-compress

### Finish

Server  
Page parser (include feeds and sitemap generator)  
Database manager  
File state monitor  
Logger  
Router  