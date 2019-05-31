import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileAction";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";

function Profile(props) {
    const { getProfileByHandle } = props;
    const { profile, loading } = props.profile;
    const handle = props.match.params.handle;

    useEffect(() => {
        if(handle){
            getProfileByHandle(handle);
        }
    },[getProfileByHandle, handle]);


    let profileContent;
    if (profile === null || loading) {
        profileContent = <Spinner />;
    } else {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">
                            Back To Profiles
                        </Link>
                    </div>
                    <div className="col-md-6" />
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds
                    education={profile.education}
                    experience={profile.experience}
                />
            </div>
        );
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">{profileContent}</div>
                </div>
            </div>
        </div>
    );
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);