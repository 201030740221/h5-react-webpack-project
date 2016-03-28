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
	 getInitialState: function () {
	 	return {
	 		nickname: '',
	 		headerImgUrl: '',
	 		total: 0
	 	}
	},
  	componentDidMount: function () {
  		let self = this;
  		

       //获取第二个页面 带过来的输入签名值
       let location = this.props.location;
       this.setState({
       	nickname: location.query.nickname
       })

       //获取微信wx.config的配置信息  接口

       //获取微信用户信息接口
       $.ajax({
		     type: "get",
		     url: "",
		     data: {},
		     success: function(data){
     		//模拟返回的数据
     		 let return_data = {
				    "subscribe": 1, 
				    "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M", 
				    "nickname": "Band", 
				    "sex": 1, 
				    "language": "zh_CN", 
				    "city": "广州", 
				    "province": "广东", 
				    "country": "中国", 
				    "headimgurl":   null, 
				   "subscribe_time": 1382694957,
				   "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL",
				   "remark": "",
				   "groupid": 0
				}
		      self.setState({
				headerImgUrl: return_data.headimgurl, //头像
				
		      })

		     },
		     error: function(){
		      console.log("出错了");
		     }
	    });

       //获取微信用户排序同上
       this.setState({
       	total: 8888 //用户排序
       })
       
    },
    componentWillReceiveProps: function(nextprops){
 		let location = nextprops.location;
       	this.setState({
       		nickname: location.query.nickname
      	 })
    },
     componentDidUpdate(){
 		//数字显示效果
       this.countChange();
     },
    render: function () {
        return (
            <div className='whole_page'>
                <div className="tree1"></div>
				<div className="tree2"></div>
				<div className="tree3"></div>
				<div className="tree4"></div>
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
									    获得  “{this.state.nickname}”  赠与的能量， 
									</p>
									<div className='tip_large_name'>学道家塾</div>
									<p className='_s_color'>
										受邀成为学道家塾新塾友
									</p>

									<p className='u-tc'>
										<span className="p_r timer count-title" id="count-number" data-to={this.state.total} data-speed="1500"></span>
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
								<div className='fr show_btn_icon'>
									<p className='title mt-8'>炫耀</p>
									<p className='title'>一下</p>
								</div>
							</div>
							
						</div>

					</div>
				</div>
            </div>
        );
    }
});

module.exports = ShowNumPage;