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
        var self= this;
        return (
            <VelocityComponent animation={colorNextEffect(self.props.theme_info)}>
                <div id="home-menu-phone">
                    <div className="top">
                        <a href="/feeds/all.rss.xml" className="home-menu-icon-phone" target="_blank">
                            <img src="/theme/image/rss.png" alt="RSS"/>
                        </a>
                        <a href="https://github.com/dtysky" className="home-menu-icon-phone" target="_blank">
                            <img src="/theme/image/github.png" alt="Github"/>
                        </a>
                        <a href="/articles/wo-de-jian-li" className="home-menu-icon-phone">
                            <img src="/theme/image/resume.png" alt="Resume"/>
                        </a>
                        <a href="https://cn.linkedin.com/pub/tianyu-dai/a8/818/44a" className="home-menu-icon-phone" target="_blank">
                            <img src="/theme/image/linked-in.png" alt="Linked-In"/>
                        </a>
                        <a className="home-menu-icon-phone" href="http://psnprofiles.com/dtysky" target="_blank">
                            <img src="/theme/image/playstation.png" alt="Playstation"/>
                        </a>
                    </div>
                    <div id="home-menu-hr1-phone"></div>
                    <div className="bottom">
                        <div id="home-menu-index-phone" className="home-canbackchange">
                            <Link to="/tags" id="home-menu-tags-phone"
                                  onMouseEnter={function(e){self.changeThemeRequire("tags");}}
                                  onMouseLeave={function(e){self.changeThemeToDefault();}}
                                  onClick={function(e){self.setDefaultTheme("tags");}}
                            >
                                Tags
                            </Link>
                            <Link to="/" id="home-menu-home-phone"
                                  onMouseEnter={function(e){self.changeThemeRequire("home");}}
                                  onMouseLeave={function(e){self.changeThemeToDefault();}}
                                  onClick={function(e){self.setDefaultTheme("home");}}
                            >
                                Home
                            </Link>
                            <Link to="/authors" id="home-menu-authors-phone"
                                  onMouseEnter={function(e){self.changeThemeRequire("authors");}}
                                  onMouseLeave={function(e){self.changeThemeToDefault();}}
                                  onClick={function(e){self.setDefaultTheme("authors");}}
                            >
                                Authors
                            </Link>
                        </div>
                    </div>
                </div>
            </VelocityComponent>
        );
    }
});