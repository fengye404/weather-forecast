import React, {Component} from 'react';
import {getLive, getSuggestion} from "../../api/weather";
import {getLocation} from "../../api/locationData";
import {Popover, Tag} from '@douyinfe/semi-ui';
import "./Live.css"

class Live extends Component {

    state = {
        live: {},
        car_washing: {},
        dressing: {},
        flu: {},
        sport: {},
        travel: {},
        uv: {},
        isReady: false,
        location: null
    }

    constructor() {
        super();
        //先更新用户当前位置
        getLocation().then(res => {
            var cname = JSON.parse(res.data.substring(19, res.data.length - 1)).cname;
            console.log(cname)
            this.props.parent.showLocation(cname)
            //再给setState设置一个回调，更新天气
            this.setState({location: cname}, () => {
                var {location} = this.state;
                getLive(location).then(res => {
                    //再给setState设置一个回调，更新生活指数
                    this.setState({live: res.data.results[0].now}, () => {
                        getSuggestion(location).then(res => {
                            console.log(res.data.results[0].suggestion)
                            this.setState({...res.data.results[0].suggestion, isReady: true})
                        })
                    })
                })
            })
        })
    }

    changeLocation=(location)=>{
        this.setState({location: location}, () => {
            var {location} = this.state;
            getLive(location).then(res => {
                //再给setState设置一个回调，更新生活指数
                this.setState({live: res.data.results[0].now}, () => {
                    getSuggestion(location).then(res => {
                        console.log(res.data.results[0].suggestion)
                        this.setState({...res.data.results[0].suggestion, isReady: true})
                    })
                })
            })
        })
    }

    render() {
        const {text} = this.state.live;
        const {code} = this.state.live;
        const {temperature} = this.state.live;
        console.log(this.state)
        const {car_washing} = this.state;
        const {dressing} = this.state;
        const {flu} = this.state;
        const {sport} = this.state;
        const {travel} = this.state;
        const {uv} = this.state;
        ;

        return (
            <div className="live">
                <Popover
                    showArrow
                    className={"popover"}
                    content={
                        <article
                            style={{textAlign: "center"}}
                        >
                            {text}
                            <br/>
                            洗车：{car_washing.brief} | 穿衣：{dressing.brief}
                            <br/>
                            感冒：{flu.brief} | 运动：{sport.brief}
                            <br/>
                            旅游：{travel.brief} | 紫外线：{uv.brief}
                            <br/>
                        </article>
                    }
                    style={{
                        backgroundColor: 'rgb(96 , 125 , 139)',
                        borderColor: 'rgb(96 , 125 , 139)',
                        color: 'rgb(255 ,255 , 255)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                    }}
                >
                    <Tag className="temperature">{temperature}&#176;</Tag>
                </Popover>
            </div>
        );
    }
}

export default Live;