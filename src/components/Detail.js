import React, { useEffect, useState } from "react";
import axios from "axios";
import history from "./History";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const weird = () => {
    history.push("/");
  };

  useEffect(() => {
    const fetchData2 = async () => {
      setIsError(false);
      setIsLoading(true);
      const prod = `https://note-be.netlify.app/.netlify/functions/api/notes/${props.match.params.id}`;
      try {
        const response = await axios.get(prod);
        const note = response.data;
        setNotes(note);
        console.log(note);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData2();
  }, []);

  return (
    <div>
      <input type="button" value="Home" onClick={weird} />
      {isLoading ? (
        <div>Loading...</div>
      ) : notes === undefined ? (
        <div>Note's ID is not found</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          <h3>{notes.title}</h3>
          <h4>
            <pre>{notes.note}</pre>
          </h4>
          <small>{`Created at ${notes.createdAt}`}</small>
          <br />
          <small>{`Updated at ${notes.updatedAt}`}</small>
          <br />
          <br />
          <Link to={`/edit/${notes._id}`}>Edit</Link>
          <br />
          <Link to={`/delete/${notes._id}`}>Delete</Link>
        </div>
      )}
    </div>
  );
};

export default Detail;
