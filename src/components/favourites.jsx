import emptyicon from "../assets/folder.png";
import { useContext } from "react";
import { EventsAppState } from "../App";
const Favourites = () => {
  const { state, dispatch } = useContext(EventsAppState);
  return (
    <div className="lg:col-span-3 border-2 border-gray-600 rounded-lg p-2 lg:overflow-auto ">
      <h2 className="text-white pb-3 text-base lg:text-xl border-b-2 border-b-gray-600">
        Favourites
      </h2>
      <div
        className="flex lg:flex-col gap-2 max-sm:flex-start overflow-auto mt-2 "
        id="bar"
      >
        {state?.favouriteslist?.length === 0 ? (
          <div className="flex flex-row lg:flex-col justiy-center items-center gap-2">
            <img
              src={emptyicon}
              alt=""
              className="size-8 rounded-full lg:size-40"
            />
            <h2 className=" text-base lg:text-xl text-white">Bookmark here</h2>
          </div>
        ) : (
          state?.favouriteslist?.map((list, index) => {
            return (
              <div
                key={index}
                className="w-full shadow-xl bg-neutral-600 rounded-md p-1 cursor-default pl-2 text-nowrap"
                onClick={() =>
                  dispatch({ type: "show-location", payload: list.position })
                }
              >
                <h1 className=" text-base lg:text-xl text-white">
                  {list.title}
                </h1>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favourites;
