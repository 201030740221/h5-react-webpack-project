var ShowNumPage = React.createClass({
	countChange(){
		$.fn.countTo = function (options) {
			options = options || {};
			
			return $(this).each(function () {
				// set options for current element
				var settings = $.extend({}, $.fn.countTo.defaults, {
					from:            $(this).data('from'),
					to:              $(this).data('to'),
					speed:           $(this).data('speed'),
					refreshInterval: $(this).data('refresh-interval'),
					decimals:        $(this).data('decimals')
				}, options);
				
				// how many times to update the value, and how much to increment the value on each update
				var loops = Math.ceil(settings.speed / settings.refreshInterval),
					increment = (settings.to - settings.from) / loops;
				
				// references & variables that will change with each update
				var self = this,
					$self = $(this),
					loopCount = 0,
					value = settings.from,
					data = $self.data('countTo') || {};
				
				$self.data('countTo', data);
				
				// if an existing interval can be found, clear it first
				if (data.interval) {
					clearInterval(data.interval);
				}
				data.interval = setInterval(updateTimer, settings.refreshInterval);
				
				// initialize the element with the starting value
				render(value);
				
				function updateTimer() {
					value += increment;
					loopCount++;
					
					render(value);
					
					if (typeof(settings.onUpdate) == 'function') {
						settings.onUpdate.call(self, value);
					}
					
					if (loopCount >= loops) {
						// remove the interval
						$self.removeData('countTo');
						clearInterval(data.interval);
						value = settings.to;
						
						if (typeof(settings.onComplete) == 'function') {
							settings.onComplete.call(self, value);
						}
					}
				}
				
				function render(value) {
					var formattedValue = settings.formatter.call(self, value, settings);
					$self.html(formattedValue);
				}
			});
		};
		
		$.fn.countTo.defaults = {
			from: 0,               // the number the element should start at
			to: 0,                 // the number the element should end at
			speed: 1000,           // how long it should take to count between the target numbers
			refreshInterval: 100,  // how often the element should be updated
			decimals: 0,           // the number of decimal places to show
			formatter: formatter,  // handler for formatting the value before rendering
			onUpdate: null,        // callback method for every time the element is updated
			onComplete: null       // callback method for when the element finishes updating
		};
		
		function formatter(value, settings) {
			return value.toFixed(settings.decimals);
		}



	  // custom formatting example
	  $('#count-number').data('countToOptions', {
		formatter: function (value, options) {
		  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '');
		}
	  });
	  
	  // start all the timers
	  $('.timer').each(count);  
	  
	  function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	  }
	},

	//微信配置
	wechatConfig(nickname,_name){
		  //获取微信wx.config的配置信息接口
		  console.log(weChatJsConfig,'weChatJsConfig');
		  var apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
	       wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId:  weChatJsConfig.appId, // 必填，公众号的唯一标识
			    timestamp: weChatJsConfig.timestamp, // 必填，生成签名的时间戳
			    nonceStr: weChatJsConfig.nonceStr, // 必填，生成签名的随机串
			    signature: weChatJsConfig.signature,// 必填，签名，见附录1
			    jsApiList: weChatJsConfig.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		  wx.ready(function(){
            wx.checkJsApi({
                jsApiList: apiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    console.log(res);
                }
            });

        	let title='';
            if (_name == '彼得蒂尔'){
				title = nickname+'的才华招来了彼得蒂尔的嫉妒，被邀请成为学道家塾学霸团成员';
            }
            if (_name == '罗振宇'){
				title = nickname+'的才华击败了地球上97%的人，站在了食物链的顶端，被邀请成为学道家塾学霸团成员';
            }
            if (_name == '杨石头'){
				title = nickname+'的才华成功吸引了杨石头的注意，被邀请成为学道家塾学霸团成员';
            }
            if (_name == '宗毅'){
				title = nickname+'的才华余额不足，要及时充值';
            }
            if (_name == '张怡筠'){
				title = nickname+'明明可以靠脸食饭，却偏偏要靠才华';
            }
            
            var link = weChatJsConfig.url,
                image = dirUrl+'images/qrcode.jpg';

            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: image, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: '自定义的分享描述', // 分享描述
                link: link, // 分享链接
                imgUrl: image, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
	},
	 getInitialState: function () {
	 	return {
	 		nickname: '',
	 		_name: '',
	 		headerImgUrl: '',
	 		total: 0,
	 		loading: true,
	 		_class: 'hidden',
	 	}
	},
  	componentDidMount: function () {
  		let self = this;
  		console.log(this.props);
       //获取第二个页面 带过来的输入签名值
       let location = this.props.location;
       let _str = location.query.nickname;
       let nickname = _str.split('_')[0];
       let _name = _str.split('_')[1];
       this.setState({
       	nickname: nickname,
       	_name: _name
       });

       this.wechatConfig(nickname,_name); //微信配置

       //获取微信用户信息接口
       $.ajax({
		     type: "get",
		     url: "/info",
		     dataType: "json",
		     success: function(data){
     		//模拟返回的数据
				 if (data.res == 0) {
				 	console.log(data,'22');
					 let return_data = data.data;
					 self.setState({
						 headerImgUrl: return_data.headimgurl, //头像
						 total: return_data.ranking, //用户排序
						 loading: false
					 })
				 } else {
					 console.log(data);
				 }
		     },
		     error: function(){
		      console.log("出错了");
		     }
	    });
       
    },
    componentWillReceiveProps: function(nextprops){
 		
   	   let location = nextprops.location;
	   let _str = location.query.nickname;
	   let nickname = _str.split('_')[0];
	   let _name = _str.split('_')[1];
	   this.setState({
	   	 nickname: nickname,
	   	_name: _name
	   });
    },
     componentDidUpdate(){
 		//数字显示效果
       this.countChange();
     },
     clickHandle(type){
		this.setState({
    		_class: type
    	})
     },
    render: function () {
    	let self = this;
    	/*if(this.state.loading){
    		return(
				<p>正在加载中，请稍等...</p>
			)
    	}*/
        return (
            <div className='whole_page'>
                <div className="tree1 other_tree"></div>
				<div className="tree2 other_tree"></div>
				<div className="tree3 other_tree"></div>
				<div className="tree4 other_tree"></div>
				<div className='_content show_page'>
					<div className="center_section">
						<div className='info_section'>
							<div className='s_border'>
								<div className='t_border'>
									<div className="people_section show_page_people">
										<img src={this.state.headerImgUrl} alt="" />
									</div>
									<div className='pic_title'></div>
									<p className='_s_color'>
									    {this.state.nickname} 获得  “{this.state._name}”  嘉宾赠与的能量， 
									</p>
									<div className='tip_large_name'>学道家塾</div>
									<p className='_s_color'>
										受邀成为学道家塾新塾友
									</p>

									<p className='u-tc'>
										<span className="p_r timer count-title" id="count-number" data-to='8888' data-speed="1500"></span>
									</p>
									<div className="number_box">
										<div className="each_box box1"></div>
										<div className="each_box box2"></div>
										<div className="each_box box3"></div>
										<div className="each_box box4"></div>
										<div className="each_box box5"></div>
										<div className="each_box box6"></div>
										<div className="ID_title">塾友ID:</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="p_r">
							<div className='wheet_pic'></div>
						</div>
						<div className="p_r">
							<div className='btn_icon_section'>
								<div className='fl show_btn_icon'>
									<p className='title mt-8'>我要</p>
									<p className='title'>能量</p>
								</div>
								<div className='fr show_btn_icon' onClick={this.clickHandle.bind(null,'shown')}>
									<p className='title mt-8'>炫耀</p>
									<p className='title'>一下</p>
								</div>
							</div>
							
						</div>
					</div>
					<div className={"mask "+this.state._class} onClick={this.clickHandle.bind(null,'hidden')}>
						<div className="tip_section">
							<span className="tip_title">亲，请在屏幕右上方点击分享按钮，分享你的内容哦</span>
							<div className="tip_btn" onClick={this.clickHandle.bind(null,'hidden')}>知道了</div>
						</div>
					</div>
				</div>
            </div>
        );
    }
});

module.exports = ShowNumPage;