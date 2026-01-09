import { Star } from "lucide-react";

const UserStat = () => {
  return (
    <div className="rounded-4xl flex items-center justify-center">
      <div className="h-14 bg-white rounded-2xl flex items-center gap-2 px-2">
        <div className="avatar-group -space-x-5">
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-8">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-8">
              <span>+99</span>
            </div>
          </div>
        </div>
        <div>
          <p className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star className="text-blue-800 w-4 h-4" key={i} />
            ))}
          </p>
          <p className="text-secondary font-bold leading-2 mt-2">
            150K+ worldwide users
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStat;
