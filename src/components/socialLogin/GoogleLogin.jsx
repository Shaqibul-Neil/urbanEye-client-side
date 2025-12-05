import toast from "react-hot-toast";

import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/auth & role/useAuth";
import useCreateUser from "../../hooks/auth & role/useCreateUser";

const GoogleLogin = () => {
  const { signInWithGoogle, setUserLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //mutation function
  const { mutateAsync: createSaveUser } = useCreateUser();

  const handleSignInWithGoogle = async () => {
    try {
      setUserLoading(true);
      const result = await signInWithGoogle();
      // Prepare DB user object
      const userInfo = {
        email: result?.user?.email,
        displayName: result?.user?.displayName,
        photoURL: result?.user?.photoURL,
      };
      //save user in the database
      await createSaveUser(userInfo);

      toast.success("Successfully logged with Google");
      navigate(location?.state || "/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUserLoading(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleSignInWithGoogle}
      className="flex items-center justify-center gap-3 bg-white text-secondary px-5 py-2 rounded-xl w-full font-semibold hover:bg-gray-200 transition-all cursor-pointer text-sm border"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
