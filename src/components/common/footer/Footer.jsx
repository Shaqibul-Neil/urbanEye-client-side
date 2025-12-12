import React from "react";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <div className="relative z-10 bg-primary text-white px-5 overflow-hidden py-8">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 pointer-events-none"></div>
      <div className="footer sm:footer-horizontal text-base-content lg:p-10 md:p-8 p-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-20 gap-10 md:gap-16">
          <aside className="lg:col-span-2 col-span-1 relative">
            <div className="lg:translate-y-20 lg:translate-x-8 md:translate-y-9 md:translate-x-4 translate-y-6">
              <p className="text-3xl text-blue-900 font-black">
                Your Voice. Your City. Our Effort
              </p>
              <p className="text-sm opacity-70 text-white">
                Join citizens nationwide to report, track, and improve local
                issues with
              </p>
            </div>

            <img
              src={logo}
              alt=""
              className="w-full object-cover -ml-4 md:ml-0"
            />
          </aside>
          <div className="lg:col-span-2 col-span-1">
            <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-10 gap-6">
              <nav className="text-white flex flex-col">
                <h6 className="footer-title">What You Can Do</h6>
                <a className="link link-hover">Post Issue</a>
                <a className="link link-hover">Track Issue</a>
                <a className="link link-hover">Upvote</a>
                <a className="link link-hover">Comment</a>
              </nav>
              <nav className="text-white flex flex-col">
                <h6 className="footer-title">About URBANi</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
              </nav>
              <nav className="text-white flex flex-col">
                <h6 className="footer-title">Transparency</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
              </nav>
            </div>
            <div className="mt-10 border-t border-white/20 pt-6 text-sm flex flex-col lg:flex-row justify-between lg:items-center text-white/70">
              <span>Active Citizens: 12,342</span>
              <span>Issues Reported: 7,891</span>
              <span>Upvotes Cast: 34,215</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer sm:footer-horizontal footer-center text-white/40 p-4">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Shaqibul Neil
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
