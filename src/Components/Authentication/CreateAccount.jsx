import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import UseAuth from "../AllComponents/Hooks/UseAuth";
import { BiHide, BiShow } from "react-icons/bi";

const CreateAccount = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [isEmail, setIsEmail] = useState("you@gmail.com");
  const [haveUser, setHaveUser] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user, createUser } = UseAuth();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (dataForm) => {
    const email = dataForm?.email;
    setIsEmail(email);
    const password = dataForm?.password;
    const name = dataForm?.userName;
    const phonenumber = dataForm?.mobileNumber;


    try {
      if (haveUser?.email !== email || !haveUser || haveUser == null) {
        setCreateLoading(true);

        createUser(email, password)
          .then(async (result) => {
            const user = result?.user;
            const data = {
              profileName: name,
              email,
              phonenumber,
              userUid: user.uid,
            };

            const res = await axios.post(
              "https://myproject-tau-brown.vercel.app/api/user",
              data
            );
            // localStorage.setItem('token', res?.data?.token); // need for JWT authentication
            if (res.status === 200) {
              setCreateLoading(false);
              toast.success("success sign up !!");
              navigate("/", { replace: true });
              reset();
            }
          })
          .catch((err) => {
            setCreateLoading(false);
            toast.error("Failed: ", err.message);
          });
      } else {
        setCreateLoading(false);
        toast.error("Already use this email!");
      }
    } catch (error) {
      toast.error("Faild: ", error);
    }
  };

  useEffect(() => {
    async function loadUser() {
      const res = await axios.get(`https://myproject-tau-brown.vercel.app/api/user/${isEmail}`);
      setHaveUser(res?.data);
    }
    loadUser();
  }, [isEmail]);

  if (!user) {
    return (
      <div>
        <Toaster />
        <div className="flex flex-col max-w-md p-4 rounded-md sm:p-10 bg-cardBg mx-auto my-28 text-gray-800 border-2 shadow-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="space-y-6 mb-0">
              <div>
                <label htmlFor="text" className=" mb-2 text-sm">
                  User Name
                </label>
                <input
                  type="text"
                  {...register("userName", { required: true })}
                  placeholder="type your user name"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100  "
                />
              </div>
              <div>
                <label htmlFor="email" className=" mb-2 text-sm">
                  Email address *
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="you@gmail.com"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100  "
                />
              </div>
              <div>
                <label htmlFor="number" className=" mb-2 text-sm">
                  Mobile Number *
                </label>
                <input
                  type="number"
                  {...register("mobileNumber", { required: true })}
                  placeholder="type your user name"
                  className="w-full px-3 py-2 border rounded-md bg-gray-100  "
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <BiShow size={22} /> : <BiHide size={22} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={createLoading && true}
              className={`w-full px-8 py-3 font-semibold cursor-pointer rounded-md bg-yellow-500 hover:bg-yellow-600  text-black`}
            >
              {createLoading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="px-6 mt-4 text-sm text-center text-gray-600">
            I have an account !
            <Link
              to="/login"
              className="hover:underline cursor-pointer text-violet-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    );
  } else return navigate("/", { replace: true });
};

export default CreateAccount;
