'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

var React = require('react');
var Modal = require('react-modal');
var QrCode = require('qrcode.react');
var config = require('./utils').config;
var templates = config.share_templates;
var theme_color = config.theme_color;

require('./theme/css/share.css');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            showModal: false
        };
    },
    openModal: function() {
        this.setState({
            showModal: true
        });
    },

    closeModal: function() {
        this.setState({
            showModal: false
        });
    },
    format_template: function(t_url){
        var data = this.props.info;
        return t_url.replace(/\{\{(\w)(\w*)\}\}/g, function(m, fix, key){
            key = (fix + key).toLowerCase();
            return (data[key] || '');
        });
    },
    render: function() {
        var self = this;
        var modal_style = {
            overlay : {
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                overflow: "auto"
            },
            content : {
                width: 180,
                height: 360,
                margin: "auto",
                backgroundColor: theme_color[this.props.theme],
                opacity: 0.9,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '20px',
                transition: "all 150ms ease-in"
            }
        };
        return (
            <div
                className="share"
            >
                <button
                    className="share-button"
                    onClick={this.openModal}
                />
                <Modal
                    className="share-window"
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    style={modal_style}

                >
                    <div
                        style={{
                            marginLeft: 5,
                            border: "5px solid #eee"
                        }}
                    >
                        <QrCode
                            value={this.props.info.url}
                            size={160}
                            fgColor={theme_color[this.props.theme]}
                            level="M"
                        />
                    </div>
                    {
                        templates.map(function(t){
                            return (
                                <a
                                    href={self.format_template(t[1])}
                                    className={"share-icon icon-" + t[0]}
                                />
                            );
                        })
                    }
                </Modal>
            </div>
        );
    }
});