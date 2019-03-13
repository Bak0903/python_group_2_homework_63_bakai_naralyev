import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';


class SelectedMovie extends Component {

    state = {
        selectedMovie: [],
        categories: []
    };

    getInfo = (id) => {
        axios.get('movies/' + id).then(response => {
            const categories = response.data.genre.map(element => {
                return axios.get('categories/' + element).then(response => {
                    return response.data.name;
                });
            });
            return Promise.all(categories)
                .then(genre => this.setState({
                    selectedMovie: response.data,
                    categories: [...genre]
                }));
        })
    };

    deleteMovie = (id) => {
        axios.delete('movies/' + id).then(movie => this.props.history.replace('/'))
    };

    componentDidMount() {
        this.getInfo(this.props.match.params.id);
    }

    render() {
        if (!this.state.selectedMovie) return null;
        return (
            <div className="card pb-2">
                <div className="card-header h2">
                    {this.state.selectedMovie.name}
                </div>
                <div className="card-body d-flex col-md-12">
                    <img className="card-img col-md-4 h-50" src={this.state.selectedMovie.poster} alt="poster"/>
                    <blockquote className="blockquote d-block col-md-8 mb-0">
                        {this.state.categories.map((category, i) => <span key={i} className={'h4'}>{category + ' '}</span>)}
                        <p className="text-justify col-md-12 pt-2">{this.state.selectedMovie.description}</p>
                        <p className="text-justify col-md-12 pt-2">Прокат с {this.state.selectedMovie.release_date} по {this.state.selectedMovie.finish_date}</p>
                    </blockquote>
                </div>
                <div>
                    <NavLink
                        to='/'
                        className="btn btn-primary w-25 float-left ml-5 mr-2"
                    >Все фильмы</NavLink>
                    <button
                        className="btn btn-danger w-25 float-right ml-2 mr-2"
                        onClick={() => this.deleteMovie(this.state.selectedMovie.id)}
                        >Удалить</button>
                    <NavLink
                        to={''}
                        className="btn btn-secondary w-25 float-right ml-2 mr-2"
                    >Редактировать</NavLink>
                </div>
            </div>
        );
    }
}

export default SelectedMovie;