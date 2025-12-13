import toast from "react-hot-toast";

import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/auth & role/useAuth";
import useCreateUser from "../../hooks/auth & role/useCreateUser";
import useRole from "../../hooks/auth & role/useRole";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { signInWithGoogle, setUserLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { refetchRole } = useRole();

  //mutation function
  const { mutateAsync: createSaveUser } = useCreateUser();

  const handleSignInWithGoogle = async () => {
    try {
      setUserLoading(true);

      // SweetAlert Loading Popup
      Swal.fire({
        title: "Verifying your google credentials...",
        text: "Please wait",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const result = await signInWithGoogle();
      // Prepare DB user object
      const userInfo = {
        email: result?.user?.email,
        displayName: result?.user?.displayName,
        photoURL: result?.user?.photoURL,
      };
      //save user in the database
      await createSaveUser(userInfo);

      const roleResult = await refetchRole();
      if (roleResult?.data === "admin" || roleResult?.data === "staff") {
        navigate("/dashboard");
      } else navigate(location?.state || "/");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged In usign google. Welcome on board",
        showConfirmButton: false,
        timer: 1500,
      });
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
