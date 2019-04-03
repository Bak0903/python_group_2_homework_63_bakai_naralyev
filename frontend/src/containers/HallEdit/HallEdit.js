import React, {Component} from 'react'
import axios from "axios";
import HallForm from "../../components/HallForm/HallForm";


class HallEdit extends Component {
    state = {
        alert: null,
    };

    // componentDidMount() {
    //     axios.get('halls/' + this.props.match.params.id)
    //         .then(response => {
    //             const hall = response.data;
    //             this.setState(prevState => {
    //                 const newState = {...prevState};
    //                 newState.hall = hall;
    //                 return newState;
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             console.log(error.response);
    //         });
    // }

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
        return axios.put('halls/' + this.props.match.params.id + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                const hall = response.data;
                console.log(hall);
                this.props.history.replace('/halls/' + hall.id);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.showErrorAlert(error.response);
            });
    };

    render() {
        const {alert} = this.state;
        return <div>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <HallForm onSubmit={this.formSubmitted}/>
        </div>
    }
}


export default HallEdit;