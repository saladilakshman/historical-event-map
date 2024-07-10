import { Events } from "../constants/events";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import pin from "../assets/pin.png";
import "leaflet/dist/leaflet.css";
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { EventsAppState } from "../App";
import { useContext } from "react";
import FlyLocation from "./fly";
const Map = () => {
  const { state, dispatch } = useContext(EventsAppState);
  const filtercategories = Events.map((event) => event.category);
  const categories = ["All", ...new Set(filtercategories)];
  const icon = new Icon({
    iconUrl: pin,
    iconSize: [45, 45],
  });
  return (
    <div className="lg:col-span-9 w-full">
      <div className="px-4 border-2 border-gray-500 rounded-md w-full py-2">
        <select
          id="categories-list"
          className="bg-gray-200 lg:w-[10rem] w-auto text-xl rounded-lg border-none outline-none px-2"
          onChange={(e) => {
            dispatch({ type: "filter-events", payload: e.target.value });
            console.log(state);
          }}
          value={state?.selectedoption}
        >
          {Array.from(categories, (category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-full border border-gray-500 rounded-md my-2 ">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {state?.AllEvents?.map((event) => {
            const { id, title, description, position } = event;
            return (
              <Marker position={position} key={id} icon={icon}>
                {state?.activateflymotion && <FlyLocation />}
                <Popup position={position}>
                  <div className="flex justify-between items-center py-1 pb-2">
                    <h2 className="lg:text-xl text-base text-emerald-500 ">
                      {title}
                    </h2>
                    <div
                      className="text-base lg:text-xl"
                      onClick={() => {
                        state.favouriteslist.find((el) => el.id === id)
                          ? dispatch({
                              type: "remove-from-favourites",
                              payload: id,
                            })
                          : dispatch({
                              type: "add-to-favourites",
                              payload: event,
                            });
                      }}
                    >
                      {state.favouriteslist.find((el) => el.id === id) ? (
                        <MdOutlineStarPurple500 className="text-emerald-600" />
                      ) : (
                        <IoStarOutline />
                      )}
                    </div>
                  </div>
                  <h6 className="lg:text-md text-base">{description}</h6>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
