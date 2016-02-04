/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Link = require('react-router').Link;
var Links = require('./utils').config.links;

module.exports = React.createClass({
    render: function(){
        return (
            <footer id="home-links">
                <p>Links</p>
                <div id="home-links-phone">
                    {
                        Links.map(function(item){
                            return (
                                <Link to={item.url} class="thank">{item.name}</Link>
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