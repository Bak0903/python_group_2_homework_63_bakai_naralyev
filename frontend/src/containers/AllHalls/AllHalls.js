import React, {Component} from 'react';
import GetList from '../../components/GetList/GetList';
import {NavLink} from "react-router-dom";
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
                <div><NavLink to='/halls/add' className='btn btn-outline-warning w-25 mb-3 float-right'>Добавить зал</NavLink></div>
                <GetList
                    name={'halls'}
                    list={this.state.allHalls}
                />
            </div>
        );
    }
}

export default AllMovies;