'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

require('velocity-animate');
require('velocity-animate/velocity.ui');

var React = require('react/addons');
var VelocityComponent = require('velocity-react').VelocityComponent;
var ContentList = require('./content_list');
var config = require('./utils').config;
var colorNextEffect = require('./utils').colorNextEffect;

require('./theme/css/sky.css');

module.exports = React.createClass({
    componentDidMount: function(){
        if(this.props.theme_default !== "home"){
            this.props.setDefaultTheme("home");
            this.props.changeTheme("home", true);
        }
    },
    render: function(){
        return (
            <div>
                <div className="index-preview">
                    <VelocityComponent animation={colorNextEffect(this.props.theme_info)}>
                        <hr className="home-article-sphr"/>
                    </VelocityComponent>
                    <p>欢迎来到我的博客，这里是我在旅程中设立的一些路标，希望大家能够从我的一些经验中有所收获，可以是喜悦，也可以是悲伤，亦或是愤怒、讽刺与同情。</p>
                    <p>上面的四个按钮分别表示四个分类，右下侧（PC端）或者上下方（移动端）的色块中也有一些按钮，Home为返回主页，dtysky（PC端）或正中图标（移动端）为我的个人简历，其他皆为字面或者图面上的意思（例如RSS订阅）。</p>
                    <VelocityComponent animation={colorNextEffect(this.props.theme_info)}>
                        <hr className="home-article-sphr"/>
                    </VelocityComponent>
                </div>
                <ContentList
                    type="archives"
                    name="all"
                    index="0"
                    description="欢迎来到我的博客，这里是我在旅程中设立的一些路标，希望大家能够从我的一些经验中有所收获，可以是喜悦，也可以是悲伤，亦或是愤怒、讽刺与同情。"
                    handleHead={this.props.handleHead}
                    title={config.site_title}
                    can_content_animate={this.props.can_content_animate}
                />
            </div>
        );
    }
});