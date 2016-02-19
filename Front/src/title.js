'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react/addons');
var Link = require('react-router').Link;

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
            <div id="home-main-title">
                <div id="title-list">
                    <li id="title-create"
                        onMouseEnter={function(e){self.changeThemeRequire("Create");}}
                        onMouseLeave={function(e){self.changeThemeToDefault();}}
                        onClick={function(e){self.setDefaultTheme("Create");}}
                    >
                        <Link to="/category/Create">Create</Link>
                    </li>
                    <li id="title-skill"
                        onMouseEnter={function(e){self.changeThemeRequire("Skill");}}
                        onMouseLeave={function(e){self.changeThemeToDefault();}}
                        onClick={function(e){self.setDefaultTheme("Skill");}}
                    >
                        <Link to="/category/Skill">Skill</Link>
                    </li>
                    <li id="title-art"
                        onMouseEnter={function(e){self.changeThemeRequire("Art");}}
                        onMouseLeave={function(e){self.changeThemeToDefault();}}
                        onClick={function(e){self.setDefaultTheme("Art");}}
                    >
                        <Link to="/category/Art">Art</Link>
                    </li>
                    <li id="title-life"
                        onMouseEnter={function(e){self.changeThemeRequire("Life");}}
                        onMouseLeave={function(e){self.changeThemeToDefault();}}
                        onClick={function(e){self.setDefaultTheme("Life");}}
                    >
                        <Link to="/category/Life">Life</Link>
                    </li>
                </div>
                <div className="home-main-title-bar">
                    <span id="title-bar"/>
                </div>
            </div>
        );
    }
});