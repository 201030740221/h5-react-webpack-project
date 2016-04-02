'use strict';
import "../css/style";

var Main = React.createClass({
    render: function () {
        return (
            <div className='attention_page'>
                <div className="attention_section">
                    <div className='distant-front'>亲，您还没关注哦，请长按以下二维码进行关注</div>
                    <img src={dirUrl+"images/qrcode.jpg"} alt=""/>
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Main;