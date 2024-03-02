import { API_LINK, HEADERS } from "./constants";

export async function fetchIds() {
  try {
    const res = await fetch(API_LINK, {
      method: "POST",
      headers: HEADERS,
      credentials: true,
      body: JSON.stringify({ action: "get_ids" }),
    });
    if (!res.ok)
      throw new Error(`Error in fetchIds: ${res.status} - ${res.statusText}`);
    const data = await res.json();
    const idsArray = data.result;
    return idsArray;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchItems(itemsArray) {
  try {
    const res = await fetch(API_LINK, {
      method: "POST",
      headers: HEADERS,
      redentials: true,
      body: JSON.stringify({
        action: "get_items",
        params: { ids: itemsArray },
      }),
    });
    if (!res.ok)
      throw new Error(`Error in fetchItems: ${res.status} - ${res.statusText}`);
    const data = await res.json();
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchFilteredIds(type, value) {
  if (type === "price") value = Number(value);
  try {
    const res = await fetch(API_LINK, {
      method: "POST",
      headers: HEADERS,
      redentials: true,
      body: JSON.stringify({
        action: "filter",
        params: { [type]: value },
      }),
    });
    if (!res.ok)
      throw new Error(
        `Error in fetchFilteredIds: ${res.status} - ${res.statusText}`
      );
    const data = await res.json();
    return data.result;
  } catch (err) {
    throw new Error(err.message);
  }
}
