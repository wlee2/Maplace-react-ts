import React, { Component } from 'react';
import { encrypting } from '../../common';
import { Redirect } from 'react-router';

class Auth extends Component<any> {
    redirecting = async () => {
        if (this.props.match.params.token && window.opener) {
            const token = await encrypting(this.props.match.params.token)
            localStorage.setItem("token", token)
            window.opener.location.pathname = "/"
            window.close();
        }
        else {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div>
                {
                    this.redirecting()
                }
            </div>
        );
    }
}

export default Auth;