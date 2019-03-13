import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './MovieCard.css';


class MovieCard extends Component {
    render() {
        const {id, name, poster} = this.props.movie;
        return (
            <div className="card col-sm-12 col-md-4 border-0" id={id}>
                <img className="card-img-top" src={poster} alt="poster"/>
                    <div className="card-body">
                        <NavLink to={'/movies/' + id}><p className="card-text">{name}</p></NavLink>
                    </div>
            </div>
        );
    }
}

export default MovieCard;