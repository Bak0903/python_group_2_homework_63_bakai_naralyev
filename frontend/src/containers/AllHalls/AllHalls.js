import React, {Component} from 'react';
import GetList from '../../components/GetList/GetList';
import axios from 'axios';


class AllMovies extends Component {

    state = {
        allHalls: {},
    };

    getAll = () => {
        axios.get('halls').then(response => {
            const requests = response.data;
            return Promise.all(requests);})
            .then(allHalls => {this.setState({allHalls});})
            .catch(error => {console.log(error);});
    };

    componentDidMount() {
        this.getAll();
    }

    render() {
        return (
            <div className={'AllHalls'}>
                <GetList
                    name={'halls'}
                    list={this.state.allHalls}
                />
            </div>
        );
    }
}

export default AllMovies;