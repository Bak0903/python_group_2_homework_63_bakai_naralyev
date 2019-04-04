import React, {Component, Fragment} from 'react';
import {login} from "../../store/actions/requests/login";
import {connect} from "react-redux";
import {SUCCESS} from "../../store/actions/statuses/actionSuccess";
import {CATCHERROR} from "../../store/actions/statuses/actionError";



class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: ""
        },
        errors: {}
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const url = 'login/';
        return this.props.login(url, this.state.credentials).then(result => {
            if (result.type === SUCCESS) {
                console.log('SUCCESS');
                this.props.history.replace('/user/');}
            if (result.type === CATCHERROR) {
                console.log('CATCHERROR');
            }
        })
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })
    };

    showErrors = (name) => {
        const errors = this.props.errors;
        if (errors && errors[name]) {
            return errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password} = this.state.credentials;
        return <Fragment>
            <h2>Вход</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <button type="submit" disabled={this.props.loading} className="btn btn-primary mt-2">Войти</button>
            </form>
        </Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => ({
    login: (url, loginData) => dispatch(login(url, loginData))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);