import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/auth & role/useAuth";
import GoogleLogin from "../../components/socialLogin/GoogleLogin";
//import { useQueryClient } from "@tanstack/react-query";
import useRole from "../../hooks/auth & role/useRole";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signInUser, setUser, setUserLoading, refreshUserToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  //const queryClient = useQueryClient();
  const { refetchRole } = useRole();

  const handleSignIn = async (data) => {
    try {
      setUserLoading(true);
      const result = await signInUser(data.email, data.password);
      console.log(result.user);
      //force refresh to get new token so that user role changes
      await refreshUserToken();
      setUser(result?.user);
      //refetch role query
      //queryClient.refetchQueries(["user-role", result?.user?.email]);
      await refetchRole();

      navigate(location?.state || "/");
      toast.success("Successfully Logged In");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found"
      ) {
        toast.error("Access denied! Wrong credentials");
        return;
      }
      toast.error(err.message);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center lg:p-10 p-3 mt-12 lg:mt-0 max-w-md mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-secondary leading-tight">
            Welcome Back
          </h2>
          <p className="text-primary">Login with UrbanEye</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          {/* Email */}
          <div className="relative">
            <label className="block text-secondary mb-1">Email *</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="example@email.com"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-secondary mb-1">Password *</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Link to={"/forget-password"} className="text-primary underline">
              Forget Password?
            </Link>
          </div>

          {/* Login button */}
          <div className="flex justify-center">
            <button
              className="w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 my-3">
          <div className="h-px w-16 bg-gray-400"></div>
          <span className="text-sm text-secondary">or</span>
          <div className="h-px w-16 bg-gray-400"></div>
        </div>

        {/* Google login */}
        <GoogleLogin />

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-700 mt-3 ">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline text-md text-primary font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
