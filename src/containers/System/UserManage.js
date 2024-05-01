import React, { Component } from 'react';

import { connect } from 'react-redux';
import '../System/userManage.scss';
import { findAllUserAPI, deleteUser } from '../../services';
import ModalUser from './createUserModal';
import ModalUpdateUser from './updateUserModal';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            isShowModal: false,
            isShowModalUpdating: false,
            userData: {},
            isClickUpdate: false,
        }
    }

    async componentDidMount() {
        this.setFindAllUser();
    }
    toggleFunction = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
        })

    }

    toggleUpdateFunction = () => {
        this.setState({
            isShowModalUpdating: !this.state.isShowModalUpdating,
        })

    }

    setFindAllUser = async () => {
        this.setState({
            userList: await findAllUserAPI('ALL'),
        })
    }

    handleDeleteUser = async (id) => {

        await deleteUser(id);
        await this.setFindAllUser();

    }

    checkClickUpdate = (state) => {
        this.setState({
            isClickUpdate: state,
        })
    }

    render() {
        console.log('dad', this.state.isClickUpdate);
        let arrUser = this.state.userList.user;
        return (
            <>
                <ModalUser
                    isShow={this.state.isShowModal}
                    toggle={this.toggleFunction}
                    setFindAllUser={this.setFindAllUser}

                ></ModalUser>
                <ModalUpdateUser
                    userData={this.state.userData}
                    isShow={this.state.isShowModalUpdating}
                    toggle={this.toggleUpdateFunction}
                    setFindAllUser={this.setFindAllUser}
                    isClickUpdate={this.state.isClickUpdate}
                    checkClickUpdate={this.checkClickUpdate}
                ></ModalUpdateUser>
                <div className="text-center"><h2>Manage users</h2></div>
                <div className='user-container mx-3 mt-3'>

                    <button
                        style={{ cursor: 'pointer' }}
                        onClick={() => { this.toggleFunction(); }}
                        className='btn btn-primary px-3 mb-1'>
                        <i className="fas fa-user-plus"></i> Add New</button>

                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>LastName</th>
                                <th>FirstName</th>
                                <th>Adress</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.map((item) => {

                                return (
                                    <>
                                        <tr>
                                            <td>{item.email}</td>

                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    onClick={() => {

                                                        this.state.userData = item;
                                                        this.state.isClickUpdate = true;


                                                        this.toggleUpdateFunction();
                                                    }}
                                                    type='button'
                                                    className='edit'>
                                                    <i className="fas fa-edit"></i>
                                                </button>

                                                <button type='button'
                                                    onClick={() => this.handleDeleteUser(item.id)}
                                                    className='delete'>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr >
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            </>

        );

    }
}



const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
