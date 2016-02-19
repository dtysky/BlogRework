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
        var index = this.props.now_index;
        var type = this.props.type;
        var name = this.props.name;
        var left = parseInt(index / 10);
        var right = left + 11 > max_index ? max_index : left + 10;
        var index_nums = [];
        for(var i=left; i<right; i++){
            index_nums.push(i);
        }
        function pre(){
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
        }
        function next(){
            if(index === max_index - 1){
                return (
                    <li className="next disabled">
                        &rarr;
                    </li>
                );
            }
            else{
                return (
                    <li className="next">
                        <Link
                            to={getLocalUrl(type, name, index + 1)}
                        >
                            &rarr;
                        </Link>
                    </li>
                );
            }
        }
        return (
            <div className="pagination">
                <ul>
                    {pre()}
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
                    {next()}
                </ul>
            </div>
        );
    }
});