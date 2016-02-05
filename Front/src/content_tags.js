'use strict';
/**
 * Created by dtysky on 16/2/3.
 */



var React = require('react/addons');
var Link = require('react-router').Link;
var Loading = require('react-loading');
var format = require('util').format;

var database = require('./utils').database;
var getLocalUrl = require('./utils').getLocalUrl;
var site_title = require('./utils').config.site_title;
var tag_cloud_size = require("./utils").config.tag_cloud_size;

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            content: []
        };
    },
    getTagCloud: function(tags){
        var max = tags.sort({
            count: -1
        })[0].count;
        var base = (max + 1) / tag_cloud_size;
        return tags.map(function(tag){
            return {
                name: tag.view,
                url: getLocalUrl("tags", tag.slug, null),
                style: format("%s-%d", "tag", parseInt(tag.count / base))
            };
        });
    },
    getInfo: function(){
        var collection = database.db.collection("tags");
        collection
            .find()
            .toArray(function(err, data){
                if(err){
                    this.setState({
                        state: "error"
                    });
                }
                var content = this.getTagCloud(data);
                this.setState({
                    state: "ok",
                    content: content
                });
                this.props.handleHead({
                    title: format("%s - %s", "Tags", site_title),
                    keywords: "Tags",
                    description: "所有的路标",
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
            <ul id="tag-cloud">
                {
                    this.state.content.map(function(tag){
                        return (
                            <li>
                                <Link
                                    to={tag.url}
                                    class={tag.style}
                                >
                                    {tag.view}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});