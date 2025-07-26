import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A simple footer that provides additional navigation and copyright
 * information.  It stays at the bottom of the page and complements the
 * minimalistic design aesthetic of the site.  You can extend this
 * component with social icons or legal links as needed.
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} FinanceAI. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-4 text-gray-600 text-sm">
            <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
            <li>
              {/* Use Link for chat to enable client‑side navigation */}
              <Link to="/chat" className="hover:text-indigo-600">Chat</Link>
            </li>
            <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;