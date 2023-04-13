import { useState } from "react";

import "../App.css";
import axios from "axios";

const SignUpPage = () => {
  const [details, setDetails] = useState({
    username: null,
    email: null,
    password: null,
    confirm_password: null,
  });

  const onChangeHanadle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setDetails({ ...details, [name]: value }, () => {
      if (details.confirm_password != details.password) {
        setValidation({ errMsg: "Password does not match!!!" });
      }
    });

    if (details.confirm_password != details.password) {
      setValidation({ errMsg: "Password does not match!!!" });
    }
    // console.log("detail===========", details);
    // setValidation({ errMsg: "" });
  };

  // const validateField =  () => {
  //   if (details.confirm_password != details.password) {
  //      setValidation({ errMsg: "Password does not match!!!" });
  //   }
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // if (details.confirm_password != details.password) {
    //   setValidation({ errMsg: "Password does not match!!!" });
    // }

    // validateField();
    console.log("Details============", details);
    if (validation.errMsg == "") {
      axios
        .post(
          "http://localhost:8080/auth/register",
          { details },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setDetails({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    }
  };

  return (
    <>
      <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid"
                alt="image"
              />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form class="" onSubmit={onSubmitHandler}>
                <div class=" d-flex align-items-center justify-content-center my-4">
                  <p class="text-center fw-bold  fs-3 mb-0">Sign Up</p>
                </div>

                {validation.errMsg ? (
                  <div class="alert alert-danger" role="alert">
                    {validation.errMsg}
                  </div>
                ) : null}

                <div class="form-outline mb-3">
                  <input
                    type="text"
                    // id="name"
                    name="username"
                    class="form-control form-control"
                    placeholder="Username"
                    onChange={onChangeHanadle}
                    value={details.username}
                    required
                  />
                </div>

                {/* <!-- Email input --> */}
                <div class="form-outline mb-3">
                  <input
                    type="email"
                    // id="form3Example3"
                    name="email"
                    class="form-control form-control"
                    placeholder="Email address"
                    onChange={onChangeHanadle}
                    value={details.email}
                    required
                  />
                </div>

                {/* <!-- Password input --> */}
                <div class="form-outline mb-3">
                  <input
                    type="password"
                    // id="form3Example4"
                    name="password"
                    class="form-control form-control"
                    placeholder="Password"
                    value={details.password}
                    onChange={onChangeHanadle}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    // id="form3Example4"
                    name="confirm_password"
                    class="form-control form-control"
                    placeholder="Confirm password"
                    value={details.confirm_password}
                    onChange={onChangeHanadle}
                    required
                  />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    class="btn btn-primary btn"
                    // style="padding-left: 2.5rem; padding-right: 2.5rem;"
                    // onClick={onSubmitHandler}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
