import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  if (location.pathname === '/signup' || location.pathname === '/signin') return
  const handleLogOut = () => {
    localStorage.removeItem('access')
    navigate('/signin')
  }
  const handleLogIn = () => {
    navigate('/signin')
  }
  // console.log(JSON.parse(localStorage.getItem('access')));

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Navbar.Brand href='/'>School</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          {JSON.parse(localStorage.getItem('access')) ? (
            <button
              onClick={handleLogOut}
              style={{
                backgroundColor: '#FBFBFB',
                border: 'none',
                color: 'red',
              }}
            >
              Logout
            </button>
          ) : location.pathname !== '/' ? (
            <button
              onClick={handleLogIn}
              style={{
                backgroundColor: '#FBFBFB',
                border: 'none',
                color: 'red',
              }}
            >
              LogIn
            </button>
          ) : (
            ''
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
