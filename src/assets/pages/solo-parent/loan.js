import React, { useState, useEffect } from "react";
import { useSession } from "./session";

function Loan() {
  useEffect(() => {
    document.title = "Apply for Loan | Solo Parent";
    window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newlyCreatedTicket, setNewlyCreatedTicket] = useState(null);
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      AccountId: session.Id,
      OwnerId: session.userId,
      //CreatedDate: '',
      ClientName: session.name,
      ContactId: session.soloParentFormData,
      CaseNumber: "",
      Type: "Loan",
      Status: "On Process",
      Subject: "Applying for Loan",
      Notes: "This is just a sample notes",
      ContactEmail: "sample@gmail.com",
    },
  ]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSubmission = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://solo-parent.vercel.app/api/solo-parent/create-user-ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: data[0].AccountId,
            ownerid: data[0].OwnerId,
            contactId: data[0].ContactId,
            //createdDate: data[0].CreatedDate,
            ticketType: data[0].Type,
            ticketStatus: data[0].Status,
            ticketSubject: data[0].Subject,
            notes: data[0].Notes,
            contactEmail: data[0].ContactEmail,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setNewlyCreatedTicket(result);
        setSelectedUser(null); // Clear selectedUser after successful submission
        alert("Successfully creating ticket!");
      } else {
        console.error("Failed to create a new ticket:", response.status);
        // Display user-friendly error message to the user
      }
    } catch (error) {
      console.error("Error creating a new ticket:", error);
      // Display user-friendly error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="ticketing-modal">
        <div className="ticketing">
          <fieldset>
            <legend>Ticketing Loan</legend>
            {newlyCreatedTicket ? (
              <>
                {data.map((user, index) => (
                  <div key={index} className="left">
                    {/* Display data from the data array */}
                    <strong>
                      Ticket ID: <span>{user.CaseNumber}</span>
                    </strong>
                    <strong>
                      Client Name: <span>{user.ClientName}</span>
                    </strong>
                    <strong>
                      Ticket Status: <span>{user.Status}</span>
                    </strong>
                    <strong>
                      Ticket Type: <span>{user.Type}</span>
                    </strong>
                    <strong>Result:</strong>
                    {/* <p className='result'>
                    {user.result}
                  </p> */}
                  </div>
                ))}
                {data.map((user, index) => (
                  <div key={index} className="right">
                    <strong>Notes</strong>
                    <p className="result">
                      {user.Notes || "Select a user to view notes"}
                    </p>
                    <i>
                      Contact Information:{" "}
                      <span>
                        <a href={`mailto:${user.ContactEmail}`}>
                          {user.ContactEmail}
                        </a>
                      </span>
                    </i>
                  </div>
                ))}
              </>
            ) : (
              <>
                {data.map((user, index) => (
                  <div key={index} className="left">
                    {/* Display data from the data array */}
                    <strong>
                      Ticket ID: <span>{user.CaseNumber}</span>
                    </strong>
                    <strong>
                      Client Name: <span>{user.ClientName}</span>
                    </strong>
                    <strong>
                      Ticket Status: <span>{user.Status}</span>
                    </strong>
                    <strong>
                      Ticket Type: <span>{user.Type}</span>
                    </strong>
                    <strong>Result:</strong>
                    {/* <p className='result'>
                    {user.result}
                  </p> */}
                  </div>
                ))}
                {data.map((user, index) => (
                  <div key={index} className="right">
                    <strong>Notes</strong>
                    <p className="result">
                      {user.Notes || "Select a user to view notes"}
                    </p>
                    <i>
                      Contact Information:{" "}
                      <span>
                        <a href={`mailto:${user.ContactEmail}`}>
                          {user.ContactEmail}
                        </a>
                      </span>
                    </i>
                  </div>
                ))}
              </>
            )}
          </fieldset>
          <button onClick={handleSubmission} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Loan;
