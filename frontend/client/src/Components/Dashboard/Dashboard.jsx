import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import './Dashboard.css';


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <h1>
                  H! <b>{user.name.split(' ')[0]} </b>
                </h1>
                <h3>
                  You are Successfully logged into We Care Application
                </h3><br></br>
                <h2 >Temperature :   </h2><h4>29 %
                </h4>
                <br></br> <br></br>
                <h2>
                  Heart Beat Rate : </h2>
                    <h4> 160 beats per minute 
                </h4>
                
                  <button
                    onClick={this.onLogoutClick}
                    className="btn btn-lg btn-warning mt-5"
                  >
                    Logout
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);