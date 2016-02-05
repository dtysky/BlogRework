'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Link = require('react-router').Link;

require('./theme/css/sky.css');

module.exports = React.createClass({
    render: function(){
        return (
            <div id="home-menu-phone">
                <Link to="/feeds/all.rss.xml" className="home-menu-icon-phone" target="_blank">
                    <img src="/theme/image/rss.png" alt="RSS"/>
                </Link>
                <Link to="https://github.com/dtysky" className="home-menu-icon-phone" target="_blank">
                    <img src="/theme/image/github.png" alt="Github"/>
                </Link>
                <Link to="/articles/wo-de-jian-li" className="home-menu-icon-phone">
                    <img src="/theme/image/resume.png" alt="Resume"/>
                </Link>
                <Link href="https://cn.linkedin.com/pub/tianyu-dai/a8/818/44a" className="home-menu-icon-phone" target="_blank">
                    <img src="/theme/image/linked-in.png" alt="Linked-In"/>
                </Link>
                <Link className="home-menu-icon-phone" href="http://psnprofiles.com/dtysky" target="_blank">
                    <img src="/theme/image/playstation.png" alt="Playstation"/>
                </Link>
                <div id="home-menu-hr1-phone"></div>
                <div className="home-menu-index-phone home-canbackchange">
                    <Link to="/tags" id="home-menu-tags-phone">Tags</Link>
                    <Link href="/" id="home-menu-home-phone">Home</Link>
                    <Link to="/authors" id="home-menu-authors-phone">Authors</Link>
                </div>
            </div>
        );
    }
});