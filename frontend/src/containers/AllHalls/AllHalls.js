import React, {Component} from 'react';
import GetList from '../../components/GetList/GetList';
import {connect} from "react-redux";
import {list} from "../../store/actions/ListRequest";


class AllMovies extends Component {

    componentDidMount() {
        this.props.request('halls');
    }

    render() {
        if (this.props.list) {
            return (
                <div className={'AllHalls'}>
                    <GetList
                        name={'halls'}
                        list={this.props.list}
                    />
                </div>
            );
        }
        else if (this.props.errors) console.log(this.props.errors);
        else return null;
    }
}

const mapStateToProps = state => {
    return {
        list: state.hallList,
        errors: state.errors
    }
};

const mapDispatchToProps = dispatch => ({
    request: (url) => dispatch(list(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllMovies);