import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import axios from "axios";
import {connect} from "react-redux";
import {request, deleteRequest} from "../../store/actions/getRequest";


class SelectedHall extends Component {

    composeUrl = (id) => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setDate(date1.getDate()+3);
        const start = date1.toISOString().slice(0, 10);
        const end = date2.toISOString().slice(0, 10);
        return 'shows/?hall_id=' + id + '&starts_after=' + start + '&starts_before=' + end;
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
        const id = this.props.match.params.id;
        const url = 'halls/' + id;
        const showsUrl = this.composeUrl(id);
        this.props.request(url);
        this.props.request(showsUrl);
    }

    render() {
        const {loading, hall, errors} = this.props;
        if (loading)
            return (<h1>loading...</h1>);
        if (hall) {
            const {name, id} = hall;
            const deleteId = 'halls/' + id;
            console.log(this.deleteHall);
            return (
                <div className="card pb-2 col-12">
                <div className="card-header h1">{name}</div>
                <div className={'mt-2'}>
                    {localStorage.getItem('auth-token') ?
                        <div><button className="btn btn-danger w-25 float-right ml-2 mr-2" onClick={() => this.props.deleteHall(deleteId)}>Удалить</button></div> :
                        <div><NavLink className="btn btn-danger w-25 float-right ml-2 mr-2" to="/login">Удалить</NavLink></div>}
                    <NavLink to={'/halls/' + id + '/edit'} className="btn btn-secondary w-25 float-right ml-2 mr-2">Редактировать</NavLink>
                </div>
                {this.props.shows ? <ShowSchedule shows={this.props.shows} movie={true} hall={false}/> : null}
            </div>);
        }
        else if (errors) console.log(errors);
        else return null;
    }
}


const mapStateToProps = (state, props) => {
    // let type = '';
    // if (props.match.path === '/halls') type = 'halls';
    // if (props.match.path === '/') type = 'movies';
    return {
        hall: state.item.hall,
        errors: state.errors,
        loading: state.loading,
        shows: state.shows.hallShows
    }
};

const mapDispatchToProps = dispatch => ({
    request: (url) => dispatch(request(url)),
    deleteHall: (url) => dispatch(deleteRequest(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedHall);