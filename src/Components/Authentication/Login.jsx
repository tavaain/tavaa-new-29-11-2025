/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./ForgotPassword";
import { useState } from "react";
import UseAuth from "../AllComponents/Hooks/UseAuth";

const Login = () => {
  const { user, signInUser } = UseAuth();
  const [createLoading, setCreateLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (dataForm) => {
    const email = dataForm.email;
    const password = dataForm.password;

    try {
      signInUser(email, password)
        .then((result) => {
          const user = result?.user;

          console.log("this is a final uesr login my shop", user);
          toast.success("Login successful!");
          navigate(from, { replace: true });
          setCreateLoading(true);
          reset();
        })
        .catch((error) => {
          toast.error("Failed to login: Wrong email/password", error);
          setCreateLoading(false);
        });
    } catch (error) {
      toast.error("Failed to login: ", error.message);
    }
  };

  if (!user) {
    return (
      <>
        <Toaster />
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-cardBg mx-auto text-gray-800 my-28 border-2 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm text-gray-600">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className=" mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100  "
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <p
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="text-xs hover:underline text-gray-600"
                  >
                    Forgot password?
                  </p>
                </div>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md  bg-gray-50 text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={createLoading && true}
              className={`w-full px-8 py-3 font-semibold cursor-pointer rounded-md bg-yellow-500 hover:bg-yellow-600  text-black`}
            >
              {createLoading ? "Creating..." : "Sign in"}
            </button>
          </form>
          <ForgotPassword />
          <p className="px-6 mt-4 text-sm text-center text-gray-600">
            {"Don't have an account yet?"}
            <Link
              to="/createAccount"
              className="hover:underline text-violet-600"
            >
              Create Account
            </Link>
            .
          </p>
        </div>
      </>
    );
  } else return navigate("/", { replace: true });
};

export default Login;
