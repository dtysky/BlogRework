'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Loading = require('react-loading');
var Link = require('react-router').Link;
var format = require('util').format;

var cache = require('./cache');
var getLocalUrl = require('./utils').getLocalUrl;
var redirect = require('./utils').redirect;
var config = require('./utils').config;
var site_title = config.site_title;
var server_url = config.server_url;
var site_url = config.site_url;

require('./theme/css/sky.css');
require('./theme/css/article.css');
require('./theme/css/pygments.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            title: "",
            slug: "",
            authors: [],
            tags: [],
            category: "",
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
            success: function(result, status){
                var data = JSON.parse(result);
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
            content: data.content.content
        });
        var authors = data.content.author.map(function(item){
            return item.view;
        });
        var tags = data.content.tags.map(function(item){
            return item.view;
        });
        this.props.handleHead({
            title: format("%s - %s", data.view, site_title),
            keywords: tags.join(","),
            description: data.content.summary,
            author: authors.join(",")
        });
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
                else {
                    timeoutId = setTimeout(fun, 500);
                }
            };
            fun();
        }
    },
    componentDidMount: function(){
        this.updateData(this.props);
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
        bShare.addEntry({
                title: format("%s - %s\n", this.state.title, site_title),
                url: format("%s%s", site_url, getLocalUrl("article", this.state.slug, 0)),
                summary: format("作者：%s\n%s", this.state.author, this.state.summary.replace('<p>','').replace('</p>',''))
        });
    },
    render: function(){
        if (this.state.state === "error"){
            return (
                <div className="content-error">Error!</div>
            );
        }
        if (this.state.state === "wait"){
            return (
                <div className="content-wait">
                    <Loading
                        type = "spin"
                        color = "#e3e3e3"
                    />
                </div>
            );
        }
        return (
            <div id="home-main-content">
                <article className="home-article">
                    <div className="plugin-share">
                        <a className="bshareDiv" href="http://www.bshare.cn/share">分享按钮</a>
                    </div>
                    <script
                        type="text/javascript"
                        charset="utf-8"
                        src="http://static.bshare.cn/b/buttonLite.js#uuid=4b985bfb-394b-4ee6-893b-1742af251c63&style=999&img=/theme/image/share.png&h=50&w=50&bp=sinaminiblog,weixin,renren,douban,facebook,twitter,linkedin,qzone,qqmb">
                    </script>
                    <div className="home-article-top">
                        <h1>{this.state.title}</h1>
                        <p>
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
                            更新于 {this.state.date} 在
                            <Link
                                to={getLocalUrl("category", this.state.category.slug, 0)}
                            >
                                {this.state.category.view}
                            </Link>
                            内
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
                        <div className="home-article-sphr"></div>
                    </div>
                    <div className="home-article-middle" dangerouslySetInnerHTML={{__html: this.state.content}}>
                    </div>
                    <div id="disqus_container">
                        <a href="#" className="disqus_button" onclick="return false;">点击查看评论</a>
                        <div id="disqus_thread"></div>
                    </div>
                    <div className="home-article-bottom">
                        <div className="home-article-sphr"></div>
                        <p>此博客所有文章若无特殊说明皆为博主原创，转载ß请声明出处。</p>
                    </div>
                </article>
            </div>
        );
    }
});