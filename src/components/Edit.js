import React, { useState, useEffect } from "react";
import axios from "axios";
import history from "./History";

const Edit = (props) => {
  const [title, setTitle] = useState();
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const weird = () => {
    history.push("/");
  };

  const weird2 = () => {
    history.push(`/detail/${props.match.params.id}`);
  };

  const sendEdited2 = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dev = `http://localhost:9000/.netlify/functions/api/notes/edit/${props.match.params.id}`;
    const prod = `https://note-be.netlify.app/.netlify/functions/api/notes/edit/${props.match.params.id}`;
    try {
      await axios.put(prod, {
        title: title,
        note: note
      });
      console.log("sukses");
      weird();
    } catch (err) {
      console.log("gagal");
      setIsSubmitting(false);
      setIsSubmitError(true);
      console.log(err);
    } finally {
      // weird();
    }
  };

  useEffect(() => {
    const fecthData = async () => {
      setIsFetchError(false);
      setIsSubmitError(false);
      setIsLoading(true);
      setIsSubmitting(false);
      const fetchProd = `https://note-be.netlify.app/.netlify/functions/api/notes/${props.match.params.id}`;
      try {
        const res = await axios.get(fetchProd);
        const note = await res.data;
        console.log(note);
        setTitle(note.title);
        setNote(note.note);
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
      ) : title === undefined ? (
        <div>Note's ID is not found</div>
      ) : isFetchError ? (
        <div>Error / timeout</div>
      ) : (
        <div>
          <input type="button" value="Back to detail page" onClick={weird2} />
          <form onSubmit={sendEdited2}>
            <label>Title : </label>
            <input
              style={{ minWidth: "100%" }}
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label>Note : </label>
            <textarea
              style={{ minWidth: "100%", minHeight: "100px" }}
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <br />
            {isSubmitting ? (
              <div>Submitting...</div>
            ) : (
              <div>
                <input type="submit" value="Submit" />
                {isSubmitError && <div>Submit failed</div>}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
