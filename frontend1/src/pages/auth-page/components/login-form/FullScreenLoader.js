import React from "react";
import "./FullScreenLoader.css"; // Importing CSS for styling
import ReactLoading from "react-loading";

const FullScreenLoader = ({ loading, content }) => {
  if (!loading) return null; // Do not render anything if not loading

  return (
    <div className="overlay">
      <div>
        <ReactLoading type={"spin"} color={"blue"} height={200} width={250} />
      </div>
      <div className="textt">{content}</div>
    </div>
  );
};

export default FullScreenLoader;
