import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/auth & role/useAuth";
import GoogleLogin from "../../components/socialLogin/GoogleLogin";
import imageUpload from "../../utilities/imageUpload";
import useCreateUser from "../../hooks/auth & role/useCreateUser";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  //dependencies
  const [previewImage, setPreviewImage] = useState(null); //image preview
  const fileInputRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { signUpUser, updateUser, signOutUser, setUserLoading, setUser } =
    useAuth();
  const navigate = useNavigate();

  //mutation function
  const { mutateAsync: createSaveUser } = useCreateUser();
  //user registration
  const handleRegistration = async (data) => {
    if (!data.photo[0]) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Please provide a photo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //store the image and get the link
    const uploadedPhoto = data.photo[0];
    const photoURL = await imageUpload(uploadedPhoto);

    try {
      setUserLoading(true);
      // SweetAlert Loading Popup
      Swal.fire({
        title: "Creating your account...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created. Please Login",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Firebase email already in use
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Email already used",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      // Backend or other error
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.message || "Registration failed"}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setUserLoading(false);
    }
  };
  // handle click on custom box
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // handle file select
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreviewImage(URL.createObjectURL(file)); // set preview
  //     setValue("photo", [file]); // set in react-hook-form
  //   }
  // };
  return (
    <>
      <div className="flex items-center justify-center max-w-md mx-auto lg:p-10 p-3 mt-12 lg:mt-0">
        {/* floating glow */}
        <div className="absolute top-20 left-40 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full animate-pulse md:block hidden" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-emerald-400/20 blur-3xl rounded-full animate-pulse md:block hidden" />

        <div className="w-full">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-secondary leading-tight">
                Create An Account
              </h2>
              <p className="text-primary">Register with URBANi</p>
            </div>

            <form
              className="space-y-6 relative"
              onSubmit={handleSubmit(handleRegistration)}
            >
              {/* Custom Photo Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div
                    role="button"
                    tabIndex={0}
                    className="w-24 h-24  overflow-hidden bg-gray-100 cursor-pointer border border-gray-300 transition-all flex items-center justify-center rounded-xl"
                    onClick={handleClick}
                    onKeyDown={(e) =>
                      e.key === "Enter" && fileInputRef.current?.click()
                    }
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span className="text-xs mt-1">Click to upload</span>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleClick}
                    type="button"
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary flex items-center justify-center cursor-pointer hover:bg-secondary transition-colors focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
                    aria-label="Upload photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-camera w-4 h-4 text-white"
                      aria-hidden="true"
                    >
                      <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                      <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef} //ref attach
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewImage(URL.createObjectURL(file)); // preview set
                        setValue("photo", [file], { shouldValidate: true }); // react-hook-form value set
                      }
                    }}
                  />
                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.photo.message}
                    </p>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Click avatar or camera icon to upload
                </p>
                <p className="text-gray-400 text-xs">
                  Max 5MB (JPG, PNG, GIF, WebP)
                </p>
              </div>
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
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
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
    </>
  );
};

export default SignUp;
