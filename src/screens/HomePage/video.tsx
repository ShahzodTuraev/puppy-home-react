import React from "react";

const Video = () => {
  return (
    <div>
      <video loop autoPlay muted data-video-media width="100%" height="auto">
        <source src="/video/ad.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
