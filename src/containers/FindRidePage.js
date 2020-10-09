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
            let driverData = res.data.filter(o => o.originator === 'DRIVER')
            let passengerData = res.data.filter(o => o.originator === 'PASSENGER')
            this.setState({ driverData: driverData, passengerData: passengerData, data: driverData })
        })
        .catch(err => {
            console.log(err)
        })
    }

    addToData = e => {
        axios.get(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips')
        .then(res => {
            let driverData = res.data.filter(o => o.originator === 'DRIVER')
            let passengerData = res.data.filter(o => o.originator === 'PASSENGER')
            this.setState({ driverData: driverData, passengerData: passengerData })
            if (this.state.value == 'driver') {
                this.setState({ data: driverData })
            } else {
                this.setState({ data: passengerData })
            }
            console.log(driverData)
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        if (event.target.value === 'driver') {
            this.setState({ data: this.state.driverData })
        } else {
            this.setState({ data: this.state.passengerData })
        }
    };

    render() {
        let cardList = this.state.data ? <CardList value={this.state.value} data={this.state.data}></CardList> : null
        return (
        <div >
            <TopMenu handleChange={this.handleChange} value={this.state.value} addToData={this.addToData}></TopMenu>
            {cardList}
        </div>
        );
    }
  }
  
  export default FindRidePage;