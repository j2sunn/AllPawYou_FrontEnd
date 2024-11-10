import { Map, MapMarker } from "react-kakao-maps-sdk";

const TheaterLocation = () => {
  return (
    <div>
      <Map
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        style={{
          width: "600px",
          height: "500px",
          borderRadius: "20px",
        }}
      >
        <MapMarker style={{ border: "tranparent" }} position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}>
          <div
            style={{
              color: "#9971ff",
              fontSize: "19px",
              fontWeight: "700",
              border: "4px solid #9971ff",
              borderRadius: "10px",
              padding: "2.5px",
            }}
          >
            🎬 small box 🎬
          </div>
        </MapMarker>
      </Map>
    </div>
    //핀에 적힐 이름 (위치 이름)
  );
};

export default TheaterLocation;
