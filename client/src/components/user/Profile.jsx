import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../api_request";
import {
  getUserData,
  changeUserData,
  updateLocalStorageData,
} from "../../api_request/api_user";
import Loader from "../Loader";
const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    error: false,
    success: false,
  });
  const [loading, setLoading] = useState(false);

  const { token } = isAuthenticated();

  const { name, email, password, error, success } = values;

  const loadUserInfo = (userId) => {
    setLoading(true);
    // console.log(userId);
    getUserData(userId, token).then((data) => {
      // console.log(data)
      if (data.error) {
        setValues({ ...values, error: true });
        setLoading(false);
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadUserInfo(match.params.userId);
  }, []);
  const showLoading = () => loading && <Loader />;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
    // console.log(values);
  };

  const submitFrom = (e) => {
    e.preventDefault();
    setLoading(true);
    changeUserData(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
          setLoading(false);
        } else {
          updateLocalStorageData(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
          setLoading(false);
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/" />;
    }
  };
  const updateProfileFrom = (name, email, password) => (
    <form className="container formBox-1">
      <label
        className="mb-4"
        style={{
          fontSize: "large",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        Profile Data
      </label>
      <hr />
      <div className="form-group">
        <label className="text-muted" htmlFor="username">
          Name
        </label>
        <input
          type="text"
          id="username"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted" htmlFor="useremail">
          Email
        </label>
        <input
          type="email"
          id="useremail"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <button className="Button" onClick={submitFrom}>
        Update
      </button>
    </form>
  );

  return (
    <div>
      {showLoading()}
      <div>
        {updateProfileFrom(name, email, password)}
        {redirectUser(success)}
      </div>
    </div>
  );
};

export default Profile;
