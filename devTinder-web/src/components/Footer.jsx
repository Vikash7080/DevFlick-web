import React from "react";
import { FaTwitter, FaFacebookF, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-gray-400 px-6 md:px-10 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white">DevFlick 🚀</h2>
          <p className="text-sm mt-4 leading-relaxed">
            Build, connect, and grow your developer network. DevFlick helps you
            find like-minded coders & collaborate globally.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            Product
          </h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">Integrations</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">Docs</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            Legal
          </h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Cookies</a></li>
            <li><a href="#" className="hover:text-white transition">Licenses</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} DevFlick. All rights reserved.</p>
        <div className="flex gap-5 text-lg">
          <a href="#" aria-label="Twitter" className="hover:text-white transition">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-white transition">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-white transition">
            <FaGithub />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white transition">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
