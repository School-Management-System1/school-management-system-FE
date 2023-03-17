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

const ChatMessagesAdmin = (props) => {
  // const [adminId,setAdminId]=useState('')
  const [allMessages, setAllMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showMessages, setShowMessages] = useState(false)
  const toggleShow = () => setShowMessages(!showMessages)
  const [user_id, setUserId] = useState('')
  const [username, setUsername] = useState('')

  // let username=JSON.parse(localStorage.getItem('username'))

  let adminId = JSON.parse(localStorage.getItem('id'))

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
        { sender: adminId, receiver: user_id, body: newMessage },
        config
      )
      setNewMessage('')
      const response = await axios.get(
        `http://localhost:5000/messages/${user_id}/${adminId}`,
        config
      )
      setAllMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleStudentMessage = async (user) => {
    setUserId(user._id)
    setUsername(user.username)
    toggleShow()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('access'))}`,
        },
      }
      axios
        .get(`http://localhost:5000/messages/${adminId}/${user._id}`, config)
        .then((res) => {
          setAllMessages(res.data)
          console.log(res.data)
          //   console.log('dd');
        })
    } catch (error) {
      console.log(error)
    }
    // await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '100px' }}>
      <div className='friends-box'>
        {props.users.map((user) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => handleStudentMessage(user)}
                style={{
                  backgroundColor: '#C9EEFF',
                  border: '1px solid black',
                  borderRadius: '10px',
                  width: '100%',
                  padding: '10px 5px',
                }}
              >
                Contact with {user.username}
              </button>
            </div>
          )
        })}
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
                    message.sender === adminId
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
                      {message.sender === adminId ? 'You' : username}
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

export default ChatMessagesAdmin
