import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from 'mdb-react-ui-kit'
import '../style/chat.css'

const ChatMessagesUser = () => {
  const [adminId, setAdminId] = useState('')
  const [allMessages, setAllMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showMessages, setShowMessages] = useState(false)
  const toggleShow = () => setShowMessages(!showMessages)

  // let username=JSON.parse(localStorage.getItem('username'))

  let userId = JSON.parse(localStorage.getItem('id'))

  const handleInputChange = (event) => {
    let message = event.target.value
    setNewMessage(message)
  }

  const handleSendMessage = async (event) => {
    event.preventDefault()
    // console.log('sss');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      await axios.post(
        'http://localhost:5000/messages',
        { sender: userId, receiver: adminId, body: newMessage },
        config
      )
      setNewMessage('')
      const response = await axios.get(
        `http://localhost:5000/messages/${userId}/${adminId}`,
        config
      )
      setAllMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdminMessage = () => {
    toggleShow()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios
        .get(`http://localhost:5000/messages/${adminId}/${userId}`, config)
        .then((res) => {
          setAllMessages(res.data)
          console.log(res.data)
          //   console.log('dd');
        })
    } catch (error) {
      console.log(error)
    }
  }
  const getAdminId = () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios.get(`http://localhost:5000/users`, config).then((res) => {
        const admin = res.data.find((user) => {
          return user.isAdmin
        })

        // console.log(allUsers);
        setAdminId(admin._id)
        // console.log(admin._id);
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAdminId()
    // console.log(JSON.parse(localStorage.getItem('id')));
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '100px' }}>
      <div className='friends-box'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleAdminMessage}
            style={{
              backgroundColor: '#C9EEFF',
              border: '1px solid black',
              borderRadius: '10px',
              width: '100%',
              padding: '10px 5px',
            }}
          >
            Contact with Admin
          </button>
        </div>
        {/* <div>
                Pysics
            </div>
            <div>
                Arabic
            </div> */}
      </div>
      {showMessages ? (
        <div
          className='chat-box'
          style={{
            maxHeight: '100px',
            overflowY: 'scroll',
            marginBottom: '200px',
          }}
        >
          {allMessages.map((message) => {
            return (
              <li className='d-flex justify-content-between mb-4'>
                <img
                  src={
                    message.sender === userId
                      ? 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1678984279~exp=1678984879~hmac=5c8d441bde29fa5dbc18cb043062c3f29daa9a31d998001245db70b399c9140c'
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  }
                  alt='avatar'
                  className='rounded-circle d-flex align-self-start me-3 shadow-1-strong'
                  width='60'
                />
                <MDBCard>
                  <MDBCardHeader className='d-flex justify-content-between p-3'>
                    <p className='fw-bold mb-0'>
                      {message.sender === userId ? 'You' : 'Admin'}
                    </p>
                    <p className='text-muted small mb-0'>
                      <MDBIcon far icon='clock' />
                      {message.timestamp.slice(0, 16)}
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className='mb-0'>{message.body}</p>
                  </MDBCardBody>
                </MDBCard>
              </li>
            )
          })}
          <form onSubmit={handleSendMessage}>
            <li className='bg-white mb-3'>
              <MDBTextArea
                value={newMessage}
                onChange={handleInputChange}
                label='Message'
                id='textAreaExample'
                rows={4}
              />
            </li>
            <MDBBtn type='submit' color='info' rounded className='float-end'>
              Send
            </MDBBtn>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ChatMessagesUser
