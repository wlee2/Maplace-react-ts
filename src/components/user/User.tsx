import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { UserAction } from '../../actions/userAcrions';
import { connect } from 'react-redux';
import { StoreState } from '../../store';

class User extends Component<any, any> {
    state = {
        error: '',
        inputEmail: '',
        inputPassword: ''
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.getUserInfo();
        }
    }

    inputHandler = (event: any, type: string) => {
        if (type === 'email') {
            this.setState({
                inputEmail: event.target.value
            })
        }
        else if (type === 'password') {
            this.setState({
                inputPassword: event.target.value
            })
        }
    }

    tryLogin = () => {
        this.props.login(this.state.inputEmail, this.state.inputPassword);
    }


    render() {
        return (
            <>
                {
                    this.props.user.id !== '' ?
                        <div>
                            {
                                Object.keys(this.props.user).map((key, i) => {
                                    return <p key={i}>{key}: {this.props.user[key]}</p>
                                })
                            }
                        </div> :
                        <div>
                            <label> Email:
                                <input type="email" onChange={event => this.inputHandler(event, 'email')} value={this.state.inputEmail} />
                            </label>
                            <br />
                            <label> password:
                                <input type="email" onChange={event => this.inputHandler(event, 'password')} value={this.state.inputPassword} />
                            </label>
                            <button onClick={this.tryLogin}>Login</button>
                        </div>
                }
            </>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(UserAction, dispatch)
)(User);