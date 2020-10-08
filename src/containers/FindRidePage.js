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
                phone: '1234567890',
            }
        }
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips')
        .then(res => {
            let driverData = res.data.filter(o => o.originator === 'DRIVER')
            let passengerData = res.data.filter(o => o.originator === 'PASSENGER')
            console.log(driverData)
            this.setState({ driverData: driverData, passengerData: passengerData, data: driverData })
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

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        if (event.target.value == 'driver') {
            this.setState({ data: this.state.driverData })
        } else {
            this.setState({ data: this.state.passengerData })
        }
    };

    handleSubmit = e => {
        // e is trip id
        axios.post('http://localhost:8080/sluber/trips/' + e + '/add-passenger', { name: this.state.passenger.name, phone: this.state.passenger.phone },
        { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        // console.log(e, 'EEEE')
    }

    render() {
        let cardList = this.state.data ? <CardList handleSubmit={this.handleSubmit} data={this.state.data}></CardList> : null
        return (
        <div >
            <TopMenu handleChange={this.handleChange} value={this.state.value}></TopMenu>
            {cardList}
        </div>
        );
    }
  }
  
  export default FindRidePage;