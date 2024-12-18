import React, { useState } from "react";
import { Input, FormGroup } from "reactstrap";

const SearchBar = ({ data, searchField, placeholder, onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    const results = data.filter(
      (item) =>
        item[searchField]?.toLowerCase()?.includes(searchTerm) ||
        item?.address?.toLowerCase?.()?.includes(searchTerm)
    );
    onSearchResults(results);
  };

  return (
    <FormGroup>
      <Input
        id="searchBar"
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder || "Search..."}
        style={{ width: "550px", maxWidth: "100%" }}
      />
    </FormGroup>
  );
};

export default SearchBar;
