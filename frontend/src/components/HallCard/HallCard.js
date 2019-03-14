import React, {Component} from 'react';
import {NavLink} from "react-router-dom";


class HallCard extends Component {
    render() {
        const {id, name} = this.props.hall;
        return (
            <div className="card col-sm-12 col-md-6 border-0" id={id}>
                <div className="card-body">
                    <NavLink to={'/halls/' + id}><p className="card-text h1">{name}</p></NavLink>
                </div>
            </div>
        );
    }
}

export default HallCard;