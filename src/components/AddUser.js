import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
} from 'mdb-react-ui-kit'

const AddUser = (props) => {
  const [basicModal, setBasicModal] = useState(false)
  const toggleShow = () => setBasicModal(!basicModal)
  const [message, setMessage] = useState(false)

  const handleAddUser = (e) => {
    e.preventDefault()
    let userInfo = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      repeatPassword: e.target.repeatPassword.value,
    }
    // console.log(userInfo);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios
        .post(`http://localhost:5000/register`, userInfo, config)
        .then((res) => {
          console.log(res.data.message)
          swal('Done!', 'User added successfully', 'success')
          props.setUsers([...props.users, res.data.user])

          toggleShow()
        })
    } catch (error) {
      console.log(111)
      // setMessage(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div>
      <i
        style={{ color: 'green', cursor: 'pointer', fontSize: '25px' }}
        onClick={toggleShow}
        class='fa-solid fa-user-plus'
      ></i>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add User</MDBModalTitle>
              <MDBBtn
                onClick={toggleShow}
                className='btn-close'
                color='none'
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleAddUser}>
              <MDBModalBody
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <MDBInput
                  labelClass='col-form-label'
                  label='Username'
                  name='username'
                  type='text'
                />
                <MDBInput
                  labelClass='col-form-label'
                  label='Email'
                  name='email'
                  type='email'
                />
                <MDBInput
                  labelClass='col-form-label'
                  label='Password'
                  name='password'
                  type='password'
                />
                <MDBInput
                  labelClass='col-form-label'
                  label='Password'
                  name='repeatPassword'
                  type='password'
                />
              </MDBModalBody>

              <MDBModalFooter>
                <label>{message}</label>
                <MDBBtn onClick={toggleShow} color='secondary'>
                  Close
                </MDBBtn>
                <MDBBtn>ADD</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default AddUser
