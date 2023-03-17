import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/signup.css'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const [message, setMessage] = useState('')

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
  }
  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }
  const handleConfirmPassInput = (e) => {
    setRepeatPassword(e.target.value)
  }

  const handleSubmit = async () => {
    let userInfo = {
      username,
      email,
      password,
      repeatPassword,
    }
    try {
      // console.log(userInfo);
      const response = await axios.post(
        'http://localhost:5000/register',
        userInfo
      )
      if (response.data.message === 'User registered successfully.') {
        setIsError(false)
        setMessage('User registered successfully!')
      } else {
        setMessage('User registered faild!')
      }
      console.log(response.data.message)
    } catch (err) {
      setIsError(true)
      console.log(err)
      setMessage(err.response.data.message)
    }
  }

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              style={{ justifyContent: 'center' }}
              md='10'
              lg='6'
              className='order-2 order-lg-1 d-flex flex-column align-items-center'
            >
              <p classNAme='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>
                Sign up
              </p>

              <div className='d-flex flex-row align-items-center mb-4 '>
                <MDBIcon fas icon='user me-3' size='lg' />
                <MDBInput
                  label='Your Name'
                  id='form1'
                  type='text'
                  value={username}
                  className='w-100'
                  onChange={handleUsernameInput}
                />
              </div>

              <div className='d-flex flex-row align-items-center mb-4'>
                <MDBIcon fas icon='envelope me-3' size='lg' />
                <MDBInput
                  label='Your Email'
                  id='form2'
                  value={email}
                  onChange={handleEmailInput}
                  type='email'
                />
              </div>

              <div className='d-flex flex-row align-items-center mb-4'>
                <MDBIcon fas icon='lock me-3' size='lg' />
                <MDBInput
                  label='Password'
                  id='form3'
                  value={password}
                  onChange={handlePasswordInput}
                  type='password'
                />
              </div>

              <div className='d-flex flex-row align-items-center mb-4'>
                <MDBIcon fas icon='key me-3' size='lg' />
                <MDBInput
                  label='Repeat your password'
                  id='form4'
                  value={repeatPassword}
                  onChange={handleConfirmPassInput}
                  type='password'
                />
              </div>
              {isError ? (
                <label
                  style={{
                    borderRadius: '15px',
                    marginBottom: '5px',
                    textAlign: 'center',
                    scale: '0.9',
                    padding: '3px 5px',
                    backgroundColor: '#EB455F',
                  }}
                >
                  {message}
                </label>
              ) : (
                <label
                  style={{
                    borderRadius: '15px',
                    marginBottom: '5px',
                    textAlign: 'center',
                    scale: '0.9',
                    padding: '7px 10px',
                    backgroundColor: '#B6FFCE',
                  }}
                >
                  {message}
                </label>
              )}

              <MDBBtn
                type='submit'
                onClick={handleSubmit}
                className='mb-4'
                size='lg'
              >
                Register
              </MDBBtn>
              <div>
                <p>
                  Do you have an account? <a href='/signin'>Sign In</a>
                </p>
              </div>
            </MDBCol>

            <MDBCol
              md='10'
              lg='6'
              className='order-1 order-lg-2 d-flex align-items-center'
            >
              <MDBCardImage src={require('./assets/signup.png')} fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

export default Signup
