import React, { useState, useEffect } from 'react'
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
} from 'mdb-react-ui-kit'

const AssignCourse = () => {
  const [users, setUsers] = useState([])
  const [coursess, setCourses] = useState([])
  const [userId, setUserId] = useState('')
  const [courseId, setCourseId] = useState('')

  const handleUserChange = (e) => {
    let stdId = e.target.value
    setUserId(stdId)
    // console.log(userId);
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
            return !user.isAdmin && !hasCourse
          })

          // console.log(allUsers);
          setUsers(allUsers)
          // console.log(users);
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllUsers()
  }

  const handleAssignCourse = async (e) => {
    e.preventDefault()

    try {
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
      console.log(
        `http://localhost:5000/courses/${body.userId}/${body.courseId}/assign`
      )
      await axios
        .post(
          `http://localhost:5000/courses/${body.userId}/${body.courseId}/assign`,
          config
        )
        .then((res) => {
          console.log(res.data.message)
          setUsers([...users, res.data.user])
          swal('Done!', 'Course assigned to user successfully', 'success')
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
        // console.log(res.data);
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
        class='fa-solid fa-book-open-reader'
      ></i>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Assign Course To Student</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleAssignCourse}>
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
                      defaultValue={courseId}
                    >
                      <option selected></option>
                      {coursess.map((course, idx) => {
                        return (
                          <option key={idx} value={course._id}>
                            {course.subject}
                          </option>
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
                      defaultValue={userId}
                    >
                      <option selected></option>
                      {users.map((user, idx) => {
                        return (
                          <option key={idx} value={user._id}>
                            {user.username}
                          </option>
                        )
                      })}
                    </Form.Select>
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

export default AssignCourse
