import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VideoView = () => {
  const [loadStage, setLoadStage] = useState(true);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoadStage(false);
      setShowVideoPlayer(true);
    }, 3000); // Show loader for 3 seconds

    const videoTimeout = setTimeout(() => {
      navigate("/signin"); // Redirect to sign-in after 4 seconds
    }, 6000); // Keep the video player displayed for 4 seconds before redirecting

    // Cleanup timeouts on unmount
    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(videoTimeout);
    };
  }, [navigate]);

  return (
    <div className="bg-[#ECF2F4]">
      <div className="h-screen">
        {loadStage && (
          <div className="flex flex-col items-center justify-center gap-0 h-full">
            <div></div>
            <div className="flex flex-col items-center justify-center gap-0 ">
              <img
                src="/loading.gif"
                className="h-[100px] md:h-[200px]"
                alt="Loading"
              />
              <div>Please wait</div>
            </div>
            <div></div>
          </div>
        )}

        {!loadStage && showVideoPlayer && (
          <div className="flex flex-col items-center justify-center h-full bg-black">
            <video
              src="/path/to/your/video.mp4" // Replace with your video source
              className="w-full h-auto"
              controls // Add controls to allow user interaction
              autoPlay={false} // No autoplay
              onEnded={() => navigate("/signin")} // Optional: Redirect after video ends
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoView;
