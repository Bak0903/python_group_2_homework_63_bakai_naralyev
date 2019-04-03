import React, {Component} from 'react';
import HallForm from '../../components/HallForm/HallForm';
import {connect} from "react-redux";
import {postRequest} from "../../store/actions/getRequest";


class HallAdd extends Component {
    state = {
        alert: null,
    };

    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Hall was not added!`};
            return newState;
        });
    };

    gatherFormData = (hall) => {
        let formData = new FormData();
        Object.keys(hall).forEach(key => {
            const value = hall[key];
            if (value) {
                formData.append(key, value);
            }
        });
        return formData;
    };

    formSubmitted = (hall) => {
        const formData = this.gatherFormData(hall);
        const url = 'halls/';
        this.props.postRequest(url, formData);
        // return axios.post('halls/', formData, {
        //     headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': 'Token ' + localStorage.getItem('auth-token')
        //     }
        // })
        //     .then(response => {
        //         const hall = response.data;
        //         this.props.history.replace('/halls/' + hall.id);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         console.log(error.response);
        //         this.showErrorAlert(error.response);
        //     });
    };

    render() {
        const errors = this.props.errors;
        if (errors)
            this.showErrorAlert(this.props.errors);
        const alert = this.state.alert;
        return <div>
                {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
                <HallForm onSubmit={this.formSubmitted}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors.response,
    }
};

const mapDispatchToProps = dispatch => ({
    postRequest: (url, formData) => dispatch(postRequest(url, formData))
});


export default connect(mapStateToProps, mapDispatchToProps)(HallAdd);