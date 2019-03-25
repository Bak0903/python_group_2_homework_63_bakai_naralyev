import React, {Component, Fragment} from 'react';
import axios from 'axios';


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
        return axios.post('login/', this.state.credentials).then(response => {
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('auth-token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('first_name', response.data.first_name);
            localStorage.setItem('last_name', response.data.last_name);
            localStorage.setItem('email', response.data.email);
            if (this.props.location.state) {
                this.props.history.replace(this.props.location.state.next);
            } else {
                this.props.history.goBack();
            }
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.setState({
                ...this.state,
                errors: error.response.data
            })
        });
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


export default Login;