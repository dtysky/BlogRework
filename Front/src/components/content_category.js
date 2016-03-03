'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react');
var ContentList = require('./content_list');

require('./../theme/css/sky.css');

module.exports = React.createClass({
    mixins: [ContentList],
    type: "category",
    getInitialState: function(){
        this.theme = this.props.params.name;
    },
    render: function(){
        return this.topRender();
    }
});