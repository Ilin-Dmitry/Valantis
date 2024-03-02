import { useState, useEffect } from "react";
import md5 from "js-md5";
import Item from "./Item";
// const PASS = "Valantis";
// const date = new Date();
// const year = date.getUTCFullYear();
// const month = date.getUTCMonth();
// const day = date.getUTCDay();
// const fullUTCDate = "" + year + month + day;
const PASSWORD = md5("Valantis_20240227");
const API = "http://api.valantis.store:40000/";

// const UtcDate = Date.UTC(year, monthIndex, day);
// console.log("Date", DATE.getHours());
// console.log("Date", fullUTCDate);

async function fetchingIds(callback) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "X-Auth": PASSWORD,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "get_ids",
        // params: { ids: ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"] },
      }),
    });
    const data = await res.json();
    const idsArray = data.result;
    const finalArray = [...new Set(idsArray)];
    // console.log("data", data);
    callback(finalArray);
    // console.log(idsArray.length, finalArray.length);
    return finalArray;
  } catch {
    console.warn("Unknown Error");
  } finally {
    console.log("Exit");
  }
}

async function fetchingItems(idsArray) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "X-Auth": PASSWORD,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "get_items",
        params: { ids: idsArray },
      }),
    });
    const data = await res.json();
    console.log("items", data);
  } catch {
    console.warn("Unknown Error");
  } finally {
    console.log("Exit fetchingItems");
  }
}

function App() {
  const [ids, setIds] = useState([]);
  const [shownItemsIndexStart, setShownItemsIndexStart] = useState(0);
  const itemsToShow = ids.map((item, index) => {
    if (index >= shownItemsIndexStart && index < shownItemsIndexStart + 5) {
      console.log(index);
      return item;
    }
  });
  // console.log(md5("Valantis_20240226"));

  useEffect(function () {
    fetchingIds(setIds);
  }, []);

  useEffect(
    function () {
      if (!ids.length) {
        console.log(ids);
        return;
      }
      fetchingItems(itemsToShow);
    },
    [ids]
  );

  // Working version
  // useEffect(function () {
  //   async function fetchingData() {
  //     const res = await fetch("http://api.valantis.store:40000/", {
  //       method: "POST",
  //       headers: {
  //         "X-Auth": "cd0bfbcb48b87cbb908ce771120bb507",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         action: "get_ids",
  //         params: { offset: 10, limit: 3 },
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log("data", data);
  //   }
  //   fetchingData();
  // }, []);

  return (
    <div>
      {itemsToShow.map((item) => {
        return <Item id={item} key={item} />;
      })}
    </div>
  );
}

export default App;
