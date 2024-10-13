import React, { useState } from "react";

const VideoView = () => {
  const [LoadStage, setLoadStage] = useState(true);

  return (
    <div className="bg-[#ECF2F4]">
      <div className="h-screen">
        {LoadStage && (
          <div className="flex flex-col items-center justify-center gap-0 h-full">
            <div></div>
            <div className="flex flex-col items-center justify-center gap-0 ">
              <img src="/loading.gif" className="h-[100px] md:h-[200px]" />
              <div>Please wait</div>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoView;
