import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
    const { register, handleSubmit, reset } = useForm()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const postData = { email, password };
        setIsLoading(true);

    try {
      const res = await axios?.post("https://myproject-tau-brown.vercel.app/api/admin/login", postData);
      localStorage.setItem("token", res?.data?.token);
      if (res?.status === 200) {
        toast.success("Login successfully");
          setIsLoading(false);
          reset();
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Login Failed");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occurred");
      setIsLoading(false);
    }
  };

    // const onSubmit = async (data) => {
    //     const email = data.email;
    //     const password = data.password;
    //     const postData = { email, password };
    //     setIsLoading(true);
    //     try {
    //         const res = await axios.post('https://myproject-tau-brown.vercel.app/api/admin/login', postData);
    //         localStorage.setItem('token', res?.data?.token);
    //         if (res?.status === 200) {
    //             toast.success("Login successfully");
    //             setIsLoading(false);
    //             reset();
    //             navigate("/dashboard", { replace: true });
    //         } else {
    //             toast.error("Login Failed")
    //             setIsLoading(false);
    //         }
    //     } catch (error) {
    //         toast.error('Error:', error);
    //         setIsLoading(false);
    //     }
    // }



    useEffect(() => {
        document.title = "Admin Login!";
    }, []);

    return (
        <>
            <Toaster />
            <div className="card shrink-0 w-full max-w-sm mx-auto shadow-2xl mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body font-[cursive]">
                    <h1 className="text-xl font-semibold text-center">Admin Login</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium ">Email: *</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" name="email" placeholder="Email here..." className="input input-bordered text-lg bg-amber-50 text-black" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium ">Password: *</span>
                        </label>
                        <input {...register("password", { required: true })} type="password" name="password" placeholder="password here..." className="input bg-amber-50 text-black input-bordered text-lg" required />
                    </div>

                    <div className="mt-6 mx-auto">
                        <button type="submit" disabled={isLoading && true} className="btn text-xl bg-mainColor text-darkColor hover:bg-darkColor hover:text-white">{isLoading ? "Login..." : "Login"}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminLogin;