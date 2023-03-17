import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit'
import '../style/main.css'

const Main = () => {
  return (
    <div>
      <div className='first-div'>
        <h2 style={{ color: 'white' }}>School Management System</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href='/signup' className='b'>
            Signup Here
          </a>
          <a href='/signin' className='b'>
            Signin Here
          </a>
        </div>
      </div>
      <div className='second-div'>
        <h2>Services We Offer</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <MDBCard style={{ width: '300px' }}>
            <MDBCardImage
              src='https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
              alt='...'
              position='top'
            />
            <MDBCardBody>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard style={{ width: '300px' }}>
            <MDBCardImage
              src='https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'
              alt='...'
              position='top'
            />
            <MDBCardBody>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard style={{ width: '300px' }}>
            <MDBCardImage
              src='https://images.unsplash.com/photo-1588072432904-843af37f03ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
              alt='...'
              position='top'
            />
            <MDBCardBody>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  )
}

export default Main
