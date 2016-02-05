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

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            content: []
        };
    },
    getInfo: function(){
        var collection = database.db.collection("authors");
        collection
            .find()
            .toArray(function(err, data){
                if(err){
                    this.setState({
                        state: "error"
                    });
                }
                this.setState({
                    state: "ok",
                    content: data
                });
                this.props.handleHead({
                    title: format("%s - %s", "Authors", site_title),
                    keywords: "Authors",
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
            <ul id="authors-list">
                {
                    this.state.content.map(function(author){
                        return (
                            <li>
                                <Link
                                    to={getLocalUrl("authors", author.slug, null)}
                                >
                                    {author.view}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});