import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';  // Import axios for making API requests
import Card from './ResultsCard';
import './ResultsPage.css';

const ResultsPage = () => {
  const { clubName } = useParams();
  const [data, setData] = useState(null); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch the results data based on clubName
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/result/${clubName}`);

        setData(response.data); // Set the fetched data to state
      } catch (err) {
        setError(err.message); // If an error occurs, update the error state
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, [clubName]);

  // Show a loading message while data is being fetched
  if (loading) {
    return (
      <div className="app-container">
        <div className="results-header">
          <h1 className="title">Loading results...</h1>
        </div>
      </div>
    );
  }

  // If there's an error, display the error message
  if (error) {
    return (
      <div className="app-container">
        <div className="results-header">
          <h1 className="title">Error: {error}</h1>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    );
  }

  // If no data is found, show a fallback message
  if (!data) {
    return (
      <div className="app-container">
        <div className="results-header">
          <h1 className="title">No results found for {clubName}</h1>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="results-header">
        <h1 className="title">Shortlisted Candidates</h1>
        {/* <Link to="/" className="back-button">Back to Home</Link> */}
      </div>
      <div className="cards-container">
        <Card domain={data.domain} candidates={data.candidates} />
      </div>
    </div>
  );
};

export default ResultsPage;
