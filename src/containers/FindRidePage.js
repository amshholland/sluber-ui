import React, {Component} from 'react';
import TopMenu from '../components/TopMenu'
import CardList from '../components/CardList'
import axios from 'axios'

class FindRidePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        // TODO: endpoint call, populate data
        axios.get('http://localhost:8080/sluber/trips', { headers: { "Content-Type": "application/json"}, data: {}})
        .then(res => {
            console.log("Data: ", res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
        <div >
            <TopMenu></TopMenu>
            <CardList></CardList>
        </div>
        );
    }
  }
  
  export default FindRidePage;