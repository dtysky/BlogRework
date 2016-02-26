'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react/addons');

require('./theme/css/sky.css');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="content-wait">
                <img src="/theme/image/logo.png" alt="wait-image"/>
                <br/>
                <p>
                    少女祈祷中......
                </p>
            </div>
        );
    }
});