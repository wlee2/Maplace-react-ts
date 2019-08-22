import React, { Component } from 'react';
import { encrypting } from '../../common';
import { Redirect } from 'react-router';

class Auth extends Component<any> {
    redirecting = () => {
        if (this.props.match.params.token && window.opener) {
            localStorage.setItem("token", encrypting(this.props.match.params.token))
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