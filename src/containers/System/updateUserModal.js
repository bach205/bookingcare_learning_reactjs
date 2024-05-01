import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../services/userService';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Row, Col, FormGroup, Label, Input
} from 'reactstrap';
class ModalUpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.userData.email,
            firstName: this.props.userData.firstName,
            lastName: this.props.userData.lastName,
            address: this.props.userData.address,
            password: '************',
        }
    }

    componentDidMount() {
    }

    handleOnChange = (event) => {
        let copyState = this.state;
        let id = event.target.id;
        copyState[id] = event.target.value;
        this.setState({
            copyState,
        })
    }

    checkValidInput = () => {
        let arr = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert('Please enter valid ' + arr[i]);
                return false;
            }

        }
        return true;
    }


    handleSubmit = async () => {

        if (this.checkValidInput()) {
            let data = await updateUser({
                ...this.state,
                id: this.props.userData.id
            });
            if (data.status.errCode === 0) {

                alert(data.status.message);
                this.props.toggle();
                this.props.setFindAllUser();
            } else {
                alert('your email is existed');
            }


        }
    };

    render() {
        if (this.props.isClickUpdate) {
            this.state.email = this.props.userData.email;
            this.state.firstName = this.props.userData.firstName;
            this.state.lastName = this.props.userData.lastName;
            this.state.address = this.props.userData.address;
            this.props.checkClickUpdate(false);
            console.log(this.props.isClickUpdate);
        }
        return (

            <>
                <Modal isOpen={this.props.isShow} toggle={() => { this.props.toggle() }}>
                    <ModalHeader toggle={() => { this.props.toggle() }}>Update User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail">
                                            Email
                                        </Label>
                                        <Input
                                            value={this.state.email}
                                            onChange={(id) => this.handleOnChange(id)}
                                            id='email'
                                            placeholder="Enter your email..."
                                            type="email"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword">
                                            Password
                                        </Label>
                                        <Input
                                            value={this.state.password}
                                            onChange={(id) => this.handleOnChange(id)}
                                            id='password'
                                            placeholder="Enter your password..."
                                            type="password"
                                            readOnly
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail">
                                            First Name
                                        </Label>
                                        <Input
                                            value={this.state.firstName}

                                            onChange={(id) => this.handleOnChange(id)}
                                            id='firstName'
                                            placeholder="enter your first name..."
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="examplePassword">
                                            Last Name
                                        </Label>
                                        <Input
                                            value={this.state.lastName}

                                            onChange={(id) => this.handleOnChange(id)}
                                            id='lastName'
                                            placeholder="your last name..."
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="exampleAddress">
                                    Address
                                </Label>
                                <Input
                                    value={this.state.address}

                                    onChange={(id) => this.handleOnChange(id)}
                                    id='address'
                                    placeholder="1234 Main St..."
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary px-3" onClick={() => { this.props.toggle() }}>
                            Cancel
                        </Button>{' '}
                        <Button color="primary px-3" onClick={() => { this.handleSubmit() }}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </ >
        )
    };
}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);