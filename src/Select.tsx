import style from "./Select.module.scss";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export const Select = () => {
  let initialEmails = useRef<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);

  const getEmails = () => {
    fetch("https://tiagoporto.github.io/react-multi-select/email-list.json")
      .then((response) => response.json())
      .then((data) => {
        setEmails(data);
        initialEmails.current = data;
      });
  };

  const filterEmails = (filter: string) => {
    setEmails(initialEmails.current.filter((email) => email.includes(filter)));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    filterEmails(event.target.value);
  };

  const handleClick = () => {
    console.log("clicked!!");
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <>
      <div className={style.fakeInput}>
        <div className={style.tag}>
          tiago@gmail.com
          <button className={style.removeButton} onClick={handleClick}>
            X
          </button>
        </div>

        <div className={`${style.tag} ${style.tagError}`}>
          tiago@gmail.com
          <button className={style.removeButton} onClick={handleClick}>
            X
          </button>
        </div>

        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter email..."
          className={style.input}
        />
      </div>
      <select name="emails" id="emails">
        {emails.map((email, index) => {
          return (
            <option value={email} key={index}>
              {email}
            </option>
          );
        })}
      </select>
    </>
  );
};
