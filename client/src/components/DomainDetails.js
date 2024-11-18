//src/components/DomainDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './DomainDetails.css'; // Make sure this path matches your project structure

const DomainDetails = () => {
    const { domainId } = useParams();

    // Example data (replace with actual data)
    const domainData = {
        nlp: {
            description: "Natural Language Processing (NLP) is a field of AI focused on the interaction between computers and humans using natural language.",
            members: [
                { name: "John Doe", contact: "john@example.com", role: "Team Lead" },
                { name: "Jane Smith", contact: "jane@example.com", role: "Data Scientist" },
                { name: "Jack Roy", contact: "jack@example.com", role: "Manager" },
            ]
        },
        "computer-vision": {
            description: "Computer Vision involves teaching computers to interpret and understand the visual world.",
            members: [
                { name: "Alice Brown", contact: "alice@example.com", role: "CV Engineer" },
                { name: "Bob White", contact: "bob@example.com", role: "ML Specialist" }
            ]
        },
        cyber: {
            description: "Cyber Security is the practice of protecting systems, networks, and programs from digital attacks.",
            members: [
                { name: "Tom Green", contact: "tom@example.com", role: "Security Analyst" },
                { name: "Sam Blue", contact: "sam@example.com", role: "Threat Hunter" }
            ]
        }
    };

    const details = domainData[domainId];

    if (!details) {
        return <div className="domain-details-container">No members in this domain!</div>;
    }

    return (
        <div className="domain-details-container">
            <h1 className="domain-details-title">{domainId.replace("-", " ").toUpperCase()}</h1>
            <p className="domain-details-description">{details.description}</p>
            <h2 className="members-title">Enrolled Members:</h2>
            <div className="members-list">
                {details.members.map((member, index) => (
                    <div className="member-info" key={index}>
                        <div className="member-details">
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">Role: {member.role}</p>
                            <p className="contact-info">
                                <i className="fas fa-envelope"></i> {member.contact}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DomainDetails;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';  // Import axios for making HTTP requests
// import './DomainDetails.css';

// const DomainDetails = () => {
//     const { domainId } = useParams();  // Get the dynamic parameter from the URL
//     console.log("Domain ID from useParams:", domainId);
//     const [domainData, setDomainData] = useState(null);  // State to store domain data
//     const [error, setError] = useState(null);  // State to handle errors
//     const [loading, setLoading] = useState(true);  // State to handle loading state

//     useEffect(() => {
//         const fetchDomainDetails = async () => {
//             try {
//                 // const response = await axios.get(`http://localhost:5001/domain/${domainId}`);  // API call
//                 console.log("*****************"+domainId);
//                 // domainId='673a181b05d4e0ad114be7d3'
//                                 const response = await axios.get(`http://localhost:5001/domain/${domainId}`);
                                 

//                 setDomainData(response.data);  // Set the fetched data
//                 // setLoading(false);  // Set loading to false after data is fetched
//             } catch (error) {
//                 setError('Error fetching domain details.');  // Set error message if the API call fails
//                   // Set loading to false after error
//             }
//             finally {
//                 setLoading(false);
//             }
//         };

//         fetchDomainDetails();  // Trigger the API call
//     }, [domainId]);  // Re-fetch data when domainId changes

//     if (loading) {
//         return <div className="domain-details-container">Loading...</div>;
//     }

//     if (error) {
//         return <div className="domain-details-container">{error}</div>;
//     }

//     if (!domainData) {
//         return <div className="domain-details-container">Domain not found</div>;
//     }

//     return (
//         <div className="domain-details-container">
//             <h1 className="domain-details-title">{domainId.replace("-", " ").toUpperCase()}</h1>
//             <p className="domain-details-description">{domainData.description}</p>
//             <h2 className="members-title">Enrolled Members:</h2>
//             <div className="members-list">
//                 {domainData.members.map((member, index) => (
//                     <div className="member-info" key={index}>
//                         <div className="member-details">
//                             <h3 className="member-name">{member.name}</h3>
//                             <p className="member-role">Role: {member.role}</p>
//                             <p className="contact-info">
//                                 <i className="fas fa-envelope"></i> {member.contact}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DomainDetails;
