import React, { useEffect, useState } from 'react'
import axios from 'axios'
import history from './History'
import {Link} from 'react-router-dom'

const DetailOld = props => {
const [notes, setNotes] = useState([])
const [loadFirst, setLoadFirst] = useState(true)

const weird = () => {
  history.push('/')
}

  const getNotes = async () => {
    const dev = `http://localhost:9000/.netlify/functions/api/notes/${props.match.params.id}`
    const prod = `https://note-be.netlify.app/.netlify/functions/api/notes/${props.match.params.id}`
    const res = await axios.get(prod)
    const notes = await res.data
    setNotes(notes)
    setLoadFirst(false)
    // return notes
  }

  useEffect(() => {
    loadFirst === true ? getNotes() : 
    console.log("zonk")
  })


  return (
    <div>
      <input type="button" value="Home" onClick={weird} />
      <h3>{notes.title}</h3>
      <h4>
        <pre>
        {notes.note}
        </pre>
      </h4>
      <small>{`Created at ${notes.createdAt}`}</small><br />
      <small>{`Updated at ${notes.updatedAt}`}</small><br />
      <br />
      <Link to={`/edit/${notes._id}`}>Edit</Link>
      <br />
      <Link to={`/delete/${notes._id}`}>Delete</Link>
    </div>
  );
}

export default DetailOld