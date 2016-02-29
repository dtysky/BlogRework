'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
        return (
            <div className="content-error">
                <img src="/theme/image/logo.svg" alt="error-image"/>
                <br/>
                <p>
                    少女没有收到神明的回应——
                </p>
                <br/>
                <p>
                    可以尝试刷新，来再次发起祈祷......
                </p>
            </div>
        );
    }
});