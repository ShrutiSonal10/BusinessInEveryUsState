import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [businessType, setBusinessType] = useState("");
  const [stateName, setStateName] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Call the onSearch function passed as a prop
    onSearch(businessType, stateName);
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="businessType">Type of Business:</label>
          <input
            type="text"
            id="businessType"
            placeholder="e.g., Restaurant, IT Services"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stateName">Name of State (USA):</label>
          <input
            type="text"
            id="stateName"
            placeholder="e.g., California, Texas"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

