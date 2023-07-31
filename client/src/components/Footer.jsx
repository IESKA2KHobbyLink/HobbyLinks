import React from "react";

function Footer() {
  return (
    <div className="py-2 text-center bg-slate-600 border-t-2">
      <p className="text-sm mt-2 opacity-50 text-white">
        &copy; {new Date().getFullYear()} Hobbylinks All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
