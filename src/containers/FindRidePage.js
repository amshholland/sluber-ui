import React, {Component} from 'react';
import TopMenu from '../components/TopMenu'
import CardList from '../components/CardList'
import axios from 'axios'

class FindRidePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }
    componentDidMount() {
        // TODO: endpoint call, populate data
        axios.get('http://localhost:8080/sluber/trips')
        .then(res => {
            this.setState({ data: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let cardList = null;
        if (this.state.data != null) {
            cardList = <CardList data={this.state.data}></CardList>
        }
        return (
        <div >
            <TopMenu></TopMenu>
            {cardList}
        </div>
        );
    }
  }
  
  export default FindRidePage;