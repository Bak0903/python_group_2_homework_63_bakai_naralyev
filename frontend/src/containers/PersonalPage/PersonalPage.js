import React, {Component, Fragment} from 'react';
import UserForm from '../../components/UserForm/UserForm';
import {connect} from "react-redux";


class PersonalPage extends Component {
    state = {
        formVisible: 'invisible'
    };

    turnForm = () => {
        if (this.state.formVisible === 'invisible')
            this.setState({formVisible: 'visible'});
        if (this.state.formVisible === 'visible')
            this.setState({formVisible: 'invisible'});
    };

    render () {
        const {username, first_name, last_name, email} = this.props.user;
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


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};


export default connect(mapStateToProps)(PersonalPage);