import React, { Component } from 'react';
import { encrypting } from '../../common';
import { Redirect } from 'react-router';

class Auth extends Component<any> {
    state = {
        redirect: false
    }

    componentDidMount = () => {
        if (this.props.match.params.token) {
            localStorage.setItem("token", encrypting(this.props.match.params.token))
            window.opener.location.href = "http://localhost:3000/"
            window.close();
        }
        else {
            this.setState({ redirect: true });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                        <Redirect to='/' /> : <></>
                }
            </div>
        );
    }
}

export default Auth;