'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Link = require('react-router').Link;
var config = require('./../utils').config;
var site_title = config.site_title;
var format = require('util').format;

require('./../theme/css/sky.css');

module.exports = React.createClass({
    getInitialState: function(){
        this.text = {
            p: [
                "这是一个关于追寻、绝望和永恒的故事。",
                "少女寻找和期望的终点，就是这样一个页面。",
                "404——这是页面上唯一的数字。",
                "一个如此简单的数字本不应当有什么深刻的含义。",
                "“喂！404！”",
                "——某个熟悉的声音似乎出现在了她的耳边。",
                "但那不过是稍纵即逝的幻觉罢了。",
                "“......”",
                "“已经足够了。”",
                "这一刻，她用自身完美地演绎出了人类最终的下场。",
                "这或许就是人类所有的历史，在终末之刻的凝缩。",
                "“那么，祝你们幸福。”"
            ],
            a: "在下一次的轮回。"
        };
        return {};
    },
    componentDidMount: function(){
        this.props.setDefaultTheme("404");
        this.props.changeTheme("404", true);
        this.props.setMusicList(["パーフェクトヴァニティ"]);
        this.props.handleHead({
            title: (
                format(
                    "%s - %s",
                    "终末之地",
                    site_title
                )
            ),
            keywords: (
                "dtysky,墓场"
            ),
            description: (
                "欢迎来到没有希望、却很美的荒漠。"
            ),
            author: "dtysky,命月天宇",
            rss: "/feeds/all"
        });
    },
    render: function() {
        return (
            <div className="my404">
                <div className="my404-img">
                    {
                        ["1", "2", "3", "4"].map(function(e){
                            return <img
                                className={"my404-img" + e}
                                src={"/theme/image/404-" + e + ".svg"}
                                alt={"404-image-" + e}
                            />;
                        })
                    }
                </div>
                <div className="my404-content">
                    {
                        this.text.p.map(function(e){
                            return <div><p>{e}</p></div>;
                        })
                    }
                    <Link to="/">{this.text.a}</Link>
                </div>
            </div>
        );
    }
});