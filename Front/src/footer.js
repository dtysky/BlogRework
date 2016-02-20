/**
 * Created by dtysky on 16/2/3.
 */
'use strict';

require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react/addons');
var Link = require('react-router').Link;
var VelocityComponent = require('velocity-react').VelocityComponent;

var config = require('./utils').config;
var theme_color = config.theme_color;
var links = config.links;
var colorNextEffect = require('./utils').colorNextEffect;

require('./theme/css/sky.css');

module.exports = React.createClass({
    render: function(){
        return (
            <VelocityComponent animation={colorNextEffect(this.props.theme_info)}>
                <footer>
                    <p>Links</p>
                    <div id="home-links-phone">
                        {
                            links.map(function(item){
                                return (
                                    <Link to={item.url} className="thank">{item.name}</Link>
                                );
                            })
                        }
                    </div>
                    <div id="home-menu-hr3-phone"></div>
                    <p id="home-menu-end-phone">这是一个孤独行者的轨迹。</p>
                </footer>
            </VelocityComponent>
        );
    }
});