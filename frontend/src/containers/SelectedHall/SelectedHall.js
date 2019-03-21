import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import axios from 'axios';


class SelectedMovie extends Component {

    state = {
        selectedHall: [],
        shows: []
    };

    getInfo = (id) => {
        axios.get('halls/' + id).then(response => {
            console.log();
            return response.data;})
            .then(selectedHall => {this.setState({selectedHall});})
            .catch(error => {console.log(error);});

        const showsUrl = this.composeUrl(id);
        this.getShows(showsUrl)
    };


    composeUrl = (id) => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setDate(date1.getDate()+3);
        const start = date1.toISOString().slice(0, 10);
        const end = date2.toISOString().slice(0, 10);
        return 'shows/?hall_id=' + id + '&starts_after=' + start + '&starts_before=' + end;
    };

    getShows = (showsUrl) => {
        axios.get(showsUrl).then(response => {
            return response.data;})
            .then(shows => {this.setState({shows});})
            .catch(error => {console.log(error);});
    };
    deleteHall = (id) => {
        axios.delete('halls/' + id, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(this.props.history.replace('/halls/'))
    };

    componentDidMount() {
        this.getInfo(this.props.match.params.id);
    }

    render() {
        if (!this.state.selectedHall) return null;
        const {name, id} = this.state.selectedHall;
        return (
            <div className="card pb-2 col-12">
                <div className="card-header h1">
                    {name}
                </div>
                <div className={'mt-2'}>
                    {localStorage.getItem('auth-token')
                    ? <div><button
                        className="btn btn-danger w-25 float-right ml-2 mr-2"
                        onClick={() => this.deleteHall(id)}
                        >Удалить</button></div>
                    : <div><NavLink className="btn btn-danger w-25 float-right ml-2 mr-2" to="/login">Удалить</NavLink></div>}
                    <NavLink
                        to={'/halls/' + id + '/edit'}
                        className="btn btn-secondary w-25 float-right ml-2 mr-2"
                    >Редактировать</NavLink>
                </div>
                {this.state.shows ? <ShowSchedule shows={this.state.shows} movie={true} hall={false}/> : null}
            </div>
        );
    }
}

export default SelectedMovie;