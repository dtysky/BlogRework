/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
    render: function(){
        return (
            <div id="home-menu-phone">
                <Link to="/feeds/all.rss.xml" class="home-menu-icon-phone" target="_blank">
                    <img src="/theme/image/rss.png" alt="RSS"/>
                </Link>
                <Link to="https://github.com/dtysky" class="home-menu-icon-phone" target="_blank">
                    <img src="/theme/image/github.png" alt="Github"/>
                </Link>
                <Link to="/articles/wo-de-jian-li" class="home-menu-icon-phone">
                    <img src="/theme/image/resume.png" alt="Resume"/>
                </Link>
                <Link href="https://cn.linkedin.com/pub/tianyu-dai/a8/818/44a" class="home-menu-icon-phone" target="_blank">
                    <img src="/theme/image/linked-in.png" alt="Linked-In"/>
                </Link>
                <Link class="home-menu-icon-phone" href="http://psnprofiles.com/dtysky" target="_blank">
                    <img src="/theme/image/playstation.png" alt="Playstation"/>
                </Link>
                <div id="home-menu-hr1-phone"></div>
                <div class="home-menu-index-phone home-canbackchange">
                    <Link to="/tags" id="home-menu-tags-phone">Tags</Link>
                    <Link href="/" id="home-menu-home-phone">Home</Link>
                    <Link to="/authors" id="home-menu-authors-phone">Authors</Link>
                </div>
            </div>
        );
    }
});