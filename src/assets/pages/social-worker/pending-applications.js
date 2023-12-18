import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import SocialWorkerHeader from './header';

function SocialWorkerPendingApplications() {
  // setting up state hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
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
      id: '1234567890',
      name: 'John Doe',
      profile: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      surname: 'John',
      givenname: 'Doe',
      middlename: 'A.',
      extension: '...',
      civilstatus: 'Single',
      sex: 'Male',
      age: 25,
      dateofbirth: '1998-05-15',
      placeofbirth: 'Manila, Philippines',
      religion: 'Catholic',
      educationalattainment: "Bachelor's Degree",
      presentaddress: '123 Main St, Cityville',
      mobilenumber: '123-456-7890',
      landlinenumber: '987-654-3210',
      profession: 'Software Developer',
      occupation: 'Full Stack Developer',
      monthlyincome: '$5000',
      nameofemployer: 'ABC Company',
      companyaddress: '456 Tech St, Techland',
      companycontactnumber: '555-1234',
      contactperson: 'Jane Smith',
      emergencynumber: '911',
      reason: 'Single parent due to divorce',
      familyComposition: [
        {
          name: 'John Doe Jr.',
          age: 5,
          sex: 'Male',
          relationship: 'Child',
          status: 'Single',
          educationalattainment: 'Preschool',
          occupation: 'N/A',
          monthlyincome: 'N/A',
        },
        {
          name: 'Mary Doe',
          age: 50,
          sex: 'Female',
          relationship: 'Mother',
          status: 'Widowed',
          educationalattainment: 'High School Graduate',
          occupation: 'Retired',
          monthlyincome: '$2000',
        },
      ],
      file1: 'Sample.pdf',
      file2: 'Sample.pdf',
      file3: 'Sample.pdf',
      file4: 'Sample.pdf',
      file5: 'Sample.pdf',
      file6: 'Sample.pdf',
      file7: 'Sample.pdf',
      file8: 'Sample.pdf',
      file9: 'Sample.pdf',
      file10: 'Sample.pdf',
    },
    {
      id: '0987654321',
      name: 'Jane Smith',
      profile: 'https://www.example.com/profile2.png',
      surname: 'Jane',
      givenname: 'Smith',
      middlename: 'B.',
      extension: '...',
      civilstatus: 'Married',
      sex: 'Female',
      age: 35,
      dateofbirth: '1988-03-20',
      placeofbirth: 'New York, USA',
      religion: 'Protestant',
      educationalattainment: "Master's Degree",
      presentaddress: '456 Park Ave, Townsville',
      mobilenumber: '555-6789',
      landlinenumber: '987-654-3210',
      profession: 'Marketing Manager',
      occupation: 'Digital Marketing Specialist',
      monthlyincome: '$7000',
      nameofemployer: 'XYZ Corporation',
      companyaddress: '789 Marketing St, AdCity',
      companycontactnumber: '555-4321',
      contactperson: 'John Doe',
      emergencynumber: '922',
      reason: 'Dual-income family',
      familyComposition: [
        {
          name: 'John Smith',
          age: 38,
          sex: 'Male',
          relationship: 'Spouse',
          status: 'Married',
          educationalattainment: "Doctorate's Degree",
          occupation: 'Medical Doctor',
          monthlyincome: '$8000',
        },
      ],
      file1: 'Document1.pdf',
      file2: 'Document2.pdf',
      file3: 'Document3.pdf',
      file4: 'Document4.pdf',
      file5: 'Document5.pdf',
      file6: 'Document6.pdf',
      file7: 'Document7.pdf',
      file8: 'Document8.pdf',
      file9: 'Document9.pdf',
      file10: 'Document10.pdf',
    },
    // Add more entries as needed
  ];  

  // filtering id number and parent name
  useEffect(() => {
    const filteredResults = data.filter((item) => {
      const soloParentIdMatch = item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const soloParentNameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  
      return soloParentIdMatch || soloParentNameMatch;
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

  useEffect(() => {
    document.title = "Pending Applications | Social Worker";
  }, []);

  return (
    <>
      <main>
        <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
        <div className="right">
          <div className='admin-navbar'>
            <div className='admin-left'>
              <button onClick={handleMenuClick}>☰</button>
            </div>
            <div className='admin-right'>
              <SocialWorkerHeader/>
            </div>
          </div>
          <div className='home-main'>
            <div className='pending-applications-page container'>
              <div className='pa-header'>
                <h2>Pending Applications</h2>
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
                    <th>Solo Parent ID No.</th>
                    <th>Solo Parent Name</th>
                    <th>View Application</th>
                    <th>Approve Application</th>
                    <th>Reject Application</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className='view' onClick={() => openModal(item)}>
                          View
                        </button>
                      </td>
                      <td>
                        <Link to='' className='approve'>Approve</Link>
                      </td>
                      <td>
                        <Link to='' className='reject'>Reject</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <p>No pending applications found.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className='pa-modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <div className='modal-content-grid'>
              {/* Basic info */}
              <div className='modal-profile'>
                <img src={selectedUser.profile} className='modal-pfp'/>
              </div>
              <div className='modal-surname'>
                <p>Surname</p>
                {selectedUser.surname}
              </div>
              <div className='modal-givenname'>
                <p>Given Name</p>
                {selectedUser.givenname}
              </div>
              <div className='modal-middlename'>
                <p>Middle Name</p>
                {selectedUser.middlename}
              </div>
              <div className='modal-extension'>
                <p>Extension</p>
                {selectedUser.extension}
              </div>
              <div className='modal-civilstatus'>
                <p>Civil Status</p>
                {selectedUser.civilstatus}
              </div>
              <div className='modal-sex'>
                <p>Sex</p>
                {selectedUser.sex}
              </div>
              <div className='modal-age'>
                <p>Age</p>
                {selectedUser.age}
              </div>
              <div className='modal-dateofbirth'>
                <p>Date of Birth</p>
                {selectedUser.dateofbirth}
              </div>
              <div className='modal-placeofbirth'>
                <p>Place of Birth</p>
                {selectedUser.placeofbirth}
              </div>
              <div className='modal-religion'>
                <p>Religion</p>
                {selectedUser.religion}
              </div>
              <div className='modal-educationalattainment'>
                <p>Educational Attainment</p>
                {selectedUser.educationalattainment}
              </div>
              <div className='modal-presentaddress'>
                <p>Present Address</p>
                {selectedUser.presentaddress}
              </div>
              <div className='modal-mobilenumber'>
                <p>Mobile Number</p>
                {selectedUser.mobilenumber}
              </div>
              <div className='modal-landlinenumber'>
                <p>Landline Number</p>
                {selectedUser.landlinenumber}
              </div>
              <div className='modal-profession'>
                <p>Profession</p>
                {selectedUser.profession}
              </div>
              <div className='modal-occupation'>
                <p>Occupation</p>
                {selectedUser.occupation}
              </div>
              <div className='modal-monthlyincome'>
                <p>Monthly Income</p>
                {selectedUser.monthlyincome}
              </div>
              <div className='modal-nameofemployer'>
                <p>Name of Employer</p>
                {selectedUser.nameofemployer}
              </div>
              <div className='modal-companyaddress'>
                <p>Company Address</p>
                {selectedUser.companyaddress}
              </div>
              <div className='modal-companycontactnumber'>
                <p>Company Contact Number</p>
                {selectedUser.companycontactnumber}
              </div>
              <div className='modal-contactperson'>
                <p>Contact Person</p>
                {selectedUser.contactperson}
              </div>
              <div className='modal-emergencynumber'>
                <p>Emergency Number</p>
                {selectedUser.emergencynumber}
              </div>
              <div className='modal-reason'>
                <p>Reason</p>
                {selectedUser.reason}
              </div>
              
            {/* Family composition */}
            {selectedUser.familyComposition.length > 0 && (
            <div className='modal-familymember'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Relationship</th>
                    <th>Status</th>
                    <th>Educational Attainment</th>
                    <th>Occupation</th>
                    <th>Monthly Income</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.familyComposition.map((familyMember, index) => (
                    <tr key={index}>
                      <td>{familyMember.name}</td>
                      <td>{familyMember.age}</td>
                      <td>{familyMember.sex}</td>
                      <td>{familyMember.relationship}</td>
                      <td>{familyMember.status}</td>
                      <td>{familyMember.educationalattainment}</td>
                      <td>{familyMember.occupation}</td>
                      <td>{familyMember.monthlyincome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
              {/* Requirements */}
              <div className='modal-file1'>
                <p>Photocopy of Care Card or Voter’s ID/Verification (if available)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file1}</Link>
              </div>
              <div className='modal-file2'>
                <p>Barangay Certificate</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file2}</Link>
              </div>
              <div className='modal-file3'>
                <p>Certificate of Employement (if employed)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file3}</Link>
              </div>
              <div className='modal-file4'>
                <p>Photo copy of ITR or 1 month payslip (if employed)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file4}</Link>
              </div>
              <div className='modal-file5'>
                <p>Certificate of Non-Filling of ITR (not employed)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file5}</Link>
              </div>
              <div className='modal-file6'>
                <p>Affidavit of Being a Solo Parent (Legal Office - 3F Annex Bldg., City Hall)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file6}</Link>
              </div>
              <div className='modal-file7'>
                <p>Photo Copy of birth Certicate of Child/Children, 22 years old and below</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file7}</Link>
              </div>
              <div className='modal-file8'>
                <p>Photo Copy of PWD ID (for PWD Child/Children)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file8}</Link>
              </div>
              <div className='modal-file9'>
                <p>Photo Copy of Spouse Death Certificate(if widow/widower)</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file9}</Link>
              </div>
              <div className='modal-file10'>
                <p>Latest 1x1 Picture</p>
                <br/>
                <Link to='' target="_blank">{selectedUser.file10}</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SocialWorkerPendingApplications;
