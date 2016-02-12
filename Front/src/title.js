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
            <div id="home-main-title">
                <div id="title-list">
                    <li id="title-create"><Link to="/category/create">Create</Link></li>
                    <li id="title-skill"><Link to="/category/skill">Skill</Link></li>
                    <li id="title-art"><Link to="/category/art">Art</Link></li>
                    <li id="title-life"><Link to="/category/life">Life</Link></li>
                </div>
                <div className="home-main-title-bar">
                    <span id="title-bar"/>
                </div>
            </div>
        );
    }
});