import { useEffect, useState } from "react";

export const useGetEmails = () => {
  const [emails, setEmails] = useState<string[]>([]);

  const getEmails = () => {
    fetch("https://tiagoporto.github.io/react-multi-select/email-list.json")
      .then((response) => response.json())
      .then((data) => {
        setEmails(data);
      });
  };

  useEffect(() => {
    getEmails();
  }, []);

  return emails;
};
