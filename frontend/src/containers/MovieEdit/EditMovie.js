import React, {Component} from 'react'
import MovieForm from "../../components/MovieForm/MovieForm";
import {connect} from "react-redux";
import {putRequest} from "../../store/actions/getRequest";


class EditMovie extends Component {
    state = {
        alert: null,
    };

    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Movie was not added!`};
            return newState;
        });
    };

    gatherFormData = (movie) => {
        let formData = new FormData();
        Object.keys(movie).forEach(key => {
            const value = movie[key];
            if (value) {
                if(Array.isArray(value)) {
                    value.forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    };

    formSubmitted = (movie) => {
        const formData = this.gatherFormData(movie);
        const url = 'movies/' + this.props.match.params.id + '/';
        this.props.putRequest(url, formData).then(this.props.history.replace('/'));
    };

    render() {
        const errors = this.props.errors;
        if (errors)
            this.showErrorAlert(this.props.errors);
        const alert = this.state.alert;
        return <div>
                {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
                <MovieForm onSubmit={this.formSubmitted}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors.response,
    }
};

const mapDispatchToProps = dispatch => ({
    putRequest: (url, formData) => dispatch(putRequest(url, formData))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);