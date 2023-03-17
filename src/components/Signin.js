import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    setisLoading(true)
    let userInfo = {
      email,
      password,
    }
    try {
      // console.log(userInfo);
      const res = await axios.post('http://localhost:5000/login', userInfo)
      console.log(res.data)
      if (res.data.error) {
        setMessage('Invalid email or password')
      }
      localStorage.setItem('access', JSON.stringify(res.data['accessToken']))
      localStorage.setItem('refresh', JSON.stringify(res.data['refreshToken']))
      localStorage.setItem('username', JSON.stringify(res.data['username']))
      localStorage.setItem('id', JSON.stringify(res.data['_id']))
      localStorage.setItem('email', JSON.stringify(res.data['email']))
      const config = {
        headers: {
          Authorization: `Bearer ${res.data['accessToken']}`,
        },
      }
      axios
        .get(`http://localhost:5000/users/${res.data['_id']}/`, config)
        .then((res) => {
          console.log(res.data)
          setRole(res.data.isAdmin)
          if (res.data.isAdmin) {
            setisLoading(false)
            navigate('/admin')
          }
          // else if (!res.data.active) {
          //   setisLoading(false)
          //   setMessage(
          //     'This account is inactive, please wait for the administrator to activate your account'
          //   )
          // }
          else {
            setisLoading(false)
            // navigate(`/users/${res.data._id}`)
            navigate(`/users`)
          }
        })
    } catch (err) {
      setisLoading(false)
      setMessage(err.response.data.error)
      // console.log(err.response.data.message);
    }
  }
  return (
    <MDBContainer
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MDBCard style={{ width: '120%', borderRadius: '25px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage
              src={require('./assets/signin.png')}
              alt='login form'
              className='rounded-start w-100'
            />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon
                  fas
                  // icon="fa fa-id-card"
                  style={{ color: '#ff6219' }}
                />
                <span className='h1 fw-bold mb-0'>{'School'}</span>
              </div>
              <h5
                className='fw-normal my-4 pb-3'
                style={{ letterSpacing: '1px' }}
              >
                Sign in Into your account
              </h5>
              <MDBInput
                wrapperClass='mb-4'
                label='Email address'
                // id="formControlLg"
                type='email'
                size='lg'
                name='email'
                value={email}
                onChange={handleEmailInput}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='formControlLg'
                type='password'
                size='lg'
                name='password'
                value={password}
                onChange={handlePasswordInput}
              />
              <label style={{ textAlign: 'center', marginBottom: '7px' }}>
                {message}
              </label>
              {isLoading ? (
                <div style={{ textAlign: 'center', alignContent: 'center' }}>
                  <Spinner animation='border' role='status'>
                    <span className='visually-hidden '>Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <MDBBtn
                  className='mb-4 px-5 bt'
                  color='dark'
                  size='lg'
                  type='submit'
                  onClick={handleSubmit}
                >
                  Login
                </MDBBtn>
              )}
              {/* <label
                style={{ textAlign: 'center', margin: '1vw', color: 'red' }}
              >{message}</label> */}
              <div style={{ textAlign: 'center' }}>
                <p>
                  Don't have an account? <a href='/signup'>Register Here</a>{' '}
                </p>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  )
}

export default Signin
