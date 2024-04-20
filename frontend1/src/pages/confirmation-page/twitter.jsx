import React from 'react';
import "./ConfirmationPageVirtual1.css";

const TwitterShareButton = ({ text, url, hashtags }) => {
  // Encode the text for URL usage
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  const encodedHashtags = hashtags ? encodeURIComponent(hashtags.join(',')) : '';

  // Construct the full Twitter intent URL
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`;

  const handleClick = () => {
    // Open a new window for the Twitter sharing dialog
    window.open(twitterIntentUrl, '_blank', 'noopener,noreferrer');
  };

  return (

    <div className="cpv2-btn">
 <button onClick={handleClick} >
Flaunt on X to win additional rewards      </button>

    </div>
   
  );
};

TwitterShareButton.defaultProps = {
  text: "Check out what I've found!",
  url: window.location.href, // Defaults to the current page's URL
  hashtags: ['awesome', 'react'] // Defaults to some hashtags
};

export default TwitterShareButton;
