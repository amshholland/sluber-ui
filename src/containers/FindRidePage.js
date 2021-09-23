import React, {Component} from 'react';
import TopMenu from '../components/TopMenu'
import CardList from '../components/CardList'
import axios from 'axios'
import EmptyState from '../components/Empty'
import {Container} from "@material-ui/core";
import { SplashPage } from '../components/SplashPage';
class FindRidePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
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
            this.setState({ driverData: driverData, passengerData: passengerData, data: driverData, loading: false })
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false})
        })
    }

    addToData = e => {
        axios.get(process.env.REACT_APP_SLUBER_SERVICE_URL + '/trips')
        .then(res => {
            let driverData = res.data.filter(o => o.originator === 'DRIVER')
            let passengerData = res.data.filter(o => o.originator === 'PASSENGER')
            this.setState({ driverData: driverData, passengerData: passengerData })
            if (this.state.value === 'driver') {
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
            this.addToData()
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let cardList = this.state.data ? <CardList value={this.state.value} handleSubmit={this.handleSubmit} data={this.state.data}></CardList> : null
        let results = this.state.data === null ? <EmptyState /> : cardList

        if (this.state.loading) {
            return (
                <SplashPage />
            )
        }
        return (
        <Container >
            <TopMenu handleChange={this.handleChange} value={this.state.value} addToData={this.addToData}></TopMenu>
            {results}
        </Container>
        );
    }
  }

  export default FindRidePage;