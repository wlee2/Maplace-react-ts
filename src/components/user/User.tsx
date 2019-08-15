import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store';
import { Redirect } from 'react-router-dom';

class User extends Component<any, any> {

    redirecting = () => {
        if (this.props.user.email === '') {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <>
                {this.redirecting()}
                <div>
                    {
                        Object.keys(this.props.user).map((key, i) => {
                            return <p key={i}>{key}: {this.props.user[key]}</p>
                        })
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user
});

export default connect(
    mapStateToProps
)(User);