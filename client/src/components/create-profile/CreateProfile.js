import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import useForm from "../hooks/useForm";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileAction";

function CreateProfile(props) {
    const { values, handleChange, handleSubmit } = useForm(onSubmit);
    const [ displaySocialInputs, setDisplaySocialInputs ] = useState(false);
    const { errors, createProfile, history } = props;

    function onSubmit() {
        createProfile(values, history);
    }

    let socialInputs;

    if (displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={values.twitter}
                    onChange={handleChange}
                    error={errors.twitter}
                />

                <InputGroup
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={values.facebook}
                    onChange={handleChange}
                    error={errors.facebook}
                />

                <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={values.linkedin}
                    onChange={handleChange}
                    error={errors.linkedin}
                />

                <InputGroup
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={values.youtube}
                    onChange={handleChange}
                    error={errors.youtube}
                />

                <InputGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={values.instagram}
                    onChange={handleChange}
                    error={errors.instagram}
                />
            </div>
        );
    }

    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ];

    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <a href="dashboard.html" className="btn btn-light">
                            Go Back
                        </a>
                        <h1 className="display-4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">Let's get some information to make your profile stand out</p>
                        <small className="d-block pb-3">* = required field</small>
                        <form noValidate onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile handle"
                                name="handle"
                                type="text"
                                value={values.handle}
                                onChange={handleChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full
                                    name, company name, nickname, etc (This CAN'T be changed later)"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                options={options}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                type="text"
                                value={values.company}
                                onChange={handleChange}
                                error={errors.company}
                                info="Could be your own company or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                type="text"
                                value={values.website}
                                onChange={handleChange}
                                error={errors.website}
                                info="Could be your own or a company website"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                type="text"
                                value={values.location}
                                onChange={handleChange}
                                error={errors.location}
                                info="City & state suggested (eg. Boston, MA)"
                            />
                            <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                type="text"
                                value={values.skills}
                                onChange={handleChange}
                                error={errors.skills}
                                info="Please use comma separated values (eg.
                                    HTML,CSS,JavaScript,PHP)"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                type="text"
                                value={values.githubusername}
                                onChange={handleChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link,
                                    include your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={values.bio}
                                onChange={handleChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
                                    className="btn btn-light"
                                >
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input type="submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));