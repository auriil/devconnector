import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/postAction";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

function Post(props) {
    const { getPost } = props;
    const { post, loading } = props.post;
    const id = props.match.params.id;

    useEffect(() => {
        getPost(id);
    }, [getPost, id]);

    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
        postContent = <Spinner />;
    } else {
        postContent = (
            <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
            </div>
        );
    }

    return (
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/feed" className="btn btn-light mb-3">
                            Back To Feed
                        </Link>
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);