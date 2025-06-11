import React from 'react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>&copy; {currentYear} My Bank Plc. All rights reserved.</p>
        {/* Add other footer links or information as needed */}
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-slate-800">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800">Terms of Service</a>
          <a href="#" className="hover:text-slate-800">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;