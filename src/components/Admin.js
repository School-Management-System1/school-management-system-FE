import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'
import AddUser from './AddUser'
import AddCourse from './AddCourse'
import AssignCourse from './AssignCourse'
import SetMark from './SetMark'
import ChatMessagesAdmin from './ChatMessagesAdmin'

const Admin = () => {
  const [users, setUsers] = useState([])

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    )
  }
  const deleteUser = (deletedUserId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== deletedUserId)
    )
  }

  useEffect(() => {
    const fetchUserData = () => {
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
            return !user.isAdmin
          })
          console.log(res.data)
          setUsers(allUsers)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [])
  return (
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '15px',
        }}
      >
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
            All User
          </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <AddUser users={users} setUsers={setUsers} />
          <AddCourse />
          <AssignCourse />
          <SetMark />
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
                  User
                </th>
                <th style={{ maxWidth: '50px' }} scope='col'>
                  Edit / Delete
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users.map((user, idx) => {
                console.log(user['active'])
                return (
                  <tr key={idx} style={{ textAlign: 'center' }}>
                    <td style={{ maxWidth: '50px' }}>{user['username']}</td>
                    <td style={{ maxWidth: '50px' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '10px',
                          alignItems: 'center',
                        }}
                      >
                        <EditUser user={user} updateUser={updateUser} />
                        <DeleteUser user={user} deleteUser={deleteUser} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      <ChatMessagesAdmin users={users} />
    </div>
  )
}

export default Admin
