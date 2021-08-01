import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageViews(setSideMenuInactive) {
  let location = useLocation();
  useEffect(() => {
    // console.log("location", location, "props", props);
    setSideMenuInactive();
  }, [location]);
}
