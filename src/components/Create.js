import React, { useState } from "react";
import axios from "axios";
import history from "./History";

const Create = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const weird = () => {
    history.push("/");
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const noteHandler = (e) => {
    setNote(e.target.value);
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setIsError(false);
      const dev = "http://localhost:9000/.netlify/functions/api/notes/add";
      const prod =
        "https://note-be.netlify.app/.netlify/functions/api/notes/add";
      await axios.post(prod, {
        title: title,
        note: note
      });
      await console.log("sukses");
      history.push("/");
    } catch (er) {
      setIsError(true);
      setIsSubmitting(false);
      console.log(er);
    } finally {
      // history.push("/");
    }
  };

  return (
    <div>
      <input type="button" value="Home" onClick={weird} />
      <form onSubmit={submitHandle}>
        <label>Title : </label>
        <input
          style={{ minWidth: "100%" }}
          required
          type="text"
          onChange={titleHandler}
        />
        <br />
        <label>Note : </label>
        <textarea
          style={{ minWidth: "100%", minHeight: "100px" }}
          required
          onChange={noteHandler}
        ></textarea>
        <br />
        {isSubmitting ? (
          <div>Submitting...</div>
        ) : (
          <div>
            <input type="submit" value="Submit" />
            {isError && <div>Submit failed</div>}
          </div>
        )}
      </form>
    </div>
  );
};

export default Create;
