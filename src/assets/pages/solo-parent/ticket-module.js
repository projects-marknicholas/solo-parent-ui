import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import SoloParentHeader from "./header";
import { useSession } from "./session";

function SoloParentTicketModule() {
  useEffect(() => {
    document.title = "Ticket Module | Solo Parent";
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  // setting up state hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]); // State to store fetched data
  const { session } = useSession();

  // menu opening and hiding
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // filter search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to open the modal and set selected user
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to fetch data from the API endpoint
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://solo-parent.vercel.app/api/solo-parent/showalltickets/${session.Id}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter((ticket) => {
    // Convert all fields to lowercase for case-insensitive search
    const values = Object.values(ticket).map((value) =>
      typeof value === "string" ? value.toLowerCase() : ""
    );
    return values.some((value) => value.includes(searchTerm.toLowerCase()));
  });

  return (
    <>
      {isModalOpen && selectedUser && (
        <div className="ticket-modal">
          <div className="ticketing">
            <div className="ext-fld">
              <button onClick={closeModal}>×</button>
            </div>
            <fieldset>
              <legend>Ticketing</legend>
              <div className="left">
                <strong>
                  Ticket ID: <span>{selectedUser.CaseNumber}</span>
                </strong>
                <strong>
                  Type: <span>{selectedUser.Type}</span>
                </strong>
                <strong>
                  Status: <span>{selectedUser.Status}</span>
                </strong>
                <strong>Description:</strong>
                <p className="result">{selectedUser.Description}</p>
              </div>
              <div className="right">
                <strong>Supplied Email</strong>
                <p className="result">{selectedUser.SuppliedEmail}</p>
                <i>
                  Created Date: <span>{selectedUser.CreatedDate}</span>
                </i>
              </div>
            </fieldset>
          </div>
        </div>
      )}
      <main>
        <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
        <div className="right">
          <div className="admin-navbar">
            <div className="admin-left">
              <button onClick={handleMenuClick}>☰</button>
            </div>
            <div className="admin-right">
              <SoloParentHeader />
            </div>
          </div>
          <div className="home-main">
            <div className="pending-applications-page container">
              <div className="pa-header">
                <h2>Ticket Module</h2>
                <div className="pa-filtering">
                  <input
                    type="search"
                    placeholder="Search..."
                    autoComplete="off"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            <div className="pa-table container">
              <table>
                <thead>
                  <tr>
                    <th>Created Date</th>
                    <th>Ticket Number</th>
                    <th>Ticket Type</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((ticket) => (
                    <tr key={ticket.CaseNumber}>
                      <td>{ticket.CreatedDate}</td>
                      <td>{ticket.CaseNumber}</td>
                      <td>{ticket.Type}</td>
                      <td>{ticket.Status}</td>
                      <td>{ticket.Description}</td>
                      <td>
                        <button
                          className="view"
                          onClick={() => openModal(ticket)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SoloParentTicketModule;
