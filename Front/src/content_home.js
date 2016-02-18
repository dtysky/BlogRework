'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react/addons');
var ContentList = require('./content_list');
var config = require('./utils').config;

require('./theme/css/sky.css');

module.exports = React.createClass({
    render: function(){
        return (
            <div>
                <div className="index-preview">
                    <hr className="home-article-sphr"/>
                    <p>欢迎来到我的博客，这里是我在旅程中设立的一些路标，希望大家能够从我的一些经验中有所收获，可以是喜悦，也可以是悲伤，亦或是愤怒、讽刺与同情。</p>
                    <p>上面的四个按钮分别表示四个分类，右下侧（PC端）或者上下方（移动端）的色块中也有一些按钮，Home为返回主页，dtysky（PC端）或正中图标（移动端）为我的个人简历，其他皆为字面或者图面上的意思（例如RSS订阅）。</p>
                    <hr className="home-article-sphr" style={{marginTop: 10}}/>
                </div>
                <ContentList
                    type="archives"
                    name="all"
                    index="0"
                    description="欢迎来到我的博客，这里是我在旅程中设立的一些路标，希望大家能够从我的一些经验中有所收获，可以是喜悦，也可以是悲伤，亦或是愤怒、讽刺与同情。"
                    handleHead={this.props.handleHead}
                    title={config.site_title}
                />
            </div>
        );
    }
});