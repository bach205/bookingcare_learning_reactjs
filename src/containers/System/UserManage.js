import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../System/userManage.scss';
import { findAllUserAPI } from '../../services';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    async componentDidMount() {
        this.setState({
            user: await findAllUserAPI('ALL'),
        })
        console.log(this.state.user.user);
    }


    render() {
        let arrUser = this.state.user.user;
        return (
            <>
                <div className="text-center"><h2>Manage users</h2></div>
                <div className='user-container mx-3 mt-3'>
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
                                console.log(item.email);
                                return (
                                    <>
                                        <tr>
                                            <td>{item.email}</td>

                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='edit'>
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className='delete'><i className="fas fa-trash"></i></button>
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
