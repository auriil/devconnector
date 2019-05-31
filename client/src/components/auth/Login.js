import React from "react";
import useForm from "../hooks/useForm";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

function Login(props) {
    const { values, handleChange, handleSubmit } = useForm(onSubmit);
    const { errors, loginUser, auth } = props;

    if(auth.isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    function onSubmit() {
        loginUser(values);
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form noValidate onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <input type="submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { loginUser })(Login);