import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";


class SelectedMovie extends Component {

    state = {
        selectedMovie: [],
        categories: [],
        shows: []
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
        });
        const showsUrl = this.composeUrl(id);
        this.getShows(showsUrl);
    };

    composeUrl = (id) => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setDate(date1.getDate()+3);
        const start = date1.toISOString().slice(0, 10);
        const end = date2.toISOString().slice(0, 10);
        return 'shows/?movie_id=' + id + '&starts_after=' + start + '&starts_before=' + end;
    };

    getShows = (showsUrl) => {
        axios.get(showsUrl).then(response => {
            return response.data;})
            .then(shows => {this.setState({shows});})
            .catch(error => {console.log(error);});
    };

    deleteMovie = (id) => {
        axios.delete('movies/' + id, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(this.props.history.replace('/'))
    };

    componentDidMount() {
        this.getInfo(this.props.match.params.id);
    }

    render() {
        if (!this.state.selectedMovie) return null;
        const {name, poster, description, release_date, finish_date, id} = this.state.selectedMovie;
        const categories = this.state.categories;
        return (
            <div className="card pb-2">
                <div className="card-header h2">
                    {name}
                </div>
                <div className="card-body d-flex col-md-12">
                    <img className="card-img col-md-4 h-50" src={poster} alt="poster"/>
                    <blockquote className="blockquote d-block col-md-8 mb-0">
                        {categories.map((category, i) => <span key={i} className={'h4'}>{category + ' '}</span>)}
                        <p className="text-justify col-md-12 pt-2">{description}</p>
                        <p className="text-justify col-md-12 pt-2">Прокат с {release_date} по {finish_date}</p>
                    </blockquote>
                </div>
                <div>
                    {localStorage.getItem('auth-token')
                    ? <div><button
                        className="btn btn-danger w-25 float-right ml-2 mr-2"
                        onClick={() => this.deleteMovie(id)}
                        >Удалить</button></div>
                    : <div><NavLink className="btn btn-danger w-25 float-right ml-2 mr-2" to="/login">Удалить</NavLink></div>}

                    <NavLink
                        to={'/movies/' + id + '/edit'}
                        className="btn btn-secondary w-25 float-right ml-2 mr-2"
                    >Редактировать</NavLink>
                </div>
                {this.state.shows ? <ShowSchedule shows={this.state.shows} hall={true} movie={false}/> : null}
            </div>
        );
    }
}

export default SelectedMovie;