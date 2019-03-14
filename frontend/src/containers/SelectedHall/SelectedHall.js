import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';


class SelectedMovie extends Component {

    state = {
        selectedHall: [],
    };

    getInfo = (id) => {
        axios.get('halls/' + id).then(response => {
            return response.data;})
            .then(selectedHall => {this.setState({selectedHall});})
            .catch(error => {console.log(error);});
    };

    deleteHall = (id) => {
        axios.delete('halls/' + id).then(this.props.history.replace('/halls/'))
    };

    componentDidMount() {
        this.getInfo(this.props.match.params.id);
    }

    render() {
        if (!this.state.selectedHall) return null;
        console.log(this.state.selectedHall);
        const {name, id} = this.state.selectedHall;
        return (
            <div className="card pb-2 col-12">
                <div className="card-header h1">
                    {name}
                </div>
                <div className={'mt-2'}>
                    <button
                        className="btn btn-danger w-25 float-right ml-2 mr-2"
                        onClick={() => this.deleteHall(id)}
                        >Удалить</button>
                    <NavLink
                        to={'/halls/' + id + '/edit'}
                        className="btn btn-secondary w-25 float-right ml-2 mr-2"
                    >Редактировать</NavLink>
                </div>
            </div>
        );
    }
}

export default SelectedMovie;