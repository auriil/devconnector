import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

function Dashboard(props) {
    const { getCurrentProfile, deleteAccount } = props;
    const { user } = props.auth;
    const { profile, loading } = props.profile;

    useEffect(() => {
        getCurrentProfile();
    },[getCurrentProfile]);

    function onDeleteClick(){
        deleteAccount();
    }

    let dashboardContent;
    if(profile === null || loading){
        dashboardContent = <Spinner />;
    } else {
        if(Object.keys(profile).length > 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">
                        Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                    </p>
                    <ProfileActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div style={{marginButton: "60px"}}>
                        <button className="btn btn-danger" onClick={onDeleteClick}>
                            Delete My Account
                        </button>
                    </div>
                </div>
            );
        } else {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            );
        }
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);