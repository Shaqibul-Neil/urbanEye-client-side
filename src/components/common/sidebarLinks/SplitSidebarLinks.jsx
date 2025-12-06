const SplitSidebarLinks = ({ icon: Icon, label, to }) => {
  return (
    <Link to={to} className="flex w-full h-12 cursor-pointer group">
      {/* Left White Icon Area */}
      <div className="w-14 bg-white flex items-center justify-center border-r border-gray-200">
        <Icon className="size-6 text-gray-700 group-hover:text-primary" />
      </div>

      {/* Right Blue Label Area */}
      <div className="flex-1 bg-primary text-white flex items-center px-4 group-hover:bg-[#1d44a1] transition-all">
        {label}
      </div>
    </Link>
  );
};
export default SplitSidebarLinks;
