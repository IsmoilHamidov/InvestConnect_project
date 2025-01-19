import React, { useEffect } from "react";

const Loading: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <div className="w-full h-[100vh] bg-gray-100  flex justify-center items-center">
      <dotlottie-wc
        src="https://lottie.host/e75cafe1-da2a-4d03-a300-3579697c2cf9/zcZ1fk0JpY.lottie"
        autoplay
        loop
        style={{ width: "510px", height: "510px" }}
      >
      </dotlottie-wc>
    </div>
  );
};

export default Loading;
