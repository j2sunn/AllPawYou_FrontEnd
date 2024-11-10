import { useState, useEffect } from "react";

const useKakaoLoader = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.kakao) {
      setLoading(false); // Kakao Maps SDK is already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=24bbdb00fa9a34d7534fbdd65caea378&libraries=services,clusterer`;
    script.async = true;

    // When the script is loaded, update the state
    script.onload = () => {
      setLoading(false);
    };

    // If there's an error loading the script
    script.onerror = () => {
      setError("Failed to load Kakao Maps SDK.");
      setLoading(false);
    };

    // Append the script to the document's head
    document.head.appendChild(script);

    // Cleanup script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return { loading, error };
};

export default useKakaoLoader;
