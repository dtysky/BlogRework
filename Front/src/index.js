'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var ReactDom = require('react-dom');
var router = require('./router');

ReactDom.render(router, document.getElementById('content'));