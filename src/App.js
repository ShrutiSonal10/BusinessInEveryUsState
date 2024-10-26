import React, { useState } from 'react';
import Navbar from "./Components/Navbar";
import SearchForm from "./Components/SearchComponent";
import BusinessList from './Components/BusinessList';
import "./Components/Navbar.css";  
import "./Components/SearchComponent.css";  

function App() {
  const [searchParams, setSearchParams] = useState({ businessType: '', state: '' });

  const handleSearch = (businessType, state) => {
    setSearchParams({ businessType, state });
  };

  return (
    <>
      <Navbar />
      <SearchForm onSearch={handleSearch} />
      {searchParams.state && searchParams.businessType && (
        <BusinessList state={searchParams.state} businessType={searchParams.businessType} />
      )}
    </>
  );
}

export default App;
