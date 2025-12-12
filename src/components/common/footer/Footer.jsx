import React from "react";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <div className="relative z-10 bg-primary text-white px-5 overflow-hidden py-8">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 pointer-events-none"></div>
      <div className="footer sm:footer-horizontal text-base-content p-10">
        <div className="grid grid-cols-4 gap-20">
          <aside className="col-span-2 relative">
            <div className="translate-y-20 translate-x-8">
              <p className="text-3xl text-blue-900 font-black">
                Your Voice. Your City. Our Effort
              </p>
              <p className="text-sm opacity-70 text-white">
                Join citizens nationwide to report, track, and improve local
                issues with
              </p>
            </div>

            <img src={logo} alt="" className="w-full object-cover" />
          </aside>
          <div className="col-span-2">
            <div className="grid grid-cols-3 gap-10">
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
            <div className="mt-10 border-t border-white/20 pt-6 text-sm flex flex-col md:flex-row justify-between items-center text-white/70">
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
