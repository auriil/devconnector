import React from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import useForm from "../hooks/useForm";
import { addPost } from "../../actions/postAction";

function PostForm(props) {
    const { values, handleChange, handleSubmit, setValues } = useForm(onSubmit);
    const { addPost, errors } = props;
    const { user } = props.auth;

    function onSubmit() {
        const newPost = {
            text: values.text,
            name: user.name,
            avatar: user.avatar
        };
        addPost(newPost);
        setValues({text: ''})
    }

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">Say Somthing...</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder="Create a post"
                                name="text"
                                value={values.text}
                                onChange={handleChange}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);