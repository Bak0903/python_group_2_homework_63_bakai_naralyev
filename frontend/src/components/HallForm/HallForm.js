import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";


class HallForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hall: {
                name: "",
            },

            submitEnabled: true
        };
        if(this.props.item.name) {
            console.log(this.props.item.name);
            this.state.hall.name= this.props.item.name;
        }
    }

    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };

    updateHallState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.hall};
            hall[fieldName] = value;
            newState.hall= hall;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateHallState(fieldName, value);
    };

    formSubmitted = (event) => {
        if(this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.hall)
                .then(this.enableSubmit);
        }
    };

    render() {
        const name = this.state.hall.name;
        const submitEnabled = this.state.submitEnabled;
        if (this.state.hall) {
            return <Fragment>
                <div>{alert}</div>
                <form className="mt-3" onSubmit={this.formSubmitted}>
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={this.inputChanged}/>
                    </div>
                    <button disabled={!submitEnabled} type="submit"
                            className="btn btn-primary">Сохранить
                    </button>
                </form>
            </Fragment>;
        }
        else return null;
    }
}

const mapStateToProps = (state, props) => {
    return {
        item: state.item.hall,
    }
};

export default connect(mapStateToProps)(HallForm);