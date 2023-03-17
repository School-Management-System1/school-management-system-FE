import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit'

const Footer = () => {
  const location = useLocation()
  if (location.pathname === '/signup' || location.pathname === '/signin') return

  return (
    <MDBFooter
      className='text-center text-white'
      style={{ backgroundColor: '#f1f1f1' }}
    >
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://web.facebook.com/mohammad.alfayome.7/'
            role='button'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-google' />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://www.instagram.com/mohammadalfayoume/'
            role='button'
          >
            <MDBIcon fab className='fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://www.linkedin.com/in/mohammad-alfayoume/'
            role='button'
          >
            <MDBIcon fab className='fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor='dark'
            color='link'
            floating
            size='lg'
            className='text-dark m-1'
            href='https://github.com/mohammadalfayoume'
            role='button'
          >
            <MDBIcon fab className='fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className='text-center text-dark p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2023 Copyright: Mohammad Alfayoume
      </div>
    </MDBFooter>
  )
}

export default Footer
