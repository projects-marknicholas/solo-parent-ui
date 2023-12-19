# Its not working in this code

```
import React, { useState } from 'react';
import axios from 'axios';

function Sample() {
  const [formState, setFormState] = useState({
    personalInfo: {
      surName: '',
      givenName: '',
      middleName: '',
      extension: '',
      civilStatus: '',
      sex: '',
      age: '',
      dateOfBirth: '',
      placeOfBirth: '',
      religion: '',
      mobileNumber: '',
      idCardNumber: '',
      idCardType: '',
      landlineNumber: '',
      presentAddress: '',
      educationalAttainment: '',
      profession: '',
      occupation: '',
      monthlyIncome: '',
      nameOfEmployer: '',
      employerAddress: '',
      contactNumber: '',
    },
    familyComposition: [
      {
        name: '',
        age: '',
        sex: '',
        relationShip: '',
        educationalAttainment: '',
        occupation: '',
        monthlyIncome: '',
      },
    ],
  });

  // Update the form state for personal information
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update the form state for family members
  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      const updatedFamilyComposition = [...prevState.familyComposition];
      updatedFamilyComposition[index] = {
        ...updatedFamilyComposition[index],
        [name]: value,
      };
      return { ...prevState, familyComposition: updatedFamilyComposition };
    });
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
          sex: '',
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

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Information Section */}
      <h2>Personal Information</h2>
      <label>Surname: <input type="text" name="surName" value={formState.surName} onChange={handlePersonalInfoChange} /></label>

      <label>Given Name: <input type="text" name="givenName" value={formState.givenName} onChange={handlePersonalInfoChange} /></label>

      <label>Middle Name: <input type="text" name="middleName" value={formState.middleName} onChange={handlePersonalInfoChange} /></label>

      <label>Extension: <input type="text" name="extension" value={formState.extension} onChange={handlePersonalInfoChange} /></label>

      <label>Civil Status: <input type="text" name="civilStatus" value={formState.civilStatus} onChange={handlePersonalInfoChange} /></label>

      <label>Sex: <input type="text" name="sex" value={formState.sex} onChange={handlePersonalInfoChange} /></label>

      <label>Age: <input type="number" name="age" value={formState.age} onChange={handlePersonalInfoChange} /></label>

      <label>Date of Birth: <input type="date" name="dateOfBirth" value={formState.dateOfBirth} onChange={handlePersonalInfoChange} /></label>

      <label>Place of Birth: <input type="text" name="placeOfBirth" value={formState.placeOfBirth} onChange={handlePersonalInfoChange} /></label>

      <label>Religion: <input type="text" name="religion" value={formState.religion} onChange={handlePersonalInfoChange} /></label>

      <label>Mobile Number: <input type="tel" name="mobileNumber" value={formState.mobileNumber} onChange={handlePersonalInfoChange} /></label>

      <label>ID Card Number: <input type="text" name="idCardNumber" value={formState.idCardNumber} onChange={handlePersonalInfoChange} /></label>

      <label>ID Card Type: <input type="text" name="idCardType" value={formState.idCardType} onChange={handlePersonalInfoChange} /></label>

      <label>Landline Number: <input type="tel" name="landlineNumber" value={formState.landlineNumber} onChange={handlePersonalInfoChange} /></label>

      <label>Present Address: <input type="text" name="presentAddress" value={formState.presentAddress} onChange={handlePersonalInfoChange} /></label>

      <label>Educational Attainment: <input type="text" name="educationalAttainment" value={formState.educationalAttainment} onChange={handlePersonalInfoChange} /></label>

      <label>Profession: <input type="text" name="profession" value={formState.profession} onChange={handlePersonalInfoChange} /></label>

      <label>Occupation: <input type="text" name="occupation" value={formState.occupation} onChange={handlePersonalInfoChange} /></label>

      <label>Monthly Income: <input type="text" name="monthlyIncome" value={formState.monthlyIncome} onChange={handlePersonalInfoChange} /></label>

      <label>Name of Employer: <input type="text" name="nameOfEmployer" value={formState.nameOfEmployer} onChange={handlePersonalInfoChange} /></label>

      <label>Employer Address: <input type="text" name="employerAddress" value={formState.employerAddress} onChange={handlePersonalInfoChange} /></label>

      <label>Contact Number: <input type="tel" name="contactNumber" value={formState.contactNumber} onChange={handlePersonalInfoChange} /></label>

      {/* Family Composition Section */}
      <h2>Family Composition</h2>
      {formState.familyComposition.map((familyMember, index) => (
        <div key={index}>
          <label>
            Family Member Name:
            <input
              type="text"
              name={`name`}
              value={familyMember.name}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <label>
            Age:
            <input
              type="number"
              name={`age`}
              value={familyMember.age}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <label>
            Sex:
            <input
              type="text"
              name={`sex`}
              value={familyMember.sex}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <label>
            Relationship:
            <input
              type="text"
              name={`relationShip`}
              value={familyMember.relationShip}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <label>
            Educational Attainment:
            <input
              type="text"
              name={`educationalAttainment`}
              value={familyMember.educationalAttainment}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <label>
            Occupation:
            <input
              type="text"
              name={`occupation`}
              value={familyMember.occupation}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <label>
            Monthly Income:
            <input
              type="text"
              name={`monthlyIncome`}
              value={familyMember.monthlyIncome}
              onChange={(e) => handleFamilyMemberChange(index, e)}
            />
          </label>

          <button type="button" onClick={() => handleRemoveFamilyMember(index)}>
            Remove Family Member
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFamilyMember}>
        Add Family Member
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Sample;
```

# But working with this code

```
import axios from 'axios';

function Sample(){

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      personalInfo: {
        surName: "Razon",
        givenName: "Mark Nicholas",
        middleName: "L.",
        extension: "Jr",
        civilStatus: "Single",
        sex: "Male",
        age: 25,
        dateOfBirth: "1998-01-01",
        placeOfBirth: "Cityville",
        religion: "Christian",
        mobileNumber: "123-456-7890",
        idCardNumber: "ABC123",
        idCardType: "Driver's License",
        landlineNumber: "987-654-3210",
        presentAddress: "123 Main St, Cityville",
        educationalAttainment: "Bachelor's Degree",
        profession: "Software Developer",
        occupation: "Web Developer",
        monthlyIncome: 5000,
        nameOfEmployer: "Tech Company",
        employerAddress: "456 Tech St, Tech City",
        contactNumber: "555-1234",
      },
      familyComposition: [
        {
          name: "Jane Doe",
          age: 30,
          sex: "Female",
          relationShip: "Spouse",
          educationalAttainment: "Master's Degree",
          occupation: "Doctor",
          monthlyIncome: 7000,
        },
        {
          name: "Alice Doe",
          age: 10,
          sex: "Female",
          relationShip: "Child",
          educationalAttainment: "Elementary",
          occupation: "Student",
          monthlyIncome: 0,
        },
      ],
    };

    try {
      // Send POST request to the backend endpoint
      const response = await axios.post('http://localhost:3001/api/create-solo-parent-account', formData);

      // Handle the response as needed
      alert(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received. Request details:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error details:', error.message);
      }
      alert('Error submitting form. Check the console for details.');
    }
  };

  return(
    <>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default Sample;
```

# Issue with Nested State Updates in React Form

### Problem Description:
I am currently facing an issue with updating state in a React form that collects both personal information and family composition. The form uses the `useState` hook, and the state is structured with nested objects for personal information (personalInfo) and an array for family composition (familyComposition).

### Problem Details:
In the personal information section, I am using the `handlePersonalInfoChange` function to update the state. However, it seems that the state is not updating correctly, and when I log the form data before submission, the personal information fields are empty.

In the family composition section, I am using the `handleFamilyMemberChange` function to update the state for each family member. While this works for adding and removing members, there might be an issue with how I am updating the nested array.

### Code Samples:
I have provided two sets of code snippets. The first set represents the full React component, which is not working as expected. The second set, a simplified version of the form, is working when I submit the data directly without user input.

### Things I've Tried:
I have already checked for typos and ensured that the name attributes in the input fields match the structure of the state. I suspect that the issue might be related to how I am updating the state within nested structures.

### Expected Behavior:
I expect that when I input data into the form, the state should be updated correctly, and when I log the form data before submission, all fields should have the entered values.

### Additional Information:
- I have included the npm packages installed in my project.
- The backend server is set up and running without issues.
- I am using axios for making POST requests to the backend endpoint.
