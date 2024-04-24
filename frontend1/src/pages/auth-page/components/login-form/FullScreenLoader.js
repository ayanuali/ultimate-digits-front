import React from "react";
import "./FullScreenLoader.css"; // Importing CSS for styling

const FullScreenLoader = ({ loading, content }) => {
  if (!loading) return null; // Do not render anything if not loading

  if(loading){
    console.log(content)
  }

  return (
    <div className="overlayy" >
      <div className="loader" style={{color:"black"}}>{content}</div>
    </div>
  );
};

export default FullScreenLoader;
