import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ user }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight group-hover:from-blue-600 group-hover:to-violet-600 transition-all duration-300">
              INSTANGRAM FEED
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={isActive("/")}>
              Feed
            </NavLink>
            
            {user ? (
              <div className="flex items-center gap-6">
                <NavLink to="/Profile" active={isActive("/Profile")}>
                  Profile
                </NavLink>
                <Link to="/Profile" className="relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                   <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                    alt="Profile" 
                    className="relative w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                   />
                </Link>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-900/20 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl p-4 flex flex-col space-y-4">
          <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Feed</MobileNavLink>
          {user ? (
            <MobileNavLink to="/Profile" onClick={() => setIsMenuOpen(false)}>Profile</MobileNavLink>
          ) : (
            <MobileNavLink to="/auth" onClick={() => setIsMenuOpen(false)}>Login</MobileNavLink>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
        active 
          ? "text-blue-600" 
          : "text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block w-full p-3 text-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold transition"
    >
      {children}
    </Link>
  );
}
