import React,{useState} from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import useForm from "../hooks/useForm";
import { addExperience } from "../../actions/profileAction";

function AddExperience(props) {
    const { values, handleChange, handleSubmit } = useForm(onSubmit);
    const [ disabledDateTo, setDisabledDateTo ] = useState(false);
    const { errors, addExperience } = props;

    function onSubmit() {
        addExperience(values, props.history);
    }

    return (
        <div className="add-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Experience</h1>
                        <p className="lead text-center">
                            Add any job or position that you have had in the past or current
                        </p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value={values.company}
                                onChange={handleChange}
                                error={errors.company}
                            />
                            <TextFieldGroup
                                placeholder="* Job Title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                error={errors.title}
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={values.location}
                                onChange={handleChange}
                                error={errors.location}
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup
                                name="from"
                                type="date"
                                value={values.from}
                                onChange={handleChange}
                                error={errors.from}
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                name="to"
                                type="date"
                                value={values.to}
                                onChange={handleChange}
                                error={errors.to}
                                disabled={disabledDateTo ? 'disabled' : ''}
                            />
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={values.current}
                                    onChange={handleChange}
                                    onClick={() => setDisabledDateTo(!disabledDateTo)}
                                    id="current"
                                />
                                <label htmlFor="current" className="form-check-label">
                                    Current Job
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder="Job Description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description}
                                info="Tell us about the the position"
                            />
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));