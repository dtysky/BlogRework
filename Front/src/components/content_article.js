'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react');
var Link = require('react-router').Link;
var format = require('util').format;

var Loading = require('./loading');
var NormalError = require('./normal_error');
var Share = require('./share');

var cache = require('./../cache');
var getLocalUrl = require('./../utils').getLocalUrl;
var redirect = require('./../utils').redirect;
var config = require('./../utils').config;
var site_title = config.site_title;
var server_url = config.server_url;
var theme_color = config.theme_color;
var mathjax_url = config.mathjax_url;

require('./../theme/css/sky.css');
require('./../theme/css/article.css');
require('./../theme/css/pygments.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            title: "",
            slug: "",
            authors: [],
            tags: [],
            category: "",
            summary: [],
            content: ""
        };
    },
    getAll: function(name){
        this.setState({
            state: "wait"
        });
        $.ajax({
            url: format(
                "%s/%s",
                server_url,
                name
            ),
            success: function(data, status){
                cache.add(name, data);
            }.bind(this),
            error: function(obj, info, ex){
                console.log(obj);
                if(obj.status === 404){
                    redirect();
                }
                else{
                    this.setState({
                        state: "error"
                    });
                }
            }.bind(this)
        });
    },
    getInfo: function(name){
        var data = cache.get(name);
        this.setState({
            state: "ok",
            title: data.content.title.view,
            slug: data.content.slug,
            authors: data.content.authors,
            tags: data.content.tags,
            category: data.content.category,
            date: data.content.date,
            summary: data.content.summary,
            content: data.content.content
        });
        var authors = data.content.authors.map(function(item){
            return item.view;
        });
        var tags = data.content.tags.map(function(item){
            return item.view;
        });
        this.props.handleHead({
            title: format("%s - %s", data.view, site_title),
            keywords: tags.join(","),
            description: data.content.summary,
            author: authors.join(","),
            rss: format(
                "/feeds/%s",
                data.content.category.slug
            )
        });
        var theme_info = data.content.category.view;
        this.props.setDefaultTheme(theme_info);
        this.props.changeTheme(theme_info, true);
        this.props.setMusicList(
            data.content.music === undefined ? [] : data.content.music
        );
    },
    updateData: function(props){
        var self = this;
        var name = format(
            "%s/%s",
            "article",
            props.params.name
        );
        if(!cache.has(name)){
            this.getAll(name);
            var timeoutId = 0;
            var fun = function() {
                if (cache.has(name)) {
                    clearTimeout(timeoutId);
                    self.getInfo(name);
                }
                else if (self.state.state  !== "error"){
                    timeoutId = setTimeout(fun, 200);
                }
            };
            fun();
        }
        else{
            self.getInfo(name, props.index);
        }
    },
    openDisqus: function(){
        document.getElementById("disqus_thread").removeChild(document.getElementById("disqus_button"));
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + config.disqus_short_name + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    },
    showMath: function(){
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                processEscapes: true
            }
        });
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    },
    componentDidMount: function(){
        this.updateData(this.props);
        var script = document.createElement("script");
        script.src = mathjax_url;
        script.async = true;
        document.body.appendChild(script);
    },
    shouldComponentUpdate: function(nextProps, nextState){
        if(
            (
                this.props.name !== nextProps.name ||
                this.props.index !== nextProps.index
            ) &&
            this.state.state === nextState.state
        ){
            this.updateData(nextProps);
        }
        return true;
    },
    componentDidUpdate: function(){
        var elements = document.getElementsByTagName("blockquote");
        for(var i=0; i<elements.length; i++){
            elements[i].style.backgroundColor = theme_color[this.props.theme_info];
        }
        elements = document.getElementsByClassName("home-article-sphr");
        for(i=0; i<elements.length; i++){
            elements[i].style.backgroundColor = theme_color[this.props.theme_info];
        }
        try{
            this.showMath();
        }
        catch(e){
            setTimeout(this.showMath, 200);
        }
    },
    showArticle: function(){
        var url = format(
            "%s/%s/%s",
            config.site_url,
            "article",
            encodeURIComponent(this.state.slug)
        );
        return <article className="home-article">
            <Share
                key="share"
                info={{
                    url: url,
                    title: format("%s - %s", this.state.title, site_title),
                    description: this.state.summary,
                    summary: this.state.summary,
                    image: (document.images[document.images.length] || 0).src || '',
                    site: site_title,
                    site_url: config.site_url,
                    source: url
                }}
                theme={this.props.theme_info}
            />
            <div className="home-article-top description">
                <h1>{this.state.title}</h1>
                <p>
                    少女
                    {
                        this.state.authors.map(function(author){
                            return (
                                <Link
                                    to={getLocalUrl("author", author.slug, 0)}
                                >
                                    {author.view}
                                </Link>
                            );
                        })
                    }
                    于 {this.state.date} 在
                    <Link
                        to={getLocalUrl("category", this.state.category.slug, 0)}
                    >
                        {this.state.category.view}
                    </Link>
                    世界内创作
                </p>
                <p>
                    路标：
                    {
                        this.state.tags.map(function(tag){
                            return (
                                <Link
                                    to={getLocalUrl("tag", tag.slug, 0)}
                                >
                                    {tag.view}
                                </Link>
                            );
                        })
                    }
                </p>
                <div className="home-article-sphr duration-1s"></div>
            </div>
            <div className="home-article-middle" dangerouslySetInnerHTML={{__html: this.state.content}}>
            </div>
            <div id="disqus_container">
                <div id="disqus_thread">
                    <a
                        id="disqus_button"
                        onClick={this.openDisqus}
                    >
                        <span
                            className="home-icon-disqus"
                        >

                        </span>
                        点击查看评论
                    </a>
                </div>
            </div>
            <div className="home-article-bottom">
                <div className="home-article-sphr duration-1s"></div>
                <p>如果不是自己的创作,少女是会标识出来的,所以要告诉别人是少女写的哦。</p>
            </div>
        </article>;
    },
    render: function(){
        if (this.state.state === "error"){
            return <NormalError key="normal-error"/>;
        }
        if (this.state.state === "wait"){
            return <Loading key="wait"/>;
        }
        return this.showArticle();
    }
});