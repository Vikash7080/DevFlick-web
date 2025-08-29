import React from "react";
import { FaTwitter, FaFacebookF, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-gray-400 px-4 md:px-8 py-8 md:py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white">DevFlick 🚀</h2>
          <p className="text-xs mt-2 leading-snug">
            Connect, collaborate & grow your developer network globally.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">
            Product
          </h3>
          <ul className="space-y-1">
            {["Features", "Integrations", "Pricing", "Docs"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white transition rounded px-1 py-0.5 block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">
            Company
          </h3>
          <ul className="space-y-1">
            {["About Us", "Careers", "Blog", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white transition rounded px-1 py-0.5 block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">
            Legal
          </h3>
          <ul className="space-y-1">
            {["Privacy Policy", "Terms of Service", "Cookies", "Licenses"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition rounded px-1 py-0.5 block"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-neutral-700 border-opacity-30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
        <p>© {new Date().getFullYear()} DevFlick. All rights reserved.</p>
        <div className="flex gap-4">
          {[FaTwitter, FaFacebookF, FaGithub, FaYoutube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="social"
              className="hover:text-white transition rounded-full p-2 bg-neutral-900 hover:bg-neutral-800"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
