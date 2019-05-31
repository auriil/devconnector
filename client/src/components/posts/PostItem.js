import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, deletePost, removeLike } from "../../actions/postAction";

function PostItem(props) {
    const { post, auth, showActions, deletePost, addLike, removeLike } = props;

    function onLikeClick(id) {
        addLike(id);
    }

    function onUnlikeClick(id) {
        removeLike(id);
    }

    function findUserLike(likes) {
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    function onDeleteClick(id) {
        deletePost(id);
    }

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <Link to="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt=""
                        />
                    </Link>
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    {showActions ? (
                        <span>
                <button
                    onClick={() => onLikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                  <i
                      className={classnames('fas fa-thumbs-up', {
                          'text-info': findUserLike(post.likes)
                      })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                    onClick={() => onUnlikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                            {post.user === auth.user.id ? (
                                <button
                                    onClick={() => onDeleteClick(post._id)}
                                    type="button"
                                    className="btn btn-danger mr-1"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            ) : null}
              </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
    PostItem
);