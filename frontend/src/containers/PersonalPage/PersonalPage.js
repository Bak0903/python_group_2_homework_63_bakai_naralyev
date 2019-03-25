import React, {Component, Fragment} from 'react';
import UserForm from '../../components/UserForm/UserForm';

class PersonalPage extends Component {
    state = {
        user: {
            id: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
            first_name: localStorage.getItem('first_name'),
            last_name: localStorage.getItem('last_name'),
            email: localStorage.getItem('email')
        },

        formVisible: 'invisible'
    };

    turnForm = () => {
        this.setState({formVisible: 'visible'});
    };

    render () {
        const {username, first_name, last_name, email} = this.state.user;
        return <Fragment>
            <p>Логин: {username}</p>
            <p>Имя: {first_name}</p>
            <p>Фамилия: {last_name}</p>
            <p>Электронная почта: {email}</p>
            <button onClick={this.turnForm}>Редакировать</button>
            <div className={this.state.formVisible}>
                <UserForm user={this.state.user}/>
            </div>
        </Fragment>
    }
}


export default PersonalPage;