import React, { useEffect, useState } from "react";
import axios from "axios";
import history from "./History";

const Delete = (props) => {
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const weird = () => {
    history.push("/");
  };

  const weird2 = () => {
    history.push(`/detail/${props.match.params.id}`);
  };

  const deleteHandler2 = async () => {
    setIsDeleting(true);
    const dev = `http://localhost:9000/.netlify/functions/api/notes/delete/${note._id}`;
    const prod = `https://note-be.netlify.app/.netlify/functions/api/notes/delete/${note._id}`;
    try {
      await axios.delete(prod);
      console.log("sukses");
      weird();
    } catch (err) {
      console.log("gagal");
      setIsDeleting(false);
      setIsDeleteError(true);
      console.log(err);
    } finally {
      // weird();
    }
  };

  useEffect(() => {
    const fecthData = async () => {
      setIsFetchError(false);
      setIsDeleteError(false);
      setIsLoading(true);
      setIsDeleting(false);
      const fetchProd = `https://note-be.netlify.app/.netlify/functions/api/notes/${props.match.params.id}`;
      try {
        const res = await axios.get(fetchProd);
        const note = await res.data;
        console.log(note);
        setNote(note);
      } catch (error) {
        setIsFetchError(true);
      } finally {
        setIsLoading(false);
        // console.log(note)
      }
    };
    fecthData();
  }, []);

  return (
    <div>
      <input type="button" value="Home" onClick={weird} />
      {isLoading ? (
        <div>Loading...</div>
      ) : note === undefined ? (
        <div>Note's ID is not found</div>
      ) : isFetchError ? (
        <div>Error / timeout</div>
      ) : (
        <div>
          <input type="button" value="Back to detail page" onClick={weird2} />
          <h2>
            Are you sure you want to delete note with title "{note.title}" ?
          </h2>
          {isDeleting ? (
            <div>Deleting...</div>
          ) : (
            <div>
              <button onClick={deleteHandler2}>Sure</button>
              {isDeleteError && <div>Delete failed</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Delete;
