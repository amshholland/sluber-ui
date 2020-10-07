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
        axios.get(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips')
        .then(res => {
            this.setState({ data: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    addToData = e => {
        let temp = this.state.data
        temp.unshift(e)
        this.setState({ data: temp })
    }

    render() {
        let cardList = this.state.data ? <CardList data={this.state.data}></CardList> : null
        return (
        <div >
            <TopMenu addToData={this.addToData}/>
            {cardList}
        </div>
        );
    }
  }
  
  export default FindRidePage;