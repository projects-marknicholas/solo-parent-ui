import React from 'react';
import { Link } from 'react-router-dom';

// Functional component to display monetary support options
function FormStatus() {
  return (
    <>
      {/* Heading for the monetary support options */}
      <h3 className="form-banner-title">Monetary Support Options</h3>

      {/* Table to display different support options */}
      <div className="request-status-table">
        <table className="beautiful-table">
          <thead>
            <tr>
              <th>Get Monthly Allowance</th>
              <th>Apply for Loan</th>
              <th>Get Relief Distribution Application</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Link to navigate to the page for getting Monthly Allowance */}
              <td>
                <Link 
                  to='../solo-parent/monthly-allowance/' /*?origin=web&soloparent={soloparentid}&type=monthly allowance*/
                  target='_blank' 
                  className="allowance"
                >
                  Take me there
                </Link>
              </td>

              {/* Link to navigate to the page for applying for a Loan */}
              <td>
                <Link 
                  to='../solo-parent/loan/' /*?origin=web&soloparent={soloparentid}&type=loan application*/ 
                  target='_blank' 
                  className="relief"
                >
                  Take me there
                </Link>
              </td>

              {/* Link to navigate to the page for getting Relief Distribution Application */}
              <td>
                <Link 
                  to='../solo-parent/relief-distribution/' /*?origin=web&soloparent={soloparentid}&type=relief distribution application*/ 
                  target='_blank' 
                  className="loan"
                >
                  Take me there
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FormStatus;
