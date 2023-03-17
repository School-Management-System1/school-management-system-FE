import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import ChatMessagesUser from './ChatMessagesUser'

const UserPage = () => {
  // const { id } = useParams()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    courses: [],
  })
  const id = JSON.parse(localStorage.getItem('id'))
  useEffect(() => {
    async function fetchUserData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access')
            )}`,
          },
        }
        const response = await axios.get(
          `http://localhost:5000/users/${id}`,
          config
        )
        const data = response.data
        // console.log(data['courses']);
        setUserData({
          username: data['username'],
          email: data['email'],
          courses: data['courses'],
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [])
  return (
    <div>
      {/* <ChatMessages/> */}

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '50px',
          marginTop: '20px',
        }}
      >
        <div>
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
              User Information
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MDBTable
              striped
              hover
              style={{ maxWidth: '60%', borderRadius: '15px' }}
            >
              <MDBTableHead dark>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ maxWidth: '50px' }} scope='col'>
                    Username
                  </th>
                  <th style={{ maxWidth: '50px' }} scope='col'>
                    Email
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr style={{ textAlign: 'center' }}>
                  <td style={{ maxWidth: '50px' }}>{userData['username']}</td>
                  <td style={{ maxWidth: '50px' }}>{userData['email']}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>

        <div>
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
              Student Courses
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MDBTable
              striped
              hover
              style={{ maxWidth: '60%', borderRadius: '15px' }}
            >
              <MDBTableHead dark>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ maxWidth: '50px' }} scope='col'>
                    Subjects
                  </th>
                  <th style={{ maxWidth: '50px' }} scope='col'>
                    Pass Mark
                  </th>
                  <th style={{ maxWidth: '50px' }} scope='col'>
                    Mark
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {userData['courses'].map((course) => {
                  return (
                    <tr style={{ textAlign: 'center' }}>
                      <td style={{ maxWidth: '50px' }}>{course['subject']}</td>
                      <td style={{ maxWidth: '50px' }}>{course['passMark']}</td>
                      <td style={{ maxWidth: '50px' }}>{course['mark']}</td>
                    </tr>
                  )
                })}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
        {/* ddddddddddddddddddddd */}
        <ChatMessagesUser />
      </div>
    </div>
  )
}

export default UserPage
