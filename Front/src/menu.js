'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react/addons');
var VelocityComponent = require('velocity-react').VelocityComponent;
var Link = require('react-router').Link;
var config = require('./utils').config;
var colorNextEffect = require('./utils').colorNextEffect;

require('./theme/css/sky.css');

module.exports = React.createClass({
    changeThemeRequire: function(info){
        this.props.changeTheme(info, true);
    },
    changeThemeToDefault: function(){
        this.props.changeTheme(this.props.theme_default, false);
    },
    setDefaultTheme: function(info){
        this.props.setDefaultTheme(info);
    },
    render: function(){
        var self = this;
        return (
            <VelocityComponent animation={colorNextEffect(this.props.theme_info)}>
                <div className="home-menu">
                    <Link to="/articles/wo-de-jian-li.html" id="home-menu-name">dtysky</Link>
                    <div id="player1" className="aplayer"></div>
                    <div className="home-menu-icons">
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
                    <div className="home-menu-hr1"></div>
                    <div>
                        <div>
                            <Link to="/" id="home-menu-home"
                                  onMouseEnter={function(e){self.changeThemeRequire("home");}}
                                  onMouseLeave={function(e){self.changeThemeToDefault();}}
                                  onClick={function(e){self.setDefaultTheme("home");}}
                            >
                                Home
                            </Link>
                        </div>
                        <div className="home-menu-tag-ath">
                            <Link to="/tags" id="home-menu-tags"
                                  onMouseEnter={function(e){self.changeThemeRequire("tags");}}
                                  onMouseLeave={function(e){self.changeThemeToDefault();}}
                                  onClick={function(e){self.setDefaultTheme("tags");}}
                            >
                                Tags
                            </Link>
                            <Link to="/authors" id="home-menu-authors"
                                  onMouseEnter={function(e){self.changeThemeRequire("authors");}}
                                  onMouseLeave={function(e){self.changeThemeToDefault();}}
                                  onClick={function(e){self.setDefaultTheme("authors");}}
                            >
                                Authors
                            </Link>
                        </div>
                    </div>
                    <div className="home-menu-hr2"></div>
                    <p className="home-menu-links-p">Links</p>
                    <div className="home-menu-links">
                        <Link id="home-menu-proj" to="http://proj.dtysky.moe" target="_blank">Projects</Link>
                        <button id="home-menu-friend" onclick="$.actLinks('show')">Friends</button>
                    </div>
                    <div className="home-menu-hr3"></div>
                    <p className="home-menu-end">这是一个孤独行者的轨迹。</p>
                </div>
            </VelocityComponent>
        );
    }
});