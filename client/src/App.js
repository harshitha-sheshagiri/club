// import React, { useEffect ,useState} from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// // Import components
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import AboutUs from './components/AboutUs';
// import Calendar from './components/Calendar'; 
// import Domains from './components/Domains';
// import DomainDetails from './components/DomainDetails';
// import ProjectPage from './components/ProjectPage';
// import ResultsPage from './components/ResultsPage';
// import AboutClub from './components/AboutClubPage'; // AboutClub component

// import './App.css';

// function App() {
//   const [data,setData]=useState(null)
//   useEffect(()=>{
//     fetch('http://localhost:5001/domain/computer')
//      .then(res=>res.json)
//      .then(data=>console.log(data))
//      .catch(err=>console.log(err));
//   })

//   return (
//     <Router>
//       <Navbar /> {/* Always display the navbar */}
//       <div className="App">
//         <Routes>
//           {/* Main Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/calendar" element={<Calendar />} />
//           <Route path="/domains" element={<Domains />} />
//           <Route path="/projectpage" element={<ProjectPage />} />
//           <Route path="/results" element={<ResultsPage />} />

//           {/* New Route for About Club */}
//           <Route path="/about-club" element={<AboutClub />} />

//           {/* Dynamic Route for Domain Details */}
//           <Route path="/domain/:domainId" element={<DomainDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Calendar from './components/Calendar';
import Domains from './components/Domains';
import DomainDetails from './components/DomainDetails';
import ProjectPage from './components/ProjectPage';
import ResultsPage from './components/ResultsPage';
import AboutClub from './components/AboutClubPage'; // AboutClub component

import './App.css';

function App() {
  // const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/domain/computer')
      // .then((res) => res.json())  // Convert response to JSON
      // .then((data) => setData(data))  // Update state
      // .catch((err) => console.error("Error fetching data:", err));
      .then(response => setMessage(response))
      .catch(error => console.error('Error fetching data:', error));

  }, []);  // Empty dependency array to run only once

  // useEffect(() => {
  //   console.log("Fetched Data:", data);  // Log the data for debugging
  // }, [data]);  // Run whenever `data` is updated

  return (
    <Router>
      <Navbar /> {/* Always display the navbar */}
      <div className="App">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/projectpage" element={<ProjectPage />} />
          <Route path="/results" element={<ResultsPage />} />

          {/* New Route for About Club */}
          <Route path="/about-club" element={<AboutClub />} />

          {/* Dynamic Route for Domain Details */}
          <Route path="/domain/:domainId" element={<DomainDetails />} />

          {/* Fallback Route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

