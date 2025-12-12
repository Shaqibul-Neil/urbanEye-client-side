import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto py-16 space-y-12">
        {/* Heading */}
        <h2 className="font-extrabold text-primary tracking-tight text-4xl md:text-5xl">
          Contact <span className="text-secondary">Us</span>
        </h2>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Form */}
          <div className="lg:w-7/12 bg-white md:p-8 p-4 sm:p-12 rounded-xl shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Have a question, want to report an issue, or need guidance on how
              to get assistance in your area? Fill out the form below and our
              URBANi team will respond promptly to help you take action or
              connect with local authorities.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
                />

                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-secondary focus:border-secondary focus:outline-none focus:ring-1"
              />
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:w-5/12 bg-base-200 p-8 sm:p-12 text-white rounded-xl shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4 text-secondary">
                We're here to help!
              </h3>

              <div className="flex items-center gap-4 bg-primary bg-opacity-20 p-4 rounded-3xl">
                <FiPhone className="text-3xl" />
                <div>
                  <p className="font-semibold text-lg">Hotline</p>
                  <p className="text-sm">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-primary bg-opacity-20 p-4 rounded-3xl">
                <BsWhatsapp className="text-3xl" />
                <div>
                  <p className="font-semibold text-lg">WhatsApp</p>
                  <p className="text-sm">+880 1987 654 321</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-primary bg-opacity-20 p-4 rounded-3xl">
                <FiMail className="text-3xl" />
                <div>
                  <p className="font-semibold text-lg">Email</p>
                  <p className="text-sm break-all">support@URBANi.com</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="font-semibold mb-4 text-center lg:text-left text-primary">
                Connect with us
              </p>
              <div className="border-t border-gray-300 mb-4"></div>
              <div className="flex space-x-6 justify-center lg:justify-start text-xl">
                <a
                  href="#"
                  className="flex items-center gap-2 text-primary hover:text-secondary transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-primary hover:text-secondary  transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-primary hover:text-secondary  transition"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
