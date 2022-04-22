import { getGlobalState, setGlobalState } from "utils/globalState";
import cookie from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Component() {
  var navigate = useNavigate();
  // initial state
  var [itemListings, setItemListings] = useState([]);

  useEffect(() => {
    // Do axios call here
    async function axiosPost() {
      var res = await axios.get("https://ji1fy3w7p2.execute-api.us-east-1.amazonaws.com/item-listing/api/viewAllListings");
      // console.log(JSON.stringify(res.data))
      setItemListings(res.data);
    }
    axiosPost();
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-bold text-white shadow-md rounded pt-2 pb-8 mb-4">Item Listings</h3>
      {itemListings.map((itemListing) => (
        <div key={itemListing.id}>
          <Link to={"/itemListing?id=" + itemListing.id}>
            {itemListing.listingTitle} {}
            ${itemListing.price}
          </Link>
          {/*Spacing*/}
          <p></p>
          <br></br>
        </div>
      ))}
    </div>
  );
}
