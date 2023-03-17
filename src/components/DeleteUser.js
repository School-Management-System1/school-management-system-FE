import React from 'react'
import swal from 'sweetalert'
import axios from 'axios'

const DeleteUser = (props) => {
  const openDeleteAlert = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem('access')
              )}`,
            },
          }
          axios
            .delete(
              `http://localhost:5000/users/delete/${props.user._id}`,
              config
            )
            .then((res) => {
              swal(`Poof! ${props.user.username} has been deleted!`, {
                icon: 'success',
              })
              console.log(res.data.message)
              props.deleteUser(props.user._id)
            })
        } catch (error) {
          console.log(error)
        }
      } else {
        swal(`${props.user.username} is safe!`)
      }
    })
  }

  return (
    <div>
      <i
        style={{ color: '#DF2E38', cursor: 'pointer' }}
        onClick={openDeleteAlert}
        class='fa-solid fa-trash'
      ></i>
    </div>
  )
}

export default DeleteUser
