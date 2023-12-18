import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';
import Home1 from '../img/home-1.webp';
import Home2 from '../img/home-2.webp';
import Home3 from '../img/home-3.webp';
import Home4 from '../img/home-4.webp';
import Home5 from '../img/home-5.webp';
import Batas from '../img/batas.jpg';
import Wavy from '../img/wavy.svg';
import SoloParentId from '../img/solo-parent-id.jpg';

function Home() {
  useEffect(() => {
    document.title = "Solo Parent's Application System";
    window.scrollTo(0, 0);
  }, []);

  // for animation of hero section
  const data = [
    {
      image: Home1,
      text: {
        h3: 'Solo Parent Act 1',
        h1: "Solo Parent's Application System 1",
        p: 'Being a single parent is not a life full of struggles, but a journey for the strong. 1',
      },
    },
    {
      image: Home2,
      text: {
        h3: 'Solo Parent Act 2',
        h1: "Solo Parent's Application System 2",
        p: 'Being a single parent is not a life full of struggles, but a journey for the strong. 2',
      },
    },
    {
      image: Home3,
      text: {
        h3: 'Solo Parent Act 3',
        h1: "Solo Parent's Application System 3",
        p: 'Being a single parent is not a life full of struggles, but a journey for the strong. 3',
      },
    },
    {
      image: Home4,
      text: {
        h3: 'Solo Parent Act 4',
        h1: "Solo Parent's Application System 4",
        p: 'Being a single parent is not a life full of struggles, but a journey for the strong. 4',
      },
    },
    {
      image: Home5,
      text: {
        h3: 'Solo Parent Act 5',
        h1: "Solo Parent's Application System 5",
        p: 'Being a single parent is not a life full of struggles, but a journey for the strong. 5',
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // setting interval to 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  // change the text value together with the hero image
  const currentData = data[currentIndex];
  const uniqueKey = `${currentData.text.h3}-${currentData.text.h1}-${currentData.text.p}`;

  // setting up the actual date
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <Navbar />
      <div className='home-page'>
        <div className='hero-section'>
          {data.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={`hero-img-${index}`}
              className={`hero-img ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
          <div key={uniqueKey} className='hero-description'>
            <h3>{currentData.text.h3}</h3>
            <h1>{currentData.text.h1}</h1>
            <p>{currentData.text.p}</p>
          </div>
        </div>
        <div className='date-section'>
          <div className='left'></div>
          <div className='middle'>{currentDate}</div>
          <div className='right'></div>
        </div>
        <div className='republic-act-section container'>
          <div className='republic-item'>
            <div className='rep-act'>
              <h1>Republic Act 8972</h1>
              <p>
              The Solo Parents Welfare Act of 2000 declares that it is the policy of the State to promote the family as the foundation of the nation, strengthen its solidarity and ensure its total development
              To enhance the social functioning of solo parents to be able to fulfill their roles and responsibilities to their families and communities which is focused on individual’s resiliency, development and participation through the provision of a comprehensive psychosocial intervention for solo parents and their children.
              The Psychosocial Services for Solo Parents is part of the Comprehensive Program for Solo Parents and their Children which refers to a series of interventions geared towards the enhancement of their role performance, through the resolution of multiple problems/difficulties as a consequence of being a solo parent. These includes economic pressure, social acceptability, performance of parental responsibilities, need for resources and support services.
              The service is a response to the emerging needs of the increasing population of solo parents particularly those who are at risk and disadvantaged. There are different interventions that address the major problems encountered by solo parents to be able to cope with solo parenting.
              The project shall be a partnership between and among the DSWD - Social Technology Bureau, the Regional Offices and the Local Government Units where the project will be implemented.
              </p>
            </div>
          </div>
          <div className='republic-item'>
            <div className='rep-act'>
              <h3>BATAS NA!</h3>
              <img src={Batas} alt='nasa-batas-na'/>
            </div>
          </div>
        </div>
        <div className='benefits-section'>
          <div className='container'>
            <div className='left'>
              <img src={SoloParentId} alt='solo-parent-id'/>
            </div>
            <div className='right'>
              <h1>Before applying for a Solo Parent ID, prepare the following documents</h1>
              <ul>
                <li>
                  <h3>📋Barangay Certificate:</h3>
                  <p>
                    Get a barangay certificate to prove that you’ve resided in your barangay for the 
                    last six months and to certify your situation as a single parent. Bring a valid 
                    government-issued ID to verify your home address and cash for the processing fee.
                  </p>
                </li>
                <li>
                  <h3>📋Certification from Barangay Captain:</h3>
                  <p>
                    Get this document from the Barangay Hall where you reside. The certificate must 
                    indicate your status as a solo parent.
                  </p>
                </li>
                <li>
                  <h3>📋Proof of Financial Status:</h3>
                  <p>
                    If you’re an employed solo parent, secure a copy of your Income Tax Return (ITR) 
                    through your company’s HR Department or the Bureau of Internal Revenue (BIR).
                  </p>
                </li>
                <li>
                  <h3>📋Supporting Documents/Certificates:</h3>
                  <p>
                    Prepare documents and certificates that can prove your solo parent status. 
                    This can be a spouse’s death certificate, declaration of nullity of marriage, 
                    or medical certificates.
                  </p>
                </li>
                <li>
                  <h3>📋Birth Certificate/s of Your Child/Children:</h3>
                  <p>
                    You may request this online from the PSA. Settle the payment and arrange for it to 
                    be delivered to your home.
                  </p>
                </li>
                <li>
                  <h3>📋Filled-Out Solo Parent ID Application Form:</h3>
                  <p>
                    Get a copy of this form from your city or province’s social welfare and development office. 
                    Prepare one 2x2 ID photo as well.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='date-section'>
          <div className='left'></div>
          <div className='middle'>Frequently Asked Questions (FAQs)</div>
          <div className='right'></div>
        </div>
        <div className='frequently-asked-questions container'>
          <p className='fqa-desc'>For further information or questions or even unquiries, please reach our contact supper <Link to='/contact-us'>Contact Us</Link></p>
          <div className='view-details'>
            <details>
              <summary>Is a Solo Parent ID accepted as a valid ID?</summary>
              <p>
                The Solo Parent ID is not often accepted as a valid form of identification when dealing 
                with some government and non-government entities like banks as it is considered more of a privilege ID. 
                However, a Solo Parent ID is accepted as a valid id when applying for civil service exam, and 
                national id applications.
              </p>
            </details>
            <details>
              <summary>How long must I wait before receiving my Solo Parent ID?</summary>
              <p>
                Because of the time required to conduct assessments and evaluate the solo parent application, 
                the DSWD states that you may have to wait up to 30 days from the date of your submission.
              </p>
            </details>
            <details>
              <summary>What is the validity of the Solo Parent ID?</summary>
              <p>
                The ID card is valid for one year and so are the benefits that come along with it.
              </p>
            </details>
            <details>
              <summary>Can I Renew a Solo Parent ID?</summary>
              <p>
                You can renew your solo parent ID at the DSWD office in your municipality or LGU office once it has expired.
              </p>
            </details>
            <details>
              <summary>Is there a tax break for single parents?</summary>
              <p>
                No, single parents are not eligible for tax exemption. However, with a valid Solo Parent ID, 
                they are entitled to a 10% discount on basic necessities such as milk and medicines.
              </p>
            </details>
            <details>
              <summary>Is the Solo Parent ID only for working parents?</summary>
              <p>
                No, the Solo Parent ID is available to any parent, working or unemployed, 
                who meets the requirements of the R.A. No. 8972 or the Solo Parents Welfare Act of 2000.
              </p>
            </details>
            <details>
              <summary>Are single parents eligible for maternity leave?</summary>
              <p>
                Yes. It shall cover 105 days of paid maternity leave for live births. 
                Additional 15 days will be granted to single parents as stipulated by R.A. No. 8972, 
                with the possibility to extend for an additional 30 days leave without pay.
              </p>
            </details>
            <details>
              <summary>I'm a stay-at-home mom. Can I still apply for a Solo Parent ID?</summary>
              <p>
                Yes. Stay-at-home moms and dads can apply for a Solo Parent ID and avail of services to improve their 
                skills, which they can use to generate income. The Solo Parent ID can be granted to any parent, 
                employed or unemployed, as long as they meet the other qualifications.
              </p>
            </details>
            <details>
              <summary>Can solo parents automatically get financial assistance from the government for their medical bills?</summary>
              <p>
                Solo parents can seek financial assistance for their medical bills through the city or 
                municipal social welfare. However, the reimbursement or discount shall depend on the 
                local government’s policies. Remember that financial aid may differ from one city to another, 
                and reimbursements may take time.
              </p>
            </details>
            <details>
              <summary>Why are employed parents required to submit an ITR upon application for a Solo Parent ID?</summary>
              <p>
                The ITR reflects every employee's income annually. Solo parents whose income 
                falls below the poverty threshold may be entitled to a help package from the NEDA.
              </p>
            </details>
            <details>
              <summary>What’s the period before someone can be declared a single parent due to abandonment?</summary>
              <p>
                From one year, it has been reduced to six months under the Expanded Solo Parents Welfare Act.
              </p>
            </details>
          </div>
          <div className='conclusion'>
            <h1>Conclusion</h1>
            <p>
              Being a single parent in the Philippines is tough, especially in the current economic climate. 
              The benefits of the Solo Parents Welfare Act of 2000, however, make being a solo parent somewhat easier. 
              These benefits include discounts on groceries, free tuition, and housing assistance. However, 
              in order to get these benefits, you must first obtain a Solo Parent ID from the Department of 
              Social Welfare and Development. The process is simple and only takes a few minutes. 
              So if you are a solo parent, be sure to get your ID today!
            </p>
          </div>
        </div>
        <img src={Wavy} alt='wavy' className='wavy'/>
        <div className='wavy-banner'>
          <h1>Register an account today</h1>
          <Link to='/register'>Take me there</Link>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
