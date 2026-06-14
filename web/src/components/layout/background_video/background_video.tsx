import React from "react";

interface VideoBackgroundProps {
  src: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => {
  return (
    <>
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover blur-md brightness-50 backdrop-hue-rotate-90 select-none"
      src={src}
    />
    </>
  );
};

export default VideoBackground;
