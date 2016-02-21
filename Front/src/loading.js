'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react/addons');
var Loading = require('react-loading');

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
        return (
            <div className="content-wait">
                <Loading
                    type = "spin"
                    color = "#e3e3e3"
                />
            </div>
        );
    }
});