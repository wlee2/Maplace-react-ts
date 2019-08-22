import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { UserAction } from '../../actions/userAcrions';

class User extends Component<any, any> {

    redirecting = () => {
        if (this.props.user.email === '') {
            this.props.openSnackbarInUserAction('Error', 'Login Required')
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
    mapStateToProps,
    dispatch => bindActionCreators(UserAction as any, dispatch)
)(User);