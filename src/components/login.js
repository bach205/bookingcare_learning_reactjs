import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../store/actions";
import { handleLoginAPI } from '../services';
import './Login.scss';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isPasswordShow: false,
            errMessage: '',
        }
    }
    handleChangingInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

    }

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            let r = await handleLoginAPI(this.state.userName, this.state.password);
            if (r && r.errCode !== 0) {
                console.log('not error');
                this.setState({
                    errMessage: r.message,
                })
            }

            else if (r && r.errCode == 0) {
                this.props.userLoginSuccess(r.userInfo);
                console.log('login success');
            };

        } catch (error) {
            console.log('error');
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
            console.log(error.response);
        }
    };

    handleShowPassword = () => {
        this.setState({
            isPasswordShow: !this.state.isPasswordShow,
        })
    }

    render() {
        return (
            <div>
                <div className='background-container'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <h2 className='col-12'>Login</h2>
                            <div className='col-12 form-group'>
                                <label>Username:</label>
                                <input onChange={(event) => { this.handleChangingInput(event) }} name='userName' value={this.state.userName} className='form-control' type='text' placeholder='Enter your email'></input>
                            </div>
                            <div className='password-eye col-12 mt-3 form-group'>
                                <div>
                                    <label>Password:</label>
                                    <input onChange={(event) => { this.handleChangingInput(event) }} name='password' value={this.state.password} className='form-control' type={this.state.isPasswordShow ? 'text' : 'password'} placeholder='Enter your password'></input>
                                </div>
                                <i onClick={() => { this.handleShowPassword() }} className={this.state.isPasswordShow ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </div>
                            <div className='col-12 mt-1 mb-1' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12 mt-3'>
                                <button onClick={() => { this.handleLogin() }} style={{ color: 'white' }} className='btn-login '>Login</button>
                            </div>
                            <div className='col-12'>
                                <a href='/login'>Forgot your password?</a>
                            </div>
                            <div className='col-12 text-center'>or login with:</div>
                            <div className='col-12 mt-0 text-center'>
                                <i className="fab fa-facebook fb"></i>
                                <i className="fab fa-google gg"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
