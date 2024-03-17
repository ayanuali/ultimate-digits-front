import React from "react";
import "./FullScreenLoader.css"; // Importing CSS for styling

const FullScreenLoader = ({ loading, content }) => {
  if (!loading) return null; // Do not render anything if not loading

  return (
    <div className="overlay">
      <div className="loader">{content}</div>
    </div>
  );
};

export default FullScreenLoader;
