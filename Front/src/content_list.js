/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Loading = require('react-loading');

var Pagination = require('./pagination');
var database = require('./utils').database;
var getLocalUrl = require('./utils').getLocalUrl;

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            max_index: 1,
            content: []
        };
    },
    getInfo: function(){
        var collection = database.db.collection(this.props.kind);
        var totle_count = 0;
        collection.findOne(
            {
                name: this.props.type,
                type: "count"
            },
            function(err, data) {
                if(err){
                    this.setState({
                        state: "error"
                    });
                }
                totle_count = data.count;
            }
        );
        collection.findOne(
            {
                name: this.props.name,
                type: "content",
                index: {
                    $gt: this.props.index * 10,
                    $lt: (this.props.index + 1) * 10
                }
            },
            function(err, data){
                if(err){
                    this.setState({
                        state: "error"
                    });
                }
                this.setState({
                    state: "ok",
                    max_index: parseInt(totle_count / 10) + 1,
                    content: data.content
                });
                this.props.handleHead({
                    title: data.title,
                    keywords: data.keywords,
                    description: data.description,
                    author: data.author
                });
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
                <ul>
                    {
                        this.state.content.map(function(item){
                            return (
                                <article>
                                    <div>
                                        <Link to={getLocalUrl("article", item.title, 0)} rel="bookmark" title={item.title}><h3>{item.title}</h3></Link>
                                    </div>
                                    <div>
                                        <p>{item.summary}</p>
                                        <hr class='home-main-content-ghr'/>
                                        {
                                            item.author.map(function(author){
                                                return (
                                                    <Link to={getLocalUrl("author", author, 0)}>{author} </Link>
                                                )
                                            })
                                        }
                                        <p>更新于</p>
                                        <p title={item.date}>{item.date}</p>
                                        <p>,</p>
                                        <p>路标：</p>
                                        {
                                            item.tag.map(function(tag){
                                                return (
                                                    <Link to={getLocalUrl("tag", tag, 0)}>{tag} </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </article>
                            );
                        })
                    }
                </ul>

                <Pagination
                    kind={this.props.kind}
                    name={this.props.name}
                    now_index={this.props.index}
                    max_index={this.state.maxindex}
                />
            </div>
        );
    }
});