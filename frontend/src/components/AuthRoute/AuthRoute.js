import React from 'react'
import {Redirect, Route} from 'react-router'
import {connect} from "react-redux";


const AuthRoute = (props) => {
    if(props.user.username) {
        return <Route {...props} />
    }
    return <Redirect to={{
        pathname: "/login",
        state: {next: props.location}
    }}/>
};


const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);