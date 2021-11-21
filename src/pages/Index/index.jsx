import React, { Component } from 'react';

class Index extends Component {
    render() {
        return (
            <div>
                index页面
                <button onClick={()=>{this.props.history.push('/home')}}>点我跳到home页面</button>
            </div>
        );
    }
}

export default Index;