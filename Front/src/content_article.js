/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Loading = require('react-loading');
var Helmet = require('react-helmet');

var database = require('./utils').database;

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            title: "",
            keywords: "",
            description: "",
            author: "",
            date: "",
            tags: "",
            summary: "",
            content: ""
        };
    },
    getInfo: function(){
        var collection = database.db.collection(this.props.kind);
        collection.findOne(
            {name: this.props.kind},
            function(err, data){
                if(err){
                    this.setState({
                        state: "error"
                    });
                }
                this.setState({
                    state: "ok",
                    title: data.title,
                    keywords: data.keywords,
                    description: data.description,
                    author: data.author,
                    content: data.content
                });
                this.props.handleHead({
                    title: data.title,
                    keywords: data.keywords,
                    description: data.description,
                    author: data.author
                })
            });
    },
    componentDidMount: function(){
        var timeoutId = 0;
        var fun = function() {
            if (database.ready) {
                clearTimeout(timeoutId);
                this.getInfo();
            }
            else {
                timeoutId = setTimeout(fun, 500);
            }
        }
    },
    render: function(){
        if (this.state.state == "error"){
            return (<div className="content-error">Error!</div>);
        }
        if (this.state.state == "wait"){
            return (
                <div className="content-wait">
                    <Loading
                        type = "spin"
                        color = "#e3e3e3"
                    />
                </div>
            )
        }
        return (
            <div class="content-list">
            </div>
        );
    }
});