import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {

    return (
        <footer className="bg-blue-600 text-white mt-auto">
            <div className="max-w-7xl mt-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About */}
                <div>
                    <h3 className="text-xl font-bold mb-3">MyApp</h3>
                    <p className="text-sm text-gray-200">
                        A modern app built with ❤️ using React and Tailwind CSS.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `transition-all duration-200 ${isActive ? "text-white font-semibold border-b-2 border-white" : "text-gray-200 hover:text-white"}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `transition-all duration-200 ${isActive ? "text-white font-semibold border-b-2 border-white" : "text-gray-200 hover:text-white"}`
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `transition-all duration-200 ${isActive ? "text-white font-semibold border-b-2 border-white" : "text-gray-200 hover:text-white"}`
                                }
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Social Icons */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link to="https://www.facebook.com/" className="hover:text-blue-300">
                            <Facebook />
                        </Link>
                        <Link to="https://twitter.com/" className="hover:text-blue-300">
                            <Twitter />
                        </Link>
                        <Link to="https://www.instagram.com/" className="hover:text-blue-300">
                            <Instagram />
                        </Link>
                        <Link to="https://www.linkedin.com/" className="hover:text-blue-300">
                            <Linkedin />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-blue-800 py-4 text-center text-sm text-gray-200">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>

    );
};

export default Footer;
