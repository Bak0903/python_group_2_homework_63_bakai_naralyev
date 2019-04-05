import React, {Component} from 'react';
import GetList from '../../components/GetList/GetList';
import {connect} from "react-redux";
import {request} from "../../store/actions/requests/get";


class AllItems extends Component {

    componentDidMount() {
            this.props.request('halls');
            this.props.request('movies');
    }

    render() {
        const {loading, list, errors, type} = this.props;
        if (loading)
            return (<h1>loading...</h1>);
        else if (list) {
            return (
                <div>
                    <GetList
                        name={type}
                        list={list}
                    />
                </div>
            );
        }
        else if (errors) console.log(errors);
        else return null;
    }
}

const mapStateToProps = (state, props) => {
    let type = '';
    if (props.match.path === '/halls') type = 'halls';
    if (props.match.path === '/') type = 'movies';
    return {
        list: state.lists[type],
        errors: state.errors,
        loading: state.loading,
        type: type
    }
};

const mapDispatchToProps = dispatch => ({
    request: (url) => dispatch(request(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItems);