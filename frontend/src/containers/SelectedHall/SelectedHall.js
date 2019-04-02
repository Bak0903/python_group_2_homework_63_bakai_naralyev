import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import {connect} from "react-redux";
import {request, deleteRequest} from "../../store/actions/getRequest";


class SelectedHall extends Component {

    composeUrl = (id) => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setDate(date1.getDate()+3);
        const start = date1.toISOString().slice(0, 10);
        const end = date2.toISOString().slice(0, 10);
        return 'shows/?' + this.props.type +'_id=' + id + '&starts_after=' + start + '&starts_before=' + end;
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        const url = this.props.type + 's/' + id;
        const showsUrl = this.composeUrl(id);
        this.props.request(url);
        this.props.request(showsUrl);
    }

    render() {
        const {loading, item, errors, type} = this.props;
        if (loading)
            return (<h1>loading...</h1>);
        if (item) {
            const {name, id} = item;
            const deleteId = type + 's/' + id;
            return (
                <div className="card pb-2 col-12">
                <div className="card-header h1">{name}</div>
                <div className={'mt-2'}>
                    {localStorage.getItem('auth-token') ?
                        <div><button className="btn btn-danger w-25 float-right ml-2 mr-2" onClick={() => this.props.deleteItem(deleteId)}>Удалить</button></div> :
                        <div><NavLink className="btn btn-danger w-25 float-right ml-2 mr-2" to="/login">Удалить</NavLink></div>}
                    <NavLink to={'/halls/' + id + '/edit'} className="btn btn-secondary w-25 float-right ml-2 mr-2">Редактировать</NavLink>
                </div>
                {this.props.shows ? <ShowSchedule shows={this.props.shows} check = {type}/> : null}
            </div>);
        }
        else if (errors) console.log(errors);
        else return null;
    }
}


const mapStateToProps = (state, props) => {
    let type = '';
    let shows = '';
    type = props.match.path.substring(0, 2);
    if (type === '/h') {
        type = 'hall';
        shows = 'hallShows'
    }
    if (type === '/m') {
       type = 'movie';
       shows = 'movieShows'
    }
    return {
        item: state.item[type],
        errors: state.errors,
        loading: state.loading,
        shows: state.shows[shows],
        type: type
    }
};

const mapDispatchToProps = dispatch => ({
    request: (url) => dispatch(request(url)),
    deleteItem: (url) => dispatch(deleteRequest(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedHall);