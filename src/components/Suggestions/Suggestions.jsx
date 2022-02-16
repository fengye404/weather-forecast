import React, {Component} from 'react';
import {getSuggestion} from '../../api/weather'
import {getLocation} from "../../api/locationData";


class Suggestions extends Component {

    state = {
        suggestions:[],
        isReady: false,
        location: null
    }

    constructor() {
        super();
        //先更新用户当前位置
        getLocation().then(res => {
            var cname = JSON.parse(res.data.substring(19, res.data.length - 1)).cname;
            //再给setState设置一个回调，更新天气
            this.setState({location: cname}, () => {
                var {location} = this.state;
                getSuggestion(location).then(res => {
                    this.setState({suggestions: res.data.results[0].suggestion, isReady: true})
                })
            })
        })
    }

    render() {


        return (
            <div>

            </div>
        );
    }
}

export default Suggestions;