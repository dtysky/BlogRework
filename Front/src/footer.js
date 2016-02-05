'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Link = require('react-router').Link;
var links = require('./utils').config.links;

require('./theme/css/sky.css');

module.exports = React.createClass({
    render: function(){
        return (
            <footer id="home-links">
                <p>Links</p>
                <div id="home-links-phone">
                    {
                        links.map(function(item){
                            return (
                                <Link to={item.url} className="thank">{item.name}</Link>
                            )
                        })
                    }
                </div>
                <div id="home-menu-hr3-phone"></div>
                <p id="home-menu-end-phone">这是一个孤独行者的轨迹。</p>
            </footer>
        );
    }
});