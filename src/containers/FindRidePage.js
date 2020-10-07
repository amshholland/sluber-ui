import React, {Component} from 'react';
import TopMenu from '../components/TopMenu'
import CardList from '../components/CardList'
import axios from 'axios'

class FindRidePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            value: 'driver',
            passengerData: [],
            driverData: [],
        }
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips')
        .then(res => {
            for (let i in res.data) {
                if (res.data[i].originator == "DRIVER") {
                    let temp = this.state.driverData
                    temp.push(res.data[i])
                    this.setState({ driverData: temp })
                } else {
                    let temp = this.state.passengerData
                    temp.push(res.data[i])
                    this.setState({ passengerData: temp })
                }
            }
            this.setState({ data: this.state.driverData })
        })
        .catch(err => {
            console.log(err)
        })

    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        if (event.target.value == "driver") {
            this.setState({ data: this.state.driverData })
        } else {
            this.setState({ data: this.state.passengerData })
        }
    };

    render() {
        let cardList = this.state.data ? <CardList data={this.state.data}></CardList> : null
        return (
        <div >
            <TopMenu handleChange={this.handleChange} value={this.state.value}></TopMenu>
            {cardList}
        </div>
        );
    }
  }
  
  export default FindRidePage;