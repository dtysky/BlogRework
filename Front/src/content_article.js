'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Loading = require('react-loading');
var Link = require('react-router').Link;
var format = require('util').format;

var database = require('./utils').database;
var getLocalUrl = require('./utils').getLocalUrl;
var site_title = require('./utils').config.site_title;
var site_url = require('./utils').config.site_url;

require('./theme/css/sky.css');
require('./theme/css/article.css');
require('./theme/css/pygments.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            title: "",
            slug: "",
            author: [],
            tag: [],
            content: ""
        };
    },
    getInfo: function(){
        var collection = database.db.collection("article");
        collection.findOne({
            slug: this.props.name
        }, function(err, data){
            if(err){
                this.setState({
                    state: "error"
                });
            }
            this.setState({
                state: "ok",
                title: data.title,
                slug: data.slug,
                author: data.author,
                tag: data.tag,
                content: data.content
            });
            var author = data.author.map(function(item){
                return item.view;
            });
            var tag = data.tag.map(function(item){
                return item.view;
            });
            this.props.handleHead({
                title: format("%s - %s", data.title, site_title),
                keywords: tag.join(","),
                description: data.summary,
                author: author.join(",")
            });
        });
    },
    componentDidMount: function(){
        var timeoutId = 0;
        var fun = function() {
            if (database.ready) {
                clearTimeout(timeoutId);
                this.getInfo();
            }
            else {
                timeoutId = setTimeout(fun, 500);
            }
        };
        fun();
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
                            this.state.author.map(function(author){
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
                        {
                            this.state.category.map(function(category){
                                return (
                                    <Link
                                        to={getLocalUrl("category", category.slug, 0)}
                                    >
                                        {category.view}
                                    </Link>
                                );
                            })
                        }
                         内
                    </p>
                    <p>
                        路标：
                        {
                            this.state.tag.map(function(tag){
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
                <div className="home-article-middle">
                    {this.state.content}
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
        );
    }
});