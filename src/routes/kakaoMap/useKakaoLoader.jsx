import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "986e75a67e5fdc8f3b70f82698a45344",
    libraries: ["clusterer", "drawing", "services"],
  });
}
