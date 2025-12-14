const UserStat = () => {
  return (
    <div className="w-44 h-18 bg-blue-200 rounded-3xl absolute lg:top-10 lg:right-10 z-25 flex items-center justify-center md:-top-40 md:right-10 top-20 right-0 animate-elasticBounce">
      <div className="w-40 h-14 bg-white rounded-2xl flex items-center gap-2 px-2">
        <div className="avatar-group -space-x-6">
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
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-8">
              <span>+99</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-primary font-extrabold leading-2 mt-2 text-lg">
            150K
          </p>
          <p>users</p>
        </div>
      </div>
    </div>
  );
};

export default UserStat;
