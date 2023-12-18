import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import SoloParentHeader from './header';

function SoloParentTicketModule() {
  useEffect(() => {
    document.title = "Ticket Module | Solo Parent";
  }, []);

  // setting up state hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // menu opening and hiding
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // filter search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // giving data for the table
  const data = [
    {
      createdDate: '13/12/2023',
      clientName: 'John Doe',
      ticketNumber: '098754321',
      ticketType: 'Apply for Loan',
      status: 'On Process',
      result: 'Result here...',
      notes: 'This is just a sample notes'
    }
  ];  

  // setting up filter data state
  const [filteredData, setFilteredData] = useState(data);

  // filtering data based on search term
  useEffect(() => {
    const filteredResults = data.filter((item) => {
      const searchFields = Object.values(item).map(value => value.toLowerCase());
      return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    });

    setFilteredData(filteredResults);
  }, [searchTerm, data]);  

  // Function to open the modal and set selected user
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && selectedUser && (
        <div className='ticket-modal'>
          <div className='ticketing'>
            <div className='ext-fld'>
              <button onClick={closeModal}>×</button>
            </div>
            <fieldset>
              <legend>Ticketing</legend>
              <div className='left'>
                <strong>Ticket ID: <span>{selectedUser.ticketNumber}</span></strong>
                <strong>Client Name: <span>{selectedUser.clientName}</span></strong>
                <strong>Ticket Status: <span>{selectedUser.status}</span></strong>
                <strong>Result:</strong>
                <p className='result'>
                  {selectedUser.result}
                </p>
              </div>
              <div className='right'>
                <strong>Notes</strong>
                <p className='result'>{selectedUser.notes}</p> {/*put max height*/}
                <i>Assigned to: <span>put here</span></i>
                <i>Created Date: <span>put here</span></i>
                <i>Last Activity Date: <span>put here</span></i>
                <i>Last Modified by: <span>put here</span></i>
                <i>Contact Information: <span>put here</span></i>
              </div>
            </fieldset>
          </div>
        </div>
      )}
      <main>
        <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
        <div className="right">
          <div className='admin-navbar'>
            <div className='admin-left'>
              <button onClick={handleMenuClick}>☰</button>
            </div>
            <div className='admin-right'>
              <SoloParentHeader/>
            </div>
          </div>
          <div className='home-main'>
            <div className='pending-applications-page container'>
              <div className='pa-header'>
                <h2>Ticket Module</h2>
                <div className='pa-filtering'>
                  <input 
                    type='search'
                    placeholder='Search...'
                    autoComplete='off'
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            <div className='pa-table container'>
              {filteredData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Created Date</th>
                      <th>Ticket Number</th>
                      <th>Ticket Type</th>
                      <th>Status</th>
                      <th>Notes</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.createdDate}</td>
                        <td>{item.ticketNumber}</td>
                        <td>{item.ticketType}</td>
                        <td>{item.status}</td>
                        <td>{item.notes}</td>
                        <td>
                          <button className='view' onClick={() => openModal(item)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No matching tickets found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SoloParentTicketModule;
