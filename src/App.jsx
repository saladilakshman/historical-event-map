import { useReducer, createContext, useEffect } from "react";
import "./App.css";
import Map from "./components/map";
import { Events } from "./constants/events";
import Favourites from "./components/favourites";
export const EventsAppState = createContext();
function App() {
  const viteAppState = {
    AllEvents: Events,
    favouriteslist: [],
    isaddedtofavourites: false,
    selectedoption: null,
    coordinatepositiontoshow: null,
    activateflymotion: false,
  };

  function reducerfunction(state, action) {
    if (action.type === "add-to-favourites") {
      return {
        ...state,
        isaddedtofavourites: true,
        favouriteslist: [...state.favouriteslist, action.payload],
      };
    }
    if (action.type === "remove-from-favourites") {
      const removeevent = state.favouriteslist.filter(
        (q) => q.id !== action.payload
      );
      return {
        ...state,
        isaddedtofavourites: false,
        favouriteslist: removeevent,
      };
    }
    if (action.type === "show-location") {
      return {
        ...state,
        activateflymotion: true,
        coordinatepositiontoshow: action.payload,
      };
    }
    if (action.type === "filter-events") {
      const getEventsbycategory =
        action.payload === "All"
          ? Events
          : Events.filter((el) => el.category === action.payload);
      return {
        ...state,
        selectedoption: action.payload,
        AllEvents: getEventsbycategory,
      };
    } else {
      return state;
    }
  }
  const initializer = (initial) => {
    const localData = window.localStorage.getItem("app");
    return localData ? JSON.parse(localData) : initial;
  };

  const [state, dispatch] = useReducer(
    reducerfunction,
    viteAppState,
    initializer
  );

  useEffect(() => {
    window.localStorage.setItem("app", JSON.stringify(state));
  }, [state]);
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 my-8  px-2 lg:px-10 gap-2">
      <EventsAppState.Provider value={{ state, dispatch }}>
        <Map />
        <Favourites />
      </EventsAppState.Provider>
    </main>
  );
}

export default App;
