import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="relative z-10 bg-primary text-white px-5 overflow-hidden py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 pointer-events-none"></div>
      <div className="footer sm:footer-horizontal text-base-content lg:p-10 md:p-8 p-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-20 gap-10 md:gap-16">
          <aside className="lg:col-span-2 col-span-1 relative">
            <div className="lg:translate-y-20 lg:translate-x-8 md:translate-y-9 md:translate-x-4 translate-y-6">
              <p className="text-3xl text-blue-900 font-black">
                Your Voice. Your City. Our Effort
              </p>
              <p className="text-sm text-white">
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
          <div className="lg:col-span-2 col-span-1 relative z-20">
            <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-10 gap-6">
              <nav className="text-white flex flex-col">
                <h6 className="footer-title">What You Can Do</h6>
                <p>Post Issue</p>
                <p>Track Issue</p>
                <p>Upvote</p>
                <p>Comment</p>
              </nav>
              <nav className="text-white flex flex-col">
                <h6 className="footer-title">About URBANi</h6>
                <Link to={"/about"} className="link link-hover">
                  About us
                </Link>
                <Link to={"/contact"} className="link link-hover">
                  Contact
                </Link>
                <Link to={"/all-issues"} className="link link-hover">
                  All Issues
                </Link>
                <Link to={"/terms"} className="link link-hover">
                  Terms & Conditions
                </Link>
              </nav>
              <nav className="text-white flex flex-col">
                <h6 className="footer-title">Transparency</h6>
                <Link to={"/privacy-policy"} className="link link-hover">
                  Privacy Policy
                </Link>
                <Link to={"/cookie-policy"} className="link link-hover">
                  Cookie Policy
                </Link>
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
