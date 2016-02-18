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
            <div id="home-menu">
                <Link to="/articles/wo-de-jian-li.html" id="home-menu-name">dtysky</Link>
                <div id="player1" className="aplayer"></div>
                <div id="home-menu-icons">
                    <a href="/feeds/skill.rss.xml" className="home-menu-icon" target="_blank">
                        <img src="/theme/image/rss.png" alt="RSS"/>
                    </a>
                    <a href="https://github.com/dtysky" className="home-menu-icon" target="_blank">
                        <img src="/theme/image/github.png" alt="Github"/>
                    </a>
                    <a href="https://cn.linkedin.com/pub/tianyu-dai/a8/818/44a" className="home-menu-icon" target="_blank">
                        <img src="/theme/image/linked-in.png" alt="Linked-In"/>
                    </a>
                    <a href="http://psnprofiles.com/dtysky" className="home-menu-icon" target="_blank">
                        <img src="/theme/image/playstation.png" alt="Playstation"/>
                    </a>
                </div>
                <div id="home-menu-hr1"></div>
                <div>
                    <div>
                        <Link to="/" id="home-menu-home">Home</Link>
                    </div>
                    <div id="home-menu-tag-ath">
                        <Link to="/tags" id="home-menu-tags" >Tags</Link>
                        <Link to="/authors" id="home-menu-authors">Authors</Link>
                    </div>
                </div>
                <div id="home-menu-hr2"></div>
                <p id="home-menu-links-p">Links</p>
                <div id="home-menu-links">
                    <Link to="http://proj.dtysky.moe" id="home-menu-proj" target="_blank">Projects</Link>
                    <button id="home-menu-friend" onclick="$.actLinks('show')">Friends</button>
                </div>
                <div id="home-menu-hr3"></div>
                <p id="home-menu-end">这是一个孤独行者的轨迹。</p>
            </div>
        );
    }
});