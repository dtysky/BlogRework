'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react/addons');
var VelocityComponent = require('velocity-react').VelocityComponent;
var velocityHelpers = require('velocity-react').velocityHelpers;
var Link = require('react-router').Link;
var format = require('util').format;

var Loading = require('./loading');
var NormalError = require('./normal_error');
var Pagination = require('./pagination');

var cache = require('./cache');
var getLocalUrl = require('./utils').getLocalUrl;
var redirect = require('./utils').redirect;
var config = require('./utils').config;
var site_title = config.site_title;
var server_url = config.server_url;
var articles_per_page = config.articles_per_page;

require('./theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            state: "wait",
            max_index: 1,
            now_index: 0,
            content: []
        };
    },
    getAll: function(name){
        var self = this;
        this.setState({
            state: "wait"
        });
        $.ajax({
            url: format(
                "%s/%s",
                server_url,
                name
            ),
            success: function(result, status){
                var data = JSON.parse(result);
                data.content.sort({
                    "date": -1
                });
                cache.add(name, data);
            }.bind(this),
            error: function(obj, info, ex){
                console.log(obj);
                if(obj.status === 404){
                    redirect();
                }
                else{
                    self.setState({
                        state: "error"
                    });
                }
            }.bind(this)
        });
    },
    formatHead: function(data){
        var view = data.view;
        this.props.handleHead({
            title: (
                this.props.title ?
                    this.props.title :
                    format(
                        "%s-%d - %s",
                        view,
                        this.state.now_index,
                        site_title
                    )
            ),
            keywords: format(
                "%s",
                view
            ),
            description: (
                this.props.description ?
                    this.props.description :
                    format(
                        "这是有关%s的所有文章",
                        view
                    )
            ),
            author: "dtysky,命月天宇"
        });
    },
    getInfo: function(name, index){
        var data = cache.get(name);
        var totle_count = data.content.length;
        var max_index = parseInt(totle_count / articles_per_page) + 1;
        var left = index === undefined ? 0 : parseInt(this.props.index);
        if(left > max_index){
            redirect();
        }
        var right = left + articles_per_page < max_index ? left + articles_per_page : left + 10;
        this.setState({
            state: "ok",
            now_index: left,
            max_index: max_index,
            content: data.content.slice(left, right)
        });
        this.formatHead(data);
    },
    updateData: function(props){
        var self = this;
        var name = format(
            "%s/%s",
            props.type,
            props.name
        );
        if(!cache.has(name)){
            this.getAll(name);
            var timeoutId = 0;
            var fun = function() {
                console.log("check!");
                if (cache.has(name)) {
                    clearTimeout(timeoutId);
                    self.getInfo(name, props.index);
                }
                else {
                    timeoutId = setTimeout(fun, 200);
                }
            };
            fun();
        }
        else{
            self.getInfo(name, props.index);
        }
    },
    componentDidMount: function(){
        this.updateData(this.props);
    },
    shouldComponentUpdate: function(nextProps, nextState){
        if(
            (
                this.props.name !== nextProps.name ||
                this.props.index !== nextProps.index
            ) &&
            this.state.state === nextState.state
        ){
            this.updateData(nextProps);
        }
        return this.props.can_content_animate;
    },
    articleShowEffect: function(duration, i){
        return velocityHelpers.registerEffect({
            defaultDuration: duration,
            calls:[
                [
                    {
                        opacity: [1, 0],
                        marginLeft: [0, -30]
                    },
                    1,
                    {
                        delay: (duration - 100) * i,
                        easing: "ease-in"
                    }
                ]
            ]
        });
    },
    showOneArticle: function(item){
        return (
            <article
                style={{opacity: 0}}
            >
                <div>
                    <Link
                        to={getLocalUrl("article", item.slug, null)}
                        rel="bookmark"
                        title={item.title.view}
                    >
                        <h3>{item.title.view}</h3>
                    </Link>
                </div>
                <div className="description">
                    <p dangerouslySetInnerHTML={{__html: item.summary}}>
                    </p>
                    <hr className='home-main-content-ghr'/>
                    {
                        item.authors.map(function(author){
                            return (
                                <Link
                                    to={getLocalUrl("author", author.slug, 0)}
                                >
                                    {author.view}
                                </Link>
                            );
                        })
                    }
                    <p>更新于</p>
                    <p
                        title={item.date}
                    >
                        {item.date}
                    </p>
                    <p>，</p>
                    <p>路标：</p>
                    {
                        item.tags.map(function(tag){
                            return (
                                <Link
                                    to={getLocalUrl("tag", tag.slug, 0)}
                                >
                                    {tag.view}
                                </Link>
                            );
                        })
                    }
                </div>
            </article>
        );
    },
    render: function(){
        //this.state.state = "error";
        //redirect();
        var self = this;
        if (this.state.state === "error"){
            return <NormalError/>;
        }
        if (this.state.state === "wait"){
            return <Loading/>;
        }
        return (
            <div>
                <ul>
                    {
                        this.state.content.map(function(item, index){
                            return (
                                <VelocityComponent
                                    key={item.slug}
                                    animation={self.articleShowEffect(300, index)}
                                >
                                    {self.showOneArticle(item)}
                                </VelocityComponent>);
                        })
                    }
                </ul>
                <Pagination
                    type={this.props.type}
                    name={this.props.name}
                    now_index={this.state.now_index}
                    max_index={this.state.max_index}
                />
            </div>
        );
    }
});