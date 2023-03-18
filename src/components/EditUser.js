import React, { ChangeEvent, useEffect, useState } from 'react'
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
  MDBCheckbox
} from 'mdb-react-ui-kit'

const EditUser = (props) => {
  const [basicModal, setBasicModal] = useState(false)
  const [isActive, setIsActive]= useState(false)

  const handleActiveChange=(e)=>{
    setIsActive(e.target.checked)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    let userInfo = {
      username: e.target.username.value,
      email: e.target.email.value,
      active: isActive,
    }
    console.log(userInfo);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios
        .patch(
          `http://localhost:5000/users/update/${props.user._id}`,
          userInfo,
          config
        )
        .then((res) => {
          props.updateUser(res.data)
          // window.location.reload();
          toggleShow(!basicModal)
          swal(`Poof! ${props.user.username} has been edited!`, {
            icon: 'success',
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleShow = () => setBasicModal(!basicModal)
  return (
    <>
      <i
        style={{ color: 'green', cursor: 'pointer' }}
        onClick={toggleShow}
        class='fa-solid fa-pen-to-square'
      ></i>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit User Info</MDBModalTitle>
              <MDBBtn
                onClick={toggleShow}
                className='btn-close'
                color='none'
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleEditSubmit}>
              <MDBModalBody
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <MDBInput
                  defaultValue={props.user.username}
                  labelClass='col-form-label'
                  label='Username'
                  name='username'
                />
                <MDBInput
                  defaultValue={props.user.email}
                  labelClass='col-form-label'
                  label='Email'
                  name='email'
                />
                <div style={{display:'flex'}}>
                <MDBCheckbox onChange={handleActiveChange} name='active' defaultChecked={props.user.active} id='flexCheckDefault' />
                <label class="form-check-label" for="flexCheckCheckedDisabled">Active</label>
                </div>
                
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn>Save Changes</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default EditUser
