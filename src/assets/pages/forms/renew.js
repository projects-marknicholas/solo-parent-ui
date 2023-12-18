import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import Success from '../../img/success.svg';

function Renew(){

  // success message popup
  const [showPopup, setShowPopup] = useState(false);

  const showSuccessPopup = () => {
    setShowPopup(true);

    // You can add any additional logic or API calls here if needed.
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // setting up the camera for e-signature
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureImage = async () => {
    console.log('Capturing image...');
    const canvas = await html2canvas(document.getElementById('capture-container-renew'));
    const imageData = canvas.toDataURL('image/png');
    console.log('Captured image data:', imageData);
    setCapturedImage(imageData);
  
    console.log('Updated formState:', formState);
    setFormState((prevState) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        eSignature: imageData,
      },
    }));
  };

  // setting up the form data to insert in the create-user-account endpoint
  const [formState, setFormState] = useState({
    personalInfo: {
      surName: '',
      givenName: '',
      middleName: '',
      extension: '',
      civilStatus: '',
      sex: 'Male',
      age: '',
      dateOfBirth: '',
      placeOfBirth: '',
      religion: '',
      mobileNumber: '',
      idCardNumber: '',
      idCardType: '',
      otherIdCardType: '',
      landlineNumber: '',
      presentAddress: '',
      educationalAttainment: '',
      profession: '',
      occupation: '',
      monthlyIncome: '',
      nameOfEmployer: '',
      employerAddress: '',
      contactNumber: '',
      // other fields
      // reasons/circumstances: ''
    },
    familyComposition: [
      {
        name: '',
        age: '',
        sex: 'Male',
        relationShip: '',
        status: '',
        educationalAttainment: '',
        occupation: '',
        monthlyIncome: '',
      },
    ],
    voters: [
      {
        file: '',
      }
    ],
    barangayCert: [
      {
        file: '',
      }
    ],
    certOfEmployment: [
      {
        file: '',
      }
    ],
    paySlip: [
      {
        file: '',
      }
    ],
    nonFillingtr: [
      {
        file: '',
      }
    ],
    businessPermit: [
      {
        file: '',
      }
    ],
    affSoloParent: [
      {
        file: '',
      }
    ],
    pwdid: [
      {
        file: '',
      }
    ],
    deathcert: [
      {
        file: '',
      }
    ],
    eSignature: [
      {
        file: '',
      }
    ],
    picture: [
      {
        file: '',
      }
    ],
    soloParentId: [
      {
        file: '',
      }
    ],
  });

  // function for automatically calculating the age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Update the form state for personal information
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;

    // Check if the field being updated is 'dateOfBirth'
    if (name === 'dateOfBirth') {
      // Calculate age based on the new date of birth value
      const age = calculateAge(value);

      // Update the form state with the calculated age and formatted date of birth
      setFormState((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          age: age.toString(), // Convert age to string if necessary
          dateOfBirth: value,
        },
      }));
    } else {
      // Update other fields as usual
      setFormState((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          [name]: value,
        },
      }));
    }
  };

  // for passing file to the state
  const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0];
  
    // Check if the selected file type is allowed
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
    if (file && allowedFileTypes.includes(file.type)) {
      setFormState((prevState) => {
        const newState = { ...prevState };
  
        // Handle specific cases for each file type
        switch (fieldName) {
          case 'voters':
          case 'barangayCert':
          case 'certOfEmployment':
          case 'paySlip':
          case 'nonFillingtr':
          case 'businessPermit':
          case 'affSoloParent':
          case 'pwdid':
          case 'deathcert':
          case 'eSignature':
          case 'picture':
          case 'soloParentId':
            newState[fieldName][0].file = file;
            break;
          // Add more cases for other fields if needed
          default:
            // Handle any other cases or provide an error message
            alert(`Unhandled case for ${fieldName}`);
        }
  
        return newState;
      });
    } else {
      // Handle invalid file type (you can show an error message)
      alert(`Invalid file type for ${fieldName}. Only jpg, png, docx, and pdf are allowed.`);
      // You can optionally reset the input field
      event.target.value = '';
    }
  };   

  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
  
    if (name === 'age') {
      const updatedFamilyComposition = [...formState.familyComposition];
      const age = calculateAge(value);
      
      updatedFamilyComposition[index] = {
        ...updatedFamilyComposition[index],
        age: age.toString(),
        [name]: value,
      };
  
      setFormState((prevState) => ({
        ...prevState,
        familyComposition: updatedFamilyComposition,
      }));
    } else {
      setFormState((prevState) => {
        const updatedFamilyComposition = [...prevState.familyComposition];
        updatedFamilyComposition[index] = {
          ...updatedFamilyComposition[index],
          [name]: value,
        };
  
        return {
          ...prevState,
          familyComposition: updatedFamilyComposition,
        };
      });
    }
  };  

  // Add a new family member to the form state
  const handleAddFamilyMember = () => {
    setFormState((prevState) => ({
      ...prevState,
      familyComposition: [
        ...prevState.familyComposition,
        {
          name: '',
          age: '',
          sex: 'Male',
          relationShip: '',
          educationalAttainment: '',
          occupation: '',
          monthlyIncome: '',
        },
      ],
    }));
  };

  // Remove a family member from the form state
  const handleRemoveFamilyMember = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      familyComposition: prevState.familyComposition.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the form data before submitting
      console.log('Form Data:', formState);

      // Send POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/api/create-solo-parent-account', formState);
      alert(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return(
    <>
    {/* Form Start */}
    {showPopup && (
      <div className="success-popup" id="successPopup">
        <div className="popup-content">
          <div className="success-checkmark">
            <div className="check-icon">
              <img src={Success} alt='sucess' className='success-img'/>
            </div>
          </div>
          <p className="popup-message">Successfully Submitted!</p>
          <div className='popup-info'>
            <h3>castro, elizabeth a.</h3>
            <h4>Application No.: ABC-345678</h4>
            <h4>ID No.: 2023-000001</h4>
            <h4>Application Date: 11/08/2023</h4>
          </div>
          <button className="close-button" onClick={closePopup}>Close</button>
        </div>
      </div>
    )}
    <h3 className='form-banner-title'>Renew Application</h3>
    <form
      method='post'
      action=''
      onSubmit={handleSubmit}
      className='container register-section'
    >
      <div className='left form-w'>
        {/* Basic Information Start*/}
        <div className='basic-information'>
          <details open>
            <summary>I. Basic Information</summary>
            <div className='form'>
              <div id='form-status'></div>
              <label>
                Name (Pangalan)
                <div className='form-grid-2 mt'>
                  <input 
                    type='text' 
                    placeholder='Surname' 
                     
                    name='surName'
                    autoFocus=''
                    value={formState.surName} 
                    onChange={handlePersonalInfoChange}
                  />
                  <input 
                    type='text' 
                    placeholder='Given name' 
                     
                    name='givenName'
                    value={formState.givenName} 
                    onChange={handlePersonalInfoChange}
                  />
                  <input 
                    type='text' 
                    placeholder='Middle name' 
                     
                    name='middleName' 
                    id='middleName'
                    value={formState.middleName} 
                    onChange={handlePersonalInfoChange}
                  />
                  <input 
                    type='text' 
                    placeholder='Ext. Jr, Sr.' 
                    name='extension'
                    value={formState.extension} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </label>
              <label htmlFor='email-address'>
                Email (Sulatroniko)
                <input 
                  type='email' 
                  placeholder='Enter you email address' 
                  name='extension'
                  value={formState.email} 
                  style={{ width: 'calc(100% - 20px)' }} 
                  className='mt-i'
                  onChange={handlePersonalInfoChange}
                />
              </label>
              <label htmlFor='civilStatus'>
                Civil Status (Katayuang sibil)
                <div className='form-grid-2 mt'>
                  <div className='radio-item'>
                    <input 
                      type='checkbox' 
                      name='civilStatus'  
                      value='Single'
                      onChange={handlePersonalInfoChange}
                    />
                    <p>Single (Walang asawa)</p>
                  </div>
                  <div className='radio-item'>
                    <input 
                      type='checkbox' 
                      name='civilStatus' 
                      value='Annulled'
                      onChange={handlePersonalInfoChange}
                    />
                    <p>Annulled (Napawalang bisa)</p>
                  </div>
                  <div className='radio-item'>
                    <input 
                      type='checkbox' 
                      name='civilStatus' 
                      value='Separated'
                      onChange={handlePersonalInfoChange}
                    />
                    <p>Separated (Hiwalay)</p>
                  </div>
                  <div className='radio-item'>
                    <input 
                      type='checkbox' 
                      name='civilStatus' 
                      value='Widowed'
                      onChange={handlePersonalInfoChange}
                    />
                    <p>Widow/Widowed (Balo)</p>
                  </div>
                </div>
              </label>
              <div className='form-grid-2'>
                <label htmlFor='sex'>
                  Sex (Kasarian)
                  <select 
                    placeholder='Sex' 
                    name="sex" 
                     
                    className='mt-s'
                    value={formState.sex} 
                    onChange={handlePersonalInfoChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>
                <label htmlFor='age'>
                  Age (Edad)
                  <input
                    type='number'
                    readOnly
                    name='age'
                    className='mt-i'
                    value={formState.personalInfo.age}
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='date-of-birth'>
                  Date of Birth (Araw ng kapanganakan)
                  <input
                    type='date'
                    name='dateOfBirth'
                    className='mt-i'
                    value={formState.personalInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='place-of-birth'>
                  Place of Birth (Lugar ng kapanganakan)
                  <input 
                    type='text' 
                    placeholder='Ex: Laguna, Philippines' 
                    name='placeOfBirth' 
                    className='mt-i'
                    value={formState.placeOfBirth} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='religion'>
                  Religion (Relihiyon)
                  <input 
                    type='text' 
                    placeholder='Ex: Roman Catholic' 
                    name='religion' 
                    className='mt-i'
                    value={formState.religion} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='educational-attainment'>
                  Educational Attainment (Pagkamit ng edukasyon)
                  <select  
                    name="educationalAttainment" 
                     
                    className='mt-s'
                    value={formState.educationalAttainment} 
                    onChange={handlePersonalInfoChange}
                  >
                    <option value=''>Select Educational Attainment</option>
                    <option value='No Formal Education'>No Formal Education</option>
                    <option value='Elementary School'>Elementary School</option>
                    <option value='High School'>High School</option>
                    <option value='Vocational/Technical School'>Vocational/Technical School</option>
                    <option value='College (Undergraduate)'>College (Undergraduate)</option>
                    <option value='College (Graduate)'>College (Graduate)</option>
                    <option value='Postgraduate'>Postgraduate</option>
                    <option value='Other'>Other</option>
                  </select>
                </label>
              </div>
              <label htmlFor='present-address' className='form-grid-1'>
                Present Address (Kasalukuyang tirahan)
                <textarea 
                  rows='3' 
                  placeholder='Enter the address...'  
                  name='presentAddress' 
                   
                  className='mt-i'
                  value={formState.presentAddress} 
                  onChange={handlePersonalInfoChange}
                ></textarea>
              </label>
              <div className='form-grid-2'>
                <label htmlFor='mobile-no'>
                  Mobile No. (Numero ng mobile)
                  <input 
                    type='number' 
                    placeholder='Ex: +639123456789'  
                    name='mobileNumber' 
                    className='mt-i'
                    value={formState.mobileNumber} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='landline-no'>
                  Landline No. (Numero sa landline)
                  <input 
                    type='number' 
                    placeholder='Ex: 1234-5678'  
                    name='landlineNumber' 
                    className='mt-i'
                    value={formState.landlineNumber} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='profession'>
                  Profession (Propesyon)
                  <input 
                    type='text' 
                    placeholder='Ex: Writer'
                    name='profession' 
                    className='mt-i'
                    value={formState.profession} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='occupation'>
                  Occupation (Hanapbuhay/Trabaho)
                  <input 
                    type='text' 
                    placeholder='Ex: Journalist' 
                    name='occupation' 
                    className='mt-i'
                    value={formState.occupation} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='monhtly-income'>
                  Monthly Income (Buwanang kita)
                  <input 
                    type='number' 
                    placeholder='Ex: 15,000' 
                    name='monthlyIncome' 
                    className='mt-i'
                    value={formState.monthlyIncome} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
                <label htmlFor='employer-name'>
                  Name of Employer (Pangalan ng amo)
                  <input 
                    type='text' 
                    placeholder='Ex: John Doe'  
                    name='nameOfEmployer' 
                    className='mt-i'
                    value={formState.nameOfEmployer} 
                    onChange={handlePersonalInfoChange}
                  />
                </label>
              </div>
              <label htmlFor='employer-address' className='form-grid-1'>
                Employer/Company Address (Address ng Employer/Kumpanya)
                <textarea 
                  rows='3' 
                  placeholder='Enter the address...' 
                  name='employerAddress' 
                   className='mt-i'
                  value={formState.employerAddress} 
                  onChange={handlePersonalInfoChange}
                ></textarea>
              </label>
              <label htmlFor='contact-no' className='form-grid-1'>
                Contact No. (Numero ng telepono)
                <input 
                  type='number' 
                  placeholder='Ex: +639123456789' 
                  name='contactNumber' 
                  className='mt-i'
                  value={formState.contactNumber} 
                  onChange={handlePersonalInfoChange}
                />
              </label>
              {/* There is no names yet */}
              <div className='form-grid-2'>
                <label htmlFor='emergency-contact'>
                  Contact person in case of Emergency (Makipag-ugnayan sa tao sa kaso ng Emergency)
                  <input 
                    type='text' 
                    disabled 
                    readOnly 
                    placeholder='Ex: John Doe' 
                    id='' 
                    name='' 
                    className='mt-i'
                  />
                </label>
                {/* There is no names yet */}
                <label htmlFor='contact-no'>
                  Contact No. (Numero ng telepono)
                  <input 
                    type='number' 
                    placeholder='Ex: +639123456789' 
                    id='' 
                    name='' 
                    className='mt-i'
                  
                    />
                </label>
              </div>
            </div>
          </details>
        </div>
        {/* Basic information end */}

        {/* Family composition start */}
        <div className='family-composition'>
          <details open>
            <summary>II. Family Composition</summary>
            <div className='form'>
              <div id='form-status'></div>
              <div className='form-table'>
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
                    <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* Recursively adding rows */}
                  {formState.familyComposition.map((familyMember, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={familyMember.name}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="age"
                          value={familyMember.age}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        />
                      </td>
                      <td>
                        <select
                          name="sex"
                          value={familyMember.sex}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="relationShip"
                          value={familyMember.relationShip}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="status"
                          value={familyMember.status}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        />
                      </td>
                      <td>
                        <select
                          name="educationalAttainment"
                          value={familyMember.educationalAttainment}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        >
                          <option value="">Select Educational Attainment</option>
                          <option value="No Formal Education">No Formal Education</option>
                          <option value="Elementary School">Elementary School</option>
                          <option value="High School">High School</option>
                          <option value="Vocational/Technical School">Vocational/Technical School</option>
                          <option value="College (Undergraduate)">College (Undergraduate)</option>
                          <option value="College (Graduate)">College (Graduate)</option>
                          <option value="Postgraduate">Postgraduate</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="occupation"
                          value={familyMember.occupation}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="monthlyIncome"
                          value={familyMember.monthlyIncome}
                          onChange={(e) => handleFamilyMemberChange(index, e)}
                          
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleRemoveFamilyMember(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
              <div className='add-row'>
                <a onClick={handleAddFamilyMember}>Add row</a>
              </div>
            </div>
          </details>
        </div>
        {/* Family composition end */}

        {/* Reasons/Circumstances start */}
        <div className='reasons-circumstances'>
          <details open>
            <summary>III. Reasons/Circumstances of being a Solo Parent</summary>
            <div className='form'>
              <div id='form-status'></div>
              {/* There is no names yet */}
              <label htmlFor='reasons-circumstances-solo-parent'>
              <textarea 
                rows='5' 
                placeholder='Reasons/Circumstances of being a Solo Parent...' 
                id='' 
                name='' 
                className='mt-i'
              ></textarea>
              </label>
              <label htmlFor='accept-terms'>
                <div className='radio-item'>
                  <input 
                    type='checkbox' 
                    name='terms' 
                    id='terms' 
                    value='Accepted'
                  />
                  <p>
                    I have read this form, understood its contents and consent to the processing of my personal data. 
                    I understand that my consent does not preclude the existence of other criteria for lawful 
                    processing of personal data, and does not waive any of my rights under the Data Privacy Act of 2012 
                    and other applicable laws.
                  </p>
                </div>
              </label>
              <label>
                  Face Recognition
                  <div id='capture-container-renew'>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat='image/png'
                      style={{ width: '100%', height: '100%', marginTop: '12px' }}
                    />
                  </div>
                  <button onClick={captureImage} className='capture-btn'>
                    Capture
                  </button>
                  {capturedImage && (
                    <div>
                      <h2 className='captured-text'>Captured Image</h2>
                      <img src={capturedImage} alt='Captured' className='captured-image' />
                    </div>
                  )}
              </label>
            </div>
          </details>
        </div>
        {/* Reasons/Circumstances end */}

        {/* Uploading requirements start */}
        <div className='uploading-requirements'>
          <details open>
            <summary>IV. Uploading of Requirements</summary>
            <div className='form'>
              {/* There is no names yet */}
              <div className='form-grid-2'>
                <label>
                  Surrender old Solo Parent ID
                  <input 
                    type='file'
                    name='voters'
                    id='voters'
                    className='mt-i'
                    onChange={(e) => handleFileChange('soloParentId', e)}
                  />
                </label>
                <label>
                  Photocopy of Care Card or Voter’s ID/Verification (if available)
                  <input 
                    type='file'
                    name='voters'
                    id='voters'
                    className='mt-i'
                    onChange={(e) => handleFileChange('voters', e)}
                  />
                </label>
                <label>
                  Barangay Certificate
                  <input 
                    type='file'
                    name='barangayCert'
                    id='barangayCert'
                    className='mt-i'
                    onChange={(e) => handleFileChange('barangayCert', e)}
                  />
                </label>
                <label>
                  Photo copy of ITR or 1 month payslip (if employed)
                  <input 
                    type='file'
                    name='paySlip'
                    id='paySlip'
                    className='mt-i'
                    onChange={(e) => handleFileChange('paySlip', e)}
                  />
                </label>
                <label>
                  Affidavit of Non-Filling of ITR (not employed)
                  <input 
                    type='file'
                    name='nonFillingtr'
                    id='nonFillingtr'
                    className='mt-i'
                    onChange={(e) => handleFileChange('nonFillingtr', e)}
                  />
                </label>
                <label>
                  Photocopy of Business Permit (for business owner)
                  <input 
                    type='file'
                    name='businessPermit'
                    id='businessPermit'
                    className='mt-i'
                    onChange={(e) => handleFileChange('businessPermit', e)}
                  />
                </label>
                <label>
                  Affidavit of Being a Solo Parent (Legal Office - 3F Annex Bldg., City Hall)
                  <input 
                    type='file'
                    name='affSoloParent'
                    id='affSoloParent'
                    className='mt-i'
                    onChange={(e) => handleFileChange('affSoloParent', e)}
                  />
                </label>
              </div>
              <button type='submit' className='mt-i' onClick={showSuccessPopup}>Submit</button>
            </div>
          </details>
        </div>
        {/* Uploading requirements end */}
      </div>
    </form>
    </>
  );
}

export default Renew;