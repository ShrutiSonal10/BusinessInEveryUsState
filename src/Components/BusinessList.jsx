import React, { useEffect, useState } from 'react';

const BusinessList = ({ state, businessType }) => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`http://localhost:5000/api/search-business/${businessType}/${state}`);
        if (!response.ok) {
          throw new Error('Failed to fetch business data.');
        }
        const data = await response.json();
        setBusinesses(data.slice(0, 20)); // Limit to 20 items
        setError(null); // Clear any existing errors
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (state && businessType) {
      fetchBusinesses();
    }
  }, [state, businessType]);

  const displayValue = (value) => {
    return value && value !== 'NaN' ? value : <span style={{ color: '#888' }}>Not Available</span>;
  };

  return (
    <div className="business-list-container">
      <h2>Businesses in {state}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        businesses.length > 0 ? (
          <ul>
            {businesses.map((business, index) => (
              <li key={index} className="business-item">
                <h3>{displayValue(business["Business Name"])}</h3>
                <div className="business-data">
                  <p><strong>Category:</strong> {displayValue(business["Category"])}</p>
                  <p><strong>Locality:</strong> {displayValue(business["Locality"])}</p>
                  <p><strong>Phone:</strong> {displayValue(business["Phone"])}</p>
                  <p><strong>Rating:</strong> {displayValue(business["Rating"])}</p>
                  <p><strong>Street Address:</strong> {displayValue(business["Street Address"])}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No businesses found in this category for the specified state.</p>
        )
      )}
    </div>
  );
};

export default BusinessList;

