
import Reflux from 'reflux';
import GithubStore from "../stores/GithubStore";
import {Link,Router, Route, IndexRoute, useRouterHistory} from 'react-router';

var Home = React.createClass({
/*    mixins: [Reflux.ListenerMixin],
    getInitialState: function () {
        return {
            'gists': [],
            'users': [
                'hising', 'krummas', 'oskarblom', 'cgbystrom'
            ]
        };
    },

    githubChange: function () {
        this.setState({
            'gists': GithubStore.store.getGists()
        });
    },

    componentDidMount: function () {
        this.listenTo(GithubStore.store, this.githubChange);
        GithubStore.actions.setUsername("hising");
    },

    getGistMarkup: function () {
        var listItems = this.state.gists.map(function (item) {
            return <li><a target="_blank" href={item.html_url}>[{item.id}] {item.description}</a></li>
        });
        return <ul>{listItems}</ul>;
    },


    getUserMarkup: function () {
        var onClick = function (username) {
            GithubStore.actions.setUsername(username);
        };
        var listItems = this.state.users.map(function (item) {
            return <li><a ref={item} data-user={item} onClick={onClick.bind(this, item)}>{item}</a></li>
        });
        return <ul>{listItems}</ul>;
    },*/

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {

      let self = this;
      /*判断有没有关注接口*/
      $.ajax({
        type: "get",
        url: "/info",
        dataType: "json",
        success: function(data){
          //模拟返回的数据
          if (data.res == 0) {
            console.log(data,'home');
            let return_data = data.data;
            let isAttention = return_data.subscribe;
            if(!isAttention){
              //没关注，则跳转关注页
              self.context.router.push('/attention_page');
            }
          } else {
            console.log({page: "home", data: data});
          }
        },
        error: function(){
          console.log("出错了");
        }
      });

      return {

      };
    },


    componentDidMount: function () {

    },
    render: function () {

        return (
            <div className='bg_content'>
                <div className='zhedan'>
                    <img src={dirUrl+"images/zhedan.gif"} alt="" width="90" />
                </div>
                <Link to="input_page">
                    <div className='hot_section'></div>
                </Link>
                <div className='yun_bg'></div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Home;