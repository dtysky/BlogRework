'use strict';
/**
 * Created by dtysky on 16/2/3.
 */


var React = require('react/addons');
var Link = require('react-router').Link;
var getLocalUrl = require('./utils').getLocalUrl;

require('./theme/css/sky.css');

module.exports = React.createClass({
    render: function(){
        var max_index = this.props.max_index;
        var index = this.props.index;
        var type = this.props.type;
        var name = this.props.name;
        var left = parseInt(index / 10);
        var right = left + 11 > max_index ? left + 10 : max_index;
        var index_nums = [];
        for(var i=left; i<right; i++){
            index_nums.push(i);
        }
        return (
            <div id="pagination">
                <ul>
                    {
                        function(){
                            if(index === 0){
                                return (
                                    <li className="prev disabled">
                                        &larr;
                                    </li>
                                );
                            }
                            else{
                                return (
                                    <li className="prev">
                                        <Link
                                            to={getLocalUrl(type, name, index - 1)}
                                        >
                                            &larr;
                                        </Link>
                                    </li>
                                );
                            }
                        }()
                    }
                    {
                        index_nums.map(function(i){
                            if (i === index){
                                return (
                                    <li className="disabled">
                                        {i}
                                    </li>
                                );
                            }
                            else{
                                return (
                                    <li className="active">
                                        <Link
                                            to={getLocalUrl(type, name, i)}
                                        >
                                            {i}
                                        </Link>
                                    </li>
                                );
                            }
                        })
                    }
                    {
                        function(){
                            if(index === max_index - 1){
                                return (
                                    <li className="next disabled">
                                        &larr;
                                    </li>
                                );
                            }
                            else{
                                return (
                                    <li className="next">
                                        <Link
                                            to={getLocalUrl(type, name, index + 1)}
                                        >
                                            &larr;
                                        </Link>
                                    </li>
                                );
                            }
                        }()
                    }
                </ul>
            </div>
        );
    }
});