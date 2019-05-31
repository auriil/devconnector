import React from "react";
import useForm from "../hooks/useForm";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

function Register(props) {
    const { values, handleChange, handleSubmit } = useForm(onSubmit);
    const { errors, registerUser, auth, history } = props;

    if(auth.isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    function onSubmit() {
        registerUser(values, history);
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form noValidate onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextFieldGroup
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                error={errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            />
                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <TextFieldGroup
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                value={values.password2}
                                onChange={handleChange}
                                error={errors.password2}
                            />
                            <input type="submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));