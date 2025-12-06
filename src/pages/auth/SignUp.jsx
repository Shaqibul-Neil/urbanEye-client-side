import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/auth & role/useAuth";
import GoogleLogin from "../../components/socialLogin/GoogleLogin";
import toast from "react-hot-toast";
import imageUpload from "../../utilities/imageUpload";
import useCreateUser from "../../hooks/auth & role/useCreateUser";

const SignUp = () => {
  //dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUpUser, updateUser, signOutUser, setUserLoading, setUser } =
    useAuth();
  const navigate = useNavigate();

  //mutation function
  const { mutateAsync: createSaveUser } = useCreateUser();
  //user registration
  const handleRegistration = async (data) => {
    //store the image and get the link
    const uploadedPhoto = data.photo[0];
    const photoURL = await imageUpload(uploadedPhoto);

    try {
      setUserLoading(true);
      //firebase signup
      const result = await signUpUser(data?.email, data?.password);

      // Prepare DB user object
      const userInfo = {
        email: data?.email,
        displayName: data?.name,
        photoURL: photoURL,
      };

      // save user in the database
      await createSaveUser(userInfo);

      // Update Firebase profile
      const userProfile = {
        displayName: data?.name,
        photoURL: photoURL,
      };
      await updateUser(userProfile);

      //logout to refresh profile info
      await signOutUser();
      setUser(null);
      navigate("/signin");
      toast.success("Account Created. Please Login");
    } catch (error) {
      // Firebase email already in use
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already used");
        return;
      }
      // Backend or other error
      toast.error(error.message || "Registration failed");
    } finally {
      setUserLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center max-w-md mx-auto lg:p-10 p-3 mt-12 lg:mt-0">
      <div className="w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-secondary leading-tight">
              Create An Account
            </h2>
            <p className="text-primary">Register with UrbanEye</p>
          </div>

          <form
            className="space-y-6 relative"
            onSubmit={handleSubmit(handleRegistration)}
          >
            {/* Name */}
            <div className="relative">
              <label className="block text-secondary mb-1">Name *</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Your full name"
                className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Photo image field */}
            <div className="relative">
              <label className="block text-secondary mb-1">Photo *</label>
              <input
                type="file"
                {...register("photo", {
                  required: "Photo is required",
                })}
                className="file-input w-full rounded-xl bg-gray-100"
                placeholder="Your Photo"
              />{" "}
              {errors.photo && (
                <p className="text-red-500">{errors.photo.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-secondary mb-1">Email *</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please give a valid email",
                  },
                })}
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
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
                    message:
                      "Password must be 6 chars including uppercase, lowercase, number & symbol",
                  },
                })}
                className="w-full py-2 px-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Register button */}
            <button
              className="w-full py-2 bg-primary text-white cursor-pointer rounded-xl font-bold"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        {/* Divider */}
        <div className="flex items-center justify-center gap-2 my-3">
          <div className="h-px w-16 bg-gray-400"></div>
          <span className="text-sm text-secondary">or</span>
          <div className="h-px w-16 bg-gray-400"></div>
        </div>

        {/* Google signup */}
        <GoogleLogin />
        {/* Already have account link */}
        <p className="text-center text-sm text-gray-700 mt-3">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="underline text-md text-primary font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
