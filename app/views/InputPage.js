import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';

var InputPage = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	 getInitialState: function () {
        return {
        	_class: 'hidden',
        	random_num: 1,
           	people_data: [
	           {
	            key:1,img:{url:'pic1.png', width: '100' },ani_img:{url:'ani_pic1.gif'},
	           	content: [
	           		{title:'我是罗振宇，更是大家熟知的罗胖，'},
	           		{title:'我是一位有点与时俱进卖货郎，'},
	           		{title:'我卖的是书籍、是故事、更是我的智慧，'},
	           		{title:'来，碰碰手指，让我给你更多的能量'},
	           	]
	           },{
	            key:2,img:{url:'pic2.png', width: '100' },ani_img:{url:'ani_pic2.gif'},
	           	content: [
	           		{title:' 我是彼得蒂尔，我是硅谷的创投教父，'},
	           		{title:'也是最火的商业著作《从0到1》的作者，'},
	           		{title:'我满脑奇思妙想，你才华无处施展，'},
	           		{title:'不如一起来，造就新未来'},
	           	]
	           }, {
	            key:3,img:{ url:'pic3.png', width: '100' },ani_img:{url:'ani_pic3.gif'},
	           	content: [
	           		{title:'我是杨石头，我是一名品牌营销达人，'},
	           		{title:'专攻互联网+品牌营销新打法，'},
	           		{title:'我不兜售情怀，也不贱卖梦想，'},
	           		{title:'我有料，你有趣，我们一起来玩'},
	           	]
	           }, {
	            key:4,img:{url:'pic4.png', width: '100' },ani_img:{url:'ani_pic4.gif'},
	           	content: [
	           		{title:'我是张怡筠，我是一名心理专家，'},
	           		{title:'盯着我，让我在你的眼神中窥探你的心灵，'},
	           		{title:'一起了解更真实的你.'}
	           	]
	           }, {
	            key:5,img:{ url:'pic5.png', width: '100' },ani_img:{url:'ani_pic5.gif'},
	           	content: [
	           		{title:'我是宗毅，我是一名企业战略专家，'},
	           		{title:'我是创业投资人，我的大脑有满满的企业成功秘笈，'},
	           		{title:'我的口袋有多多的创业基金，'},
	           		{title:'动动手指让我给你更多的关怀'},
	           	]
	           }
           ]
        };
    },
    componentDidMount: function () {
        var random_num = Math.floor(Math.random()*5+1);
        this.setState({
        	random_num: random_num
        })
    },
    clickHandle(type){
		var _val = $('#nickname').val();
		var random_num = this.state.random_num;
		var _name = '';
		if(random_num==1){
			_name='罗振宇'
		}
		if(random_num==2){
			_name='彼得蒂尔'
		}
		if(random_num==3){
			_name='杨石头'
		}
		if(random_num==4){
			_name='张怡筠'
		}
		if(random_num==5){
			_name='宗毅'
		}
		if(_val){
			this.context.router.push('/show_page?nickname='+_val+'_'+_name);
			return;
		}  	
    	this.setState({
    		_class: type
    	})
    },

    render: function () {
    	var people_data = this.state.people_data;
    	var random_num = this.state.random_num;

        return (
            <div className='whole_page'>
                <div className="tree1"></div>
				<div className="tree2"></div>
				<div className="tree3"></div>
				<div className="tree4"></div>
				<div className='_content'>
					<div className="center_section">
					{
						people_data.map(function(item,key){
							if(random_num==item.key){
								return (
									<div className="" key={key}>
										<div className="people_section mb-20">
											<img src={dirUrl+"images/"+item.img.url} alt="" width='100' />
											<div className='other_ani_pic'>
												<img src={dirUrl+"images/"+item.ani_img.url} alt="" width='100' />
											</div>
										</div>
										{
											item.content.map(function(_item,_key){
												return (
													<p className='u-tc' key={_key}>
														<span className="distant-front">{_item.title}</span>
													</p>
												)
											})
										}
									</div>
								)
							}
						})
					}

						<div className="input_section">
							<input type="text" className="input_content" id="nickname" placeholder="请输入姓名获取能量" />
						</div>

						<div className="send_btn" onClick={this.clickHandle.bind(null,'shown')}>
							 <div className="click_ani_btn"></div>
						</div>

					</div>

					<div className={"mask "+this.state._class} onClick={this.clickHandle.bind(null,'hidden')}>
						<div className="tip_section">
							<span className="tip_title">亲，你还没输入你的姓名呢</span>
							<div className="tip_btn" onClick={this.clickHandle.bind(null,'hidden')}>知道了</div>
						</div>
					</div>
				</div>
            </div>
        );
    }
});

module.exports = InputPage;