import { useEffect } from "react";

function SearchForm({
  onSearch,
  search,
  setSearch,
  isLoading,
  previousSearch,
}) {
  function handleSearch() {
    if (!search.value || isLoading) return;
    onSearch();
  }

  function handleClickEnter(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  useEffect(
    function () {
      document.addEventListener("keydown", handleClickEnter);
      return function () {
        document.removeEventListener("keydown", handleClickEnter);
      };
    },
    [search, previousSearch, isLoading]
  );

  return (
    <div className="searchBar">
      <select
        value={search.type}
        onChange={(e) => {
          setSearch((s) => ({ ...s, type: e.target.value }));
        }}
      >
        <option value="product">По названию</option>
        <option value="price">По цене</option>
        <option value="brand">По бренду</option>
      </select>
      <input
        type="text"
        value={search.value}
        placeholder="Что найти?"
        onChange={(e) => {
          setSearch((s) => ({ ...s, value: e.target.value }));
        }}
      />
      <button onClick={handleSearch}>Найти</button>
    </div>
  );
}

export default SearchForm;
