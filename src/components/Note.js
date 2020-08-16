import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Note.css";
import { Link } from "react-router-dom";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)

  const getNotes = async () => {
    const dev = `http://localhost:9000/.netlify/functions/api/notes`;
    const prod = `https://note-be.netlify.app/.netlify/functions/api/notes`;
    const res = await axios.get(prod);
    const notes = await res.data;
    setNotes(notes);
    // return notes
  };

  useEffect(() => {
    const getNotes2 = async () => {
      setIsError(false)
      setIsLoading(true)
      const prod = `https://note-be.netlify.app/.netlify/functions/api/notes`;
      try {
        const res = await axios.get(prod);
        const notes = await res.data;
        setNotes(notes);
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false);
      }
      
      // return notes
    };
    getNotes2();
  }, []);

  // useEffect(() => {
  //   getNotes()
  //   console.log("sukses")
  // }, [loadFirst])

  const ngawur = async () => {
    setNotes([
      {
        title: "dummy",
        note: "dummy_too"
      },
      ...notes
    ]);
    try {
      const dev = "http://localhost:9000/.netlify/functions/api/notes/add";
      const prod =
        "https://note-be.netlify.app/.netlify/functions/api/notes/add";
      await axios.post(prod, {
        title: "dummy",
        note: "dummy_too"
      });
      await console.log("sukses");
    } catch (er) {
      console.log(er);
    } finally {
      // history.push('/')
    }
  };

  return (
    <div>
      {/* {console.log(notes)} */}
      <Link to="/create">Create</Link>
      {isError && <div>Fetch failed, please do try <a href="/">hard refresh</a></div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {notes.map((note) => (
            // <div className="card" key={note._id} onClick={() => {window.location = `https://4ybob.csb.app/detail/${note._id}`}}>
            <div className="card" key={note._id}>
              <div className="title">
                {note.title}
                <Link
                  style={{ display: "block", fontSize: "15px" }}
                  to={`/detail/${note._id}`}
                  id="detailLink"
                >
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
