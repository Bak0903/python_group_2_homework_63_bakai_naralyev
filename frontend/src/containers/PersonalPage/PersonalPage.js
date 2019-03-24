import React, {Component, Fragment} from 'react';


class PersonalPage extends Component {
    render () {
        const first_name = localStorage.getItem('first_name');
        const last_name = localStorage.getItem('last_name');
        const email = localStorage.getItem('email');
        const username = localStorage.getItem('username');
        console.log(username, first_name, last_name, email);
        return <Fragment>
        </Fragment>
    }
}


export default PersonalPage;