import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import Loader from "./Loader";
import SearchForm from "./SearchForm";
import Button from "./Button";
import { fetchIds, fetchItems, fetchFilteredIds } from "../utils/Apis.js";
import {
  filterDuplicatedItems,
  showExactNumberIds,
  filterDuplicatedIds,
} from "../utils/helpers";

function App() {
  const [noDuplicateIds, setNoDuplicateIds] = useState([]);
  const [itemsToRender, setItemsToRender] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsOnPage, setItemsOnPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchStatus, setFetchStatus] = useState("first render");
  const [search, setSearch] = useState({ type: "product", value: "" });
  const pagesNumber = noDuplicateIds / itemsOnPage;
  const [previousSearch, setPreviousSearch] = useState({
    type: "product",
    value: "",
  });
  const [noFoundItems, setNoFoundItems] = useState(false);

  useEffect(
    function () {
      if (fetchStatus !== "first render" && fetchStatus !== "error in fetchIds")
        return;
      setIsLoading(true);
      fetchIds()
        .then((ids) => filterDuplicatedIds(ids))
        .then((filteredIds) => setNoDuplicateIds(filteredIds))
        .catch((err) => {
          console.log(err.message);
          setFetchStatus("error in fetchIds");
        });
    },
    [fetchStatus]
  );

  useEffect(
    function () {
      if (!noDuplicateIds.length) return;
      setIsLoading(true);
      const idsToFetch = showExactNumberIds(
        noDuplicateIds,
        currentPage * itemsOnPage - itemsOnPage,
        itemsOnPage
      );
      fetchItems(idsToFetch)
        .then((fetchedItems) => filterDuplicatedItems(fetchedItems))
        .then((itemsToRender) => setItemsToRender(itemsToRender))
        .then((res) => {
          setIsLoading(false);
          setFetchStatus("fethcing succeeded");
        })
        .catch((err) => {
          console.log(err.message);
          setFetchStatus("error in fetchItems");
        });
    },
    [noDuplicateIds, currentPage, itemsOnPage, fetchStatus]
  );

  function handleSearch() {
    if (
      search.type === previousSearch.type &&
      search.value === previousSearch.value
    )
      return;
    setIsLoading(true);
    setPreviousSearch(search);
    setNoFoundItems(false);
    const { type, value } = search;
    fetchFilteredIds(type, value)
      .then((ids) => {
        if (ids.length === 0) {
          setNoFoundItems(true);
          setIsLoading(false);
        }
        return filterDuplicatedIds(ids);
      })
      .then((filteredIds) => setNoDuplicateIds(filteredIds))
      .catch((err) => {
        console.log(err.message);
        setFetchStatus("error in fetchFilteredIds");
      });
  }

  function handlePageForward() {
    if (currentPage === pagesNumber) return;
    setCurrentPage((cur) => cur + 1);
  }

  function handlePageBackward() {
    if (currentPage === 1) return;
    setCurrentPage((cur) => cur - 1);
  }

  return (
    <div className="app">
      <>
        <SearchForm
          onSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ItemList
              itemsToRender={itemsToRender}
              itemsOnPage={itemsOnPage}
              currentPage={currentPage}
              noItems={noFoundItems}
            >
              <Button
                text="&larr;"
                onClick={handlePageBackward}
                disabled={currentPage === 1}
              />
              <Button
                text="&rarr;"
                onClick={handlePageForward}
                disabled={currentPage === pagesNumber}
              />
            </ItemList>
          </>
        )}
      </>
    </div>
  );
}

export default App;
