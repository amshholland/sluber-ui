import React, {Component} from 'react';
import TopMenu from '../components/TopMenu'
import CardList from '../components/CardList'

class FindRidePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        // TODO: endpoint call, populate data
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