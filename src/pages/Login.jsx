import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthNav from "../components/AuthNav";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";

function Login() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Wrong email format"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, "Password too short"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.user.user);

  const handleLoginUser = async (value) => {
    dispatch(loginUser(value));
    console.log(value);
  };

  useEffect(() => {
    if (userGlobal.id > 0) {
      navigate("/dashboard");
    }
  }, [userGlobal]);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(value) => {
          handleLoginUser(value);
        }}
      >
        {(props) => {
          return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
              <AuthNav />
              <div
                className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-1/4
          max-w-md
          
        "
              >
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Welcome
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Enter your credentials to access your account
                </div>

                <div className="mt-10">
                  <Form action="#" method="POST">
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor="email"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                      >
                        E-Mail Address:
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <AlternateEmailOutlinedIcon />
                        </div>
                        <Field
                          id="email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your email"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <label
                        htmlFor="password"
                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >
                        Password:
                      </label>
                      <div className="relative">
                        <div
                          className="
                    inline-block
                    items-center
                    justify-center
                    absolute
                    position
                    left-2
                    top-1
                    h-full
                    w-10
                    text-blue-500
                  "
                        >
                          <LockOutlinedIcon />
                        </div>
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          autoComplete="current-password"
                          className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                          placeholder="Enter your password"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          style={{ color: "red", fontSize: "12px" }}
                        />
                      </div>
                      <div className="mt-5 flex flex-row justify-end">
                        <a
                          href="/user/forget-password"
                          className="text-xs ml-2 text-blue-500 font-semibold hover:underline "
                        >
                          Forget Password?
                        </a>
                      </div>
                    </div>

                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                      >
                        <span className="mr-2 uppercase">Sign In</span>
                        <InputOutlinedIcon />
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
                <a
                  href="#"
                  target="_blank"
                  className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
                >
                  <span className="ml-2">
                    You don't have an account?
                    <a
                      href="/register"
                      className="text-xs ml-2 text-blue-500 font-semibold hover:underline"
                    >
                      Register now
                    </a>
                  </span>
                </a>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
