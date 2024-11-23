import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MessageSquare, User } from 'lucide-react';
import keycloak from '../../keycloak'; // Import Keycloak instance

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navigationLinks = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Chat', path: '/chat', icon: MessageSquare }
  ];

  const handleSignout = () => {
    keycloak.logout();
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              NextMeal
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    isActivePath(link.path) ? 'text-red-600 font-medium' : ''
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              ))}
              <button
                onClick={handleSignout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-gray-600 hover:text-gray-900 transition-colors ${
                      isActivePath(link.path) ? 'text-red-600 font-medium' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-1">
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </div>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleSignout();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-600 font-medium hover:text-red-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About NextMeal</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">For Restaurants</h3>
              <ul className="space-y-2">
                <li><Link to="/partner" className="text-gray-600 hover:text-gray-900">Partner with us</Link></li>
                <li><Link to="/restaurant/dashboard" className="text-gray-600 hover:text-gray-900">Restaurant Dashboard</Link></li>
                <li><Link to="/restaurant/resources" className="text-gray-600 hover:text-gray-900">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} NextMeal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;