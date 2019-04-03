import React, {Component, Fragment} from 'react';
import {login} from "../../store/actions/requests/login";
import connect from "react-redux/es/connect/connect";



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
        this.props.login(url, this.state.credentials);
        console.log(this.props.errors);
        if (this.props.errors) {
            this.setState({
                ...this.state,
                errors: this.props.errors.data
            })
        }
        else this.props.history.replace('/');
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
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
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
                <button type="submit" className="btn btn-primary mt-2">Войти</button>
            </form>
        </Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
    }
};

const mapDispatchToProps = dispatch => ({
    login: (url, loginData) => dispatch(login(url, loginData))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);