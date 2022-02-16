import {Layout} from "@douyinfe/semi-ui";
import "./App.css";
import React, {Component} from 'react';
import WeatherList from "./components/WeatherList/WeatherList";
import {Avatar, AvatarGroup} from '@douyinfe/semi-ui';
import SelectCity from "./components/Header/SelectCity";
import Live from "./components/Live/Live";


class App extends Component {

    state = {
        location: null
    }

    live=React.createRef()
    weatherList=React.createRef()
    selectCity=React.createRef()

    callback = (location) => {
        this.setState({location:location})
        this.live.current.changeLocation(location)
        this.weatherList.current.changeLocation(location)
    }

    showLocation=(location)=>{
        this.selectCity.current.setState({location:location})
    }

    render() {
        const {Header, Footer, Content} = Layout;
        return (
            <Layout className={"layout"}>
                <div className={"background"}/>
                <Header className={"header"}>
                    <Avatar
                        className="avatar"
                        alt="風楪fy"
                        size="large"
                        src="http://q1.qlogo.cn/g?b=qq&nk=1129126684&s=640"
                        style={{margin: 10}}
                        onClick={() => {
                            window.location.href = 'http://fengye404.top/'
                        }}
                    >
                    </Avatar>
                    <div className={"selectCity"}>
                        <SelectCity parent={this} ref={this.selectCity}/>
                    </div>
                </Header>
                <Content className={"content"}>
                    <Live parent={this} ref={this.live}/>
                    <WeatherList parent={this} ref={this.weatherList}/>
                </Content>
                <Footer className={"footer"}>
                    <div className="saying">你所热爱的，就是你的生活</div>
                    <div className="copyright">
                        <a href="http://fengye404.top/">Copyright © by 風楪fy</a>
                    </div>
                </Footer>
            </Layout>
        );
    }
}

export default App;
