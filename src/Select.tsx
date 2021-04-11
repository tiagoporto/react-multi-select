import React, { useEffect, useState } from "react";

export const Select = () => {
  const [emails, setEmails] = useState<string[]>([]);

  const getEmails = () => {
    fetch("/email-list.json")
      .then((response) => response.json())
      .then((data) => {
        setEmails(data);
      });
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <select name="emails" id="emails">
      {emails.map((email, index) => {
        return (
          <option value={email} key={index}>
            {email}
          </option>
        );
      })}
    </select>
  );
};
