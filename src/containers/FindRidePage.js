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
            passenger: {
                name: 'Anthony Joo',
                phoneNumber: '123-456-7890',
            }
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

    handleSubmit = e => {
        axios.put(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips/' + e + '/add-passenger', this.state.passenger)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let cardList = this.state.data ? <CardList value={this.state.value} handleSubmit={this.handleSubmit} data={this.state.data}></CardList> : null
        return (
        <div >
            <TopMenu handleChange={this.handleChange} value={this.state.value} addToData={this.addToData}></TopMenu>
            {cardList}
        </div>
        );
    }
  }
  
  export default FindRidePage;