import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import app from "../firebase/firebase.config";

const Registration = () => {
  // const[error,setError]=useState('')
  const auth = getAuth(app);

  const { createUser, googleLogin } = useContext(AuthContext);
  // const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
  //   const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/dashboard";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data?.email, data?.password)
      .then((result) => {
        console.log(result.user);
        // update profile
        updateProfile(auth.currentUser, {
          displayName: data?.name,
          photoURL: data?.photo,
        })
          .then(() => {
            toast.success("Registration successful");

            navigate(from, { replace: true });
            reset();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
        // error
      });
  };
  const handleGoogleLog = () => {
    googleLogin()
      .then((result) => {
        // console.log(result);
        toast.success("user login successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="py-6 lg:flex justify-center items-center gap-10 bg-fixed bg-[#65B741] bg-cover bg-no-repeat bg-center opacity-90">
      <div
        style={{ backgroundImage: "url(https://i.ibb.co/pdPdF0X/regi.jpg)" }}
        className="py-5 px-20 bg-cover border-8 border-white   shadow-black shadow-md"
      >
        <h2 className="text-4xl font-semibold text-center text-black ">
          Registration Today
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control  w-full">
            <label className="label">
              <span className="label-text text-black">Name</span>
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              placeholder="Type here..."
              className="input input-bordered   lg:w-full"
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-black">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              {...register("photo", { required: true })}
              placeholder="Type here..."
              className="input input-bordered   lg:w-full"
            />
            {errors.photo && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control  w-full">
            <label className="label">
              <span className="label-text text-black">Email</span>
            </label>
            <input
              type="text"
              name="email"
              {...register("email", { required: true })}
              placeholder="xyx@gmail.com"
              className="input input-bordered   lg:w-full"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className=" form-control w-full">
            <label className="label">
              <span className="label-text text-black">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 8,
                  pattern: /[A-Z][!#$@^%&*]/,
                })}
                // type="text"
                type={showPass ? "text" : "password"}
                placeholder="...... "
                className=" input input-bordered w-full lg:w-full"
              />
              <div>
                {" "}
                {errors?.password?.type === "required" && (
                  <span className="text-red-600">This field is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">Password must be 6 digit</span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password must less than 8 digit
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600 w-[200px] h-20">
                    Password must be one special character and one capital
                    letter{" "}
                  </span>
                )}
              </div>

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute top-3 right-5"
              >
                {showPass ? <NavLink>Hide</NavLink> : <NavLink>Show</NavLink>}
              </div>
            </div>
          </div>

          {/* {error && (
              <p className="w-full text-lg text-red-700 text-center">{error}</p>
            )} */}

          {/* <input type="btn " className="btn btn-accent mt-2  w-full " /> */}
          <button className="btn btn-accent mt-2  w-full ">Submit</button>
          <Toaster></Toaster>
        </form>

        <div className="flex justify-center mt-1 mb-1">
          {" "}
          <button
            onClick={handleGoogleLog}
            className="btn btn-outline flex justify-center items-center gap-2 text-black"
          >
            {" "}
            <span>
              <FaGoogle></FaGoogle>
            </span>{" "}
            Registration with google
          </button>
        </div>
        <p className="text-center mt-1 mb-2 text-black">
          Already have an account? Please{" "}
          <Link className="text-blue-600 font-medium " to={"/login"}>
            Login
          </Link>
        </p>
      </div>
      <div>
        {/* <img
            className="hidden lg:block w-[650px] h-[450px]"
            src={log}
            alt=""
          /> */}
      </div>
    </div>
  );
};

export default Registration;
