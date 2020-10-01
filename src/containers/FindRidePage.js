import React, {Component} from 'react';
import TopMenu from '../components/TopMenu'

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
        </div>
        );
    }
  }
  
  export default FindRidePage;