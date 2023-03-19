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
const AddCourse = (props) => {
  const [basicModal, setBasicModal] = useState(false)
  const toggleShow = () => setBasicModal(!basicModal)
  // const [courses, setCourses] = useState([])

  const handleAddCourse = (e) => {
    e.preventDefault()
    let userInfo = {
      subject: e.target.subject.value,
      passMark: e.target.passMark.value,
    }
    // console.log(userInfo);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios
        .post(`http://localhost:5000/courses/addCourse`, userInfo, config)
        .then((res) => {
          console.log(res.data.message)
          swal('Done!', 'Course added successfully', 'success')
          props.setCourses([...props.courses,res.data.course])
          // setCourses([...courses, res.data.course])
          toggleShow()
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <i
        style={{ color: 'green', cursor: 'pointer', fontSize: '25px' }}
        onClick={toggleShow}
        class='fa-solid fa-book-medical'
      ></i>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Course</MDBModalTitle>
              <MDBBtn
                onClick={toggleShow}
                className='btn-close'
                color='none'
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleAddCourse}>
              <MDBModalBody
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <MDBInput
                  labelClass='col-form-label'
                  label='Subject'
                  name='subject'
                  type='text'
                />
                <MDBInput
                  labelClass='col-form-label'
                  label='Pass Mark'
                  name='passMark'
                  type='number'
                />
              </MDBModalBody>

              <MDBModalFooter>
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

export default AddCourse
