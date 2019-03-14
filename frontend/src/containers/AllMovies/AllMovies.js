import React, {Component} from 'react';
import GetList from '../../components/GetList/GetList';
import {NavLink} from "react-router-dom";
import axios from 'axios';


class AllMovies extends Component {

    state = {
        allMovies: {},
    };

    getAll = () => {
        axios.get('movies').then(response => {
            const requests = response.data.map(movie => {
                return {
                    id: movie.id,
                    poster: movie.poster,
                    name: movie.name
                };
            });
            return Promise.all(requests);})
            .then(allMovies => {this.setState({allMovies});})
            .catch(error => {console.log(error);});
    };

    componentDidMount() {
        this.getAll();
    }

    render() {
        return (
            <div className='AllMovies'>
                <div><NavLink to='/movies/add' className='btn btn-outline-warning w-25 mb-3 float-right'>Добавить фильм</NavLink></div>
                <GetList
                    name={'movies'}
                    list={this.state.allMovies}
                />
            </div>
        );
    }
}

export default AllMovies;