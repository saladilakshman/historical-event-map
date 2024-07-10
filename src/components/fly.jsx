import { useMap } from "react-leaflet";
import { EventsAppState } from "../App";
import { useContext } from "react";
export default function FlyLocation() {
  const {
    state: { coordinatepositiontoshow },
  } = useContext(EventsAppState);
  const map = useMap();
  if (coordinatepositiontoshow) {
    map.flyTo(coordinatepositiontoshow, 18);
  }
}
