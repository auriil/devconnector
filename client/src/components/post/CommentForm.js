import React from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import useForm from "../hooks/useForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/postAction";

function CommentForm(props) {
    const { values, handleChange, handleSubmit, setValues } = useForm(onSubmit);
    const { errors, addComment, postId } = props;

    function onSubmit() {
        const { user } = props.auth;

        const newComment = {
            text: values.text,
            name: user.name,
            avatar: user.avatar
        };

        addComment(postId, newComment);
        setValues({ text: '' });
    }

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Make a comment...
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder="Reply to post"
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);