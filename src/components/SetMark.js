import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import Form from 'react-bootstrap/Form'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit'

const SetMark = () => {
  const [users, setUsers] = useState([])
  const [coursess, setCourses] = useState([])
  const [userId, setUserId] = useState('')
  const [courseId, setCourseId] = useState('')

  const handleUserChange = (event) => {
    let stdId = event.target.value
    setUserId(stdId)
  }

  const [basicModal, setBasicModal] = useState(false)

  const toggleShow = () => setBasicModal(!basicModal)

  const handleOptionChange = (event) => {
    let subId = event.target.value
    setCourseId(subId)
    // console.log(courseId);
    const fetchAllUsers = () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access')
            )}`,
          },
        }
        axios.get(`http://localhost:5000/users`, config).then((res) => {
          const allUsers = res.data.filter((user) => {
            const hasCourse = user.courses.some((course) => course._id == subId)
            return !user.isAdmin && hasCourse
          })
          setUsers(allUsers)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllUsers()
  }
  // const courseIdRef = useRef(courseId);

  const handleSetMark = async (e) => {
    e.preventDefault()

    // console.log(userInfo);
    try {
      let mark = {
        mark: e.target.mark.value,
      }
      console.log(mark)
      // console.log(JSON.parse(localStorage.getItem('access')));
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      const body = {
        userId,
        courseId,
      }
      // console.log(`http://localhost:5000/courses/${body.userId}/${body.courseId}/setMark`);
      await axios
        .patch(
          `http://localhost:5000/courses/${body.userId}/${body.courseId}/setMark`,
          mark,
          config
        )
        .then((res) => {
          console.log(res.data)
          swal('Done!', 'Mark assigned to user successfully', 'success')
          setUsers([...users, res.data])
          toggleShow()
        })
    } catch (error) {
      console.log(error)
    }
  }

  // fetch all courses
  const fetchAllCourses = () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios.get(`http://localhost:5000/courses`, config).then((res) => {
        setCourses(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllCourses()
  }, [])

  return (
    <div>
      <i
        style={{ color: 'green', cursor: 'pointer', fontSize: '25px' }}
        onClick={toggleShow}
        class='fa-solid fa-marker'
      ></i>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Assign Mark</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSetMark}>
              <MDBModalBody>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    <Form.Select
                      onChange={handleOptionChange}
                      aria-label='Default select example'
                    >
                      {coursess.map((course, idx) => {
                        return (
                          <option value={course._id}>{course.subject}</option>
                        )
                      })}
                    </Form.Select>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    <Form.Select
                      onChange={handleUserChange}
                      aria-label='Default select example'
                    >
                      {users.map((user, idx) => {
                        return <option value={user._id}>{user.username}</option>
                      })}
                    </Form.Select>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    <MDBInput
                      labelClass='col-form-label'
                      label='Mark'
                      name='mark'
                      type='text'
                    />
                  </div>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn>Assign</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default SetMark
