
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

    render: function () {

        return (
            <div className='bg_content'>
                <div className='zhedan'>
                    <img src="../images/zhedan.gif" alt="" width="90" />
                </div>
                <Link to="input_page">
                    <div className='hot_section'></div>
                </Link>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Home;