'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Link = require('react-router').Link;
var Loading = require('react-loading');
var format = require('util').format;

var Pagination = require('./pagination');
var cache = require('./cache');
var getLocalUrl = require('./utils').getLocalUrl;
var config = require('./utils').config;
var site_title = config.site_title;
var server_url = config.server_url;
var articles_per_page = config.articles_per_page;

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            max_index: 1,
            now_index: 0,
            content: []
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
                data.content.sort({
                    "date": -1
                });
                cache.add(name, data);
            }.bind(this),
            error: function(obj, info, ex){
                console.log(obj);
                if(obj.status === 404){
                    //重定向到404页面
                    console.log("rediret");
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
        var totle_count = data.content.length;
        var max_index = parseInt(totle_count / articles_per_page) + 1;
        var left = this.props.index === undefined ? 0 : parseInt(this.props.index);
        var right = left + articles_per_page < max_index ? left + articles_per_page : max_index;
        var view = data.view;
        this.setState({
            state: "ok",
            now_index: left,
            max_index: max_index,
            content: data.content.slice(left, right)
        });
        this.props.handleHead({
            title: (
                this.props.title ?
                    this.props.title :
                    format(
                        "%s-%d - %s",
                        view,
                        this.state.now_index,
                        site_title
                    )
            ),
            keywords: format(
                "%s",
                view
            ),
            description: (
                this.props.description ?
                    this.props.description :
                    format(
                        "这是有关%s的所有文章",
                        view
                    )
            ),
            author: "dtysky,命月天宇"
        });
    },
    componentDidMount: function(){
        var self = this;
        var name = format(
            "%s/%s",
            this.props.type,
            this.props.name
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
        else{
            self.getInfo(name);
        }
    },
    render: function(){
        if (this.state.state === "error"){
            return (<div className="content-error">Error!</div>);
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
            <div className="content-list">
                <ul>
                    {
                        this.state.content.map(function(item){
                            return (
                                <article>
                                    <div>
                                        <Link
                                            to={getLocalUrl("article", item.slug, null)}
                                            rel="bookmark"
                                            title={item.title.view}
                                        >
                                            <h3>{item.title.view}</h3>
                                        </Link>
                                    </div>
                                    <div>
                                        <p dangerouslySetInnerHTML={{__html: item.summary}}>
                                        </p>
                                        <hr className='home-main-content-ghr'/>
                                        {
                                            item.authors.map(function(author){
                                                return (
                                                    <Link
                                                        to={getLocalUrl("author", author.slug, 0)}
                                                    >
                                                        {author.view}
                                                    </Link>
                                                );
                                            })
                                        }
                                        <p>更新于</p>
                                        <p
                                            title={item.date}
                                        >
                                            {item.date}
                                        </p>
                                        <p>,</p>
                                        <p>路标：</p>
                                        {
                                            item.tags.map(function(tag){
                                                return (
                                                    <Link
                                                        to={getLocalUrl("tag", tag.slug, 0)}
                                                    >
                                                        {tag.view}
                                                    </Link>
                                                );
                                            })
                                        }
                                    </div>
                                </article>
                            );
                        })
                    }
                </ul>
                <Pagination
                    type={this.props.type}
                    name={this.props.name}
                    now_index={this.state.now_index}
                    max_index={this.state.max_index}
                />
            </div>
        );
    }
});