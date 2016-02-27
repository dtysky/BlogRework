'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Link = require('react-router').Link;
var config = require('./utils').config;
var links = config.links;
var theme_color = config.theme_color;

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            links_is_open: false
        };
    },
    changeThemeRequire: function(info){
        this.props.changeTheme(info, true);
    },
    changeThemeToDefault: function(){
        this.props.changeTheme(this.props.theme_default, false);
    },
    setDefaultTheme: function(info){
        this.props.setDefaultTheme(info);
    },
    showLinks: function(){
        this.setState({
            links_is_open: true
        });
    },
    hideLinks: function(){
        this.setState({
            links_is_open: false
        });
    },
    componentDidUpdate: function(){
        document.getElementsByClassName("home-menu")[0].style.backgroundColor = theme_color[this.props.theme_info];
    },
    render: function(){
        var self = this;
        return (
            <div className="home-menu duration-1s">
                <Link to="/articles/wo-de-jian-li.html" id="home-menu-name">dtysky</Link>
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
                    <a
                        id="home-menu-proj"
                        href="http://proj.dtysky.moe"
                        target="_blank"
                    >
                        Projects
                    </a>
                    <button
                        id="home-menu-friend"
                        onClick={this.showLinks}
                    >
                        Friends
                    </button>
                </div>
                <div className="home-menu-hr3"></div>
                <p className="home-menu-end">这是一个孤独行者的轨迹。</p>
                <div
                    id="home-links"
                    style={{
                        top: this.state.links_is_open ? 0 : -400,
                        backgroundColor: theme_color[this.props.theme_info]
                    }}
                >
                    <ul>
                        {
                            links.map(function(item){
                                return (
                                    <li><a
                                        target="_blank"
                                        href={item.url}
                                        className="thank"
                                    >
                                        {item.name}
                                    </a></li>
                                );
                            })
                        }
                        <li><button
                            onClick={this.hideLinks}
                        >
                            Hide Links
                        </button></li>
                    </ul>
                </div>
            </div>
        );
    }
});