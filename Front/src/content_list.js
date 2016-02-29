'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react');
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

module.exports = {
    getInitialState: function(){
        return {
            state: "wait",
            max_index: 1,
            now_index: 0,
            content: []
        };
    },
    getAll: function(name){
        $.ajax({
            url: format(
                "%s/%s",
                server_url,
                name
            ),
            success: function(data, status){
                data.content.sort(function(a, b){
                    return a.date > b.date ? -1 : 1;
                });
                cache.add(name, data);
            }.bind(this),
            error: function(obj, info, ex){
                console.log(obj);
                if(obj.status === 404){
                    redirect();
                }
                else{
                    this.setState({
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
                this.title ?
                    this.title :
                    format(
                        "%s-%d - %s",
                        view,
                        this.state.now_index,
                        site_title
                    )
            ),
            keywords: (
                this.keywords ?
                    this.keywords :
                    view
            ),
            description: (
                this.description ?
                    this.description :
                    format(
                        "这是有关%s的所有文章",
                        view
                    )
            ),
            author: "dtysky,命月天宇",
            rss: format(
                "/feeds/%s",
                this.rss ?
                    this.rss :
                    view
            )
        });
    },
    getInfo: function(name, index){
        var data = cache.get(name);
        var totle_count = data.content.length;
        var max_index = parseInt(totle_count / articles_per_page) + 1;
        var now_index = index === undefined ? 0 : parseInt(index);
        if(isNaN(now_index)){
            redirect();
        }
        var left = now_index * articles_per_page;
        if(left > totle_count){
            redirect();
        }
        var right = left + articles_per_page < totle_count ? left + articles_per_page : totle_count;
        //////////////////////////////Warning!!!////////////////////////////////////
        //I don't know why but it works...
        var self = this;
        function fun(){
            self.setState({
                state: "ok",
                now_index: now_index,
                max_index: max_index,
                content: data.content.slice(left, right)
            });
            self.formatHead(data);
            self.props.disableContentAnimation();
        }
        setTimeout(fun, 20);
        //////////////////////////////Warning!!!////////////////////////////////////
    },
    updateData: function(props){
        this.props.enableContentAnimation();
        this.setState({
            state: "wait"
        });
        var self = this;
        var name = format(
            "%s/%s",
            this.type,
            props.params.name === undefined ? "all" : props.params.name
        );
        if(!cache.has(name)){
            this.getAll(name);
            var timeoutId = 0;
            var fun = function() {
                if (cache.has(name)) {
                    clearTimeout(timeoutId);
                    self.getInfo(name, props.params.index);
                }
                else if(self.state.state !== "error") {
                    timeoutId = setTimeout(fun, 200);
                }
            };
            fun();
        }
        else{
            self.getInfo(name, props.params.index);
        }
    },
    componentDidMount: function(){
        if(this.props.theme_default !== this.theme){
            this.props.setDefaultTheme(this.theme);
            this.props.changeTheme(this.theme, true);
        }
        this.props.setMusicList([]);
        this.updateData(this.props);
    },
    shouldComponentUpdate: function(nextProps, nextState){
        if(
            (
                this.props.params.name !== nextProps.params.name ||
                this.props.params.index !== nextProps.params.index
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
                        to={getLocalUrl("article", item.slug)}
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
    topRender: function(){
        var self = this;
        if (this.state.state === "error"){
            return <NormalError key="normal-error"/>;
        }
        if (this.state.state === "wait"){
            return <Loading key="loading"/>;
        }
        return (
            <div>
                <ul key="ul">
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
                    type={this.type}
                    name={this.props.params.name}
                    now_index={this.state.now_index}
                    max_index={this.state.max_index}
                />
            </div>
        );
    }
};