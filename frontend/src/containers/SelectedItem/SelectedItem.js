import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import {connect} from "react-redux";
import {request} from "../../store/actions/requests/get";
import {deleteRequest} from "../../store/actions/requests/delete";
import {getMovie} from "../../store/actions/requests/getMovie";


class SelectedItem extends Component {

    composeUrl = (id) => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setDate(date1.getDate()+3);
        const start = date1.toISOString().slice(0, 10);
        const end = date2.toISOString().slice(0, 10);
        return 'shows/?' + this.props.type +'_id=' + id + '&starts_after=' + start + '&starts_before=' + end;
    };

    deleteItem = (url) => {
        this.props.deleteItem(url);
        if (this.props.type === 'hall')
            this.props.history.replace('/halls/');
        if (this.props.type === 'movie')
            this.props.history.replace('/');
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        const url = this.props.type + 's/' + id;

        if (this.props.type === 'movie')
            this.props.getMovie(url);

        if (this.props.type === 'hall')
            this.props.request(url);

        const showsUrl = this.composeUrl(id);
        if (this.props.loading)
            this.props.request(showsUrl);
    }

    render() {
        const {loading, item, errors, type} = this.props;
        if (loading)
            return (<h1>loading...</h1>);
        else if (item) {
            const {name, id, poster, description, release_date, finish_date, categories} = item;
            const deleteId = type + 's/' + id;
            return (
                <div className="card pb-2 col-12">
                <div className="card-header h2">{name}</div>
                <div className={'mt-2'}>

                <div className="card-body d-flex col-md-12">
                    {poster ? <img className="card-img col-md-4 h-50" src={poster} alt="poster"/> : null}
                    <blockquote className="blockquote d-block col-md-8 mb-0">
                    {categories ? (Object.values(categories).map((category, i) =>
                        {return <span key={i} className={'h4'}>{category.name + ' '}</span>;})) : null}
                        {description ? <p className="text-justify col-md-12 pt-2">{description}</p> : null}
                        {release_date ? <p className="text-justify col-md-12 pt-2">Прокат с {release_date} по {finish_date}</p>: null}
                    </blockquote>
                </div>

                    {localStorage.getItem('auth-token') ?
                        <div><button className="btn btn-danger w-25 float-right ml-2 mr-2" onClick={() => this.deleteItem(deleteId)}>Удалить</button></div> :
                        <div><NavLink className="btn btn-danger w-25 float-right ml-2 mr-2" to="/login">Удалить</NavLink></div>}
                    <NavLink to={'/' + type +'s/' + id + '/edit'} className="btn btn-secondary w-25 float-right ml-2 mr-2">Редактировать</NavLink>
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
    deleteItem: (url) => dispatch(deleteRequest(url)),
    getMovie: (url) => dispatch(getMovie(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedItem);