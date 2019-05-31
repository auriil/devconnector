import React,{useState} from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import useForm from "../hooks/useForm";
import { addEducation } from "../../actions/profileAction";

function AddEducation(props) {
    const { values, handleChange, handleSubmit } = useForm(onSubmit);
    const [ disabledDateTo, setDisabledDateTo ] = useState(false);
    const { errors, addEducation } = props;

    function onSubmit() {
        addEducation(values, props.history);
    }

    return (
        <div className="add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Education</h1>
                        <p className="lead text-center">
                            Add any school, bootcamp, etc that you have attended
                        </p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="* School"
                                name="school"
                                value={values.school}
                                onChange={handleChange}
                                error={errors.school}
                            />
                            <TextFieldGroup
                                placeholder="* Degree or Certification"
                                name="degree"
                                value={values.degree}
                                onChange={handleChange}
                                error={errors.degree}
                            />
                            <TextFieldGroup
                                placeholder="* Field of Study"
                                name="fieldofstudy"
                                value={values.fieldofstudy}
                                onChange={handleChange}
                                error={errors.fieldofstudy}
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
                                placeholder="Program Description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description}
                                info="Tell us about the program that you were in"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));