import { VERSION } from 'lodash';
import React, { Component } from 'react';
import axios from '../../../axios-soup'

class ViewSoup extends Component {
    componentDidUpdate = () => {
        if(this.props.soupId){
            axios.get('api/supervisions/' + this.props.soupId)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
        })
      }
    }
    render(){
        return (<div>{this.props.soupId}</div>)
    }
}

export default ViewSoup;