import React, {useEffect} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postAction";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";

function Posts(props) {
    const { getPosts } = props;
    const { posts, loading } = props.post;

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    let postContent;
    if (posts === null || loading) {
        postContent = <Spinner />;
    } else {
        postContent = <PostFeed posts={posts} />;
    }

    return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm />
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);