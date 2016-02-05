'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Link = require('react-router').Link;
var Loading = require('react-loading');
var format = require('util').format;

var Pagination = require('./pagination');
var database = require('./utils').database;
var getLocalUrl = require('./utils').getLocalUrl;
var site_title = require('./utils').config.site_title;

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            max_index: 1,
            content: []
        };
    },
    getInfo: function(){
        var collection = database.db.collection(this.props.type);
        var totle_count = 0;
        collection.find({
            name: this.props.name
        }).sort({
            date: -1
        }).toArray(
            function(err, data){
                if(err || data.length === 0){
                    this.setState({
                        state: "error"
                    });
                }
                totle_count = data.length;
                var max_index = parseInt(totle_count / 10) + 1;
                var left = this.props.index;
                var right = left + 10 < max_index ? left + 10 : max_index;
                var view = data[0].view;
                this.setState({
                    state: "ok",
                    max_index: max_index,
                    content: data.slice(left, right)
                });
                this.props.handleHead({
                    title: format("%s-%d - %s", view, this.props.index, site_title),
                    keywords: format("%s", view),
                    description: (this.props.description ? this.props.description : format("这是有关%s的所有文章", view)),
                    author: "dtysky,命月天宇"
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
                                            to={getLocalUrl("article", item.slug, 0)}
                                            rel="bookmark"
                                            title={item.title}
                                        >
                                            <h3>{item.title}</h3>
                                        </Link>
                                    </div>
                                    <div>
                                        <p>{item.summary}</p>
                                        <hr className='home-main-content-ghr'/>
                                        {
                                            item.author.map(function(author){
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
                                            item.tag.map(function(tag){
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
                    now_index={this.props.index}
                    max_index={this.state.max_index}
                />
            </div>
        );
    }
});