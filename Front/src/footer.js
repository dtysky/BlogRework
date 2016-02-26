/**
 * Created by dtysky on 16/2/3.
 */
'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;

var config = require('./utils').config;
var links = config.links;
var theme_color = config.theme_color;

require('./theme/css/sky.css');

module.exports = React.createClass({
    componentDidUpdate: function(){
        document.getElementsByTagName("footer")[0].style.backgroundColor = theme_color[this.props.theme_info];
    },
    render: function(){
        return (
            <footer className="duration-1s">
                <p>Links</p>
                <div id="home-links-phone">
                    {
                        links.map(function(item){
                            return (
                                <a
                                    target="_blank"
                                    href={item.url}
                                    className="thank"
                                >
                                    {item.name}
                                </a>
                            );
                        })
                    }
                </div>
                <div id="home-menu-hr3-phone"></div>
                <p id="home-menu-end-phone">这是一个孤独行者的轨迹。</p>
            </footer>
        );
    }
});