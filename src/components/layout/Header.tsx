import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu } from 'lucide-react'; // For back button and potential mobile menu

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  // Add other props like user info, notifications, etc. as needed
}

const Header: React.FC<HeaderProps> = ({
  title = "My Bank",
  showBackButton = false,
  onBackButtonClick,
}) => {
  console.log("Rendering Header. Title:", title, "Show Back Button:", showBackButton);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackButtonClick}
              aria-label="Go back"
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="text-xl font-bold text-slate-800">
            {/* Placeholder for Logo or App Name */}
            {title}
          </Link>
        </div>

        {/* Placeholder for navigation items, user profile, etc. */}
        <div className="flex items-center space-x-2">
          {/* Example: User Profile Button - to be implemented */}
          {/* <Button variant="ghost" size="icon" aria-label="User Profile">
            <User className="h-5 w-5" />
          </Button> */}
          {/* Mobile Menu Button - to be implemented for smaller screens */}
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;