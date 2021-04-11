import style from "./MultiSelect.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useGetEmails } from "./useGetEmails";

interface Emails {
  selected: string[];
  filtered: string[];
}

export const Select = () => {
  let initialEmails = useGetEmails();
  const [emails, setEmails] = useState<Emails>({ selected: [], filtered: [] });

  const filterEmails = (filter: string) => {
    const toRemove = new Set(emails.selected);

    const filtered = initialEmails
      .filter((email) => email.includes(filter))
      .filter((emails) => !toRemove.has(emails));
    setEmails((prevState) => ({ ...prevState, filtered }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    filterEmails(event.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const filtered = emails.filtered.filter(
      (filteredEmail) => filteredEmail !== event.target.value
    );
    const selected = [...emails.selected, event.target.value];

    setEmails((prevState) => ({
      ...prevState,
      filtered,
      selected,
    }));
  };

  const removeSelected = (email: string) => () => {
    let filtered = emails.filtered;
    if (initialEmails.find((email) => email)) {
      filtered = [...emails.filtered, email];
    }

    const selected = emails.selected.filter(
      (filteredEmail) => filteredEmail !== email
    );

    setEmails((prevState) => ({
      ...prevState,
      selected,
      filtered,
    }));
  };

  useEffect(() => {
    setEmails((prevState) => ({ ...prevState, filtered: initialEmails }));
  }, [initialEmails]);

  return (
    <>
      <div className={style.fakeInput}>
        {emails.selected.map((email, index) => {
          return (
            <div className={style.tag} key={index}>
              {email}
              <button
                className={style.removeButton}
                onClick={removeSelected(email)}
              >
                X
              </button>
            </div>
          );
        })}
        {/*

        <div className={`${style.tag} ${style.tagError}`}>
          tiago@gmail.com
          <button className={style.removeButton} onClick={handleClick}>
            X
          </button>
        </div> */}

        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter email..."
          className={style.input}
        />
      </div>

      <select name="emails" id="emails" onChange={handleSelect}>
        <option value=""></option>
        {emails.filtered.map((email, index) => {
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
