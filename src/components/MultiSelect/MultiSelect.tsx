import style from "./MultiSelect.module.scss";
import React, {
  ChangeEvent,
  createRef,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useGetEmails } from "./useGetEmails";
import debounce from "debounce";
import { useLayer } from "react-laag";
import cx from "classnames";
import { validateEmail } from "../../utils/validations";

interface Emails {
  selected: string[];
  filtered: string[];
}

export const Select = () => {
  let initialEmails = useGetEmails();
  const [emails, setEmails] = useState<Emails>({ selected: [], filtered: [] });
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = createRef<HTMLInputElement>();
  const { triggerProps, layerProps, renderLayer } = useLayer({
    placement: "bottom-start",
    isOpen,
  });

  const filterEmails = (filter: string) => {
    const toRemove = new Set(emails.selected);

    const filtered = initialEmails
      .filter((email) => email.includes(filter))
      .filter((emails) => !toRemove.has(emails));
    setEmails((prevState) => ({ ...prevState, filtered }));
  };

  const addEmail = (email: string) => {
    const selected = [...emails.selected, email];

    setEmails((prevState) => ({
      ...prevState,
      selected,
    }));
    filterEmails("");
    setIsOpen(false);
    inputRef.current && (inputRef.current.value = "");
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

  const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    filterEmails(value);
    setIsOpen(true);
  }, 200);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    value && addEmail(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === "Enter" || event.key === "Tab") &&
      event.currentTarget.value
    ) {
      addEmail(event.currentTarget.value);
      event.preventDefault();
    }
  };

  useEffect(() => {
    setEmails((prevState) => ({ ...prevState, filtered: initialEmails }));
  }, [initialEmails]);

  return (
    <>
      <div className={style.fakeInput} {...triggerProps}>
        {emails.selected.map((email, index) => {
          return (
            <div
              className={cx(style.tag, {
                [style.tagError]: !validateEmail(email),
              })}
              key={index}
            >
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

        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter email..."
          className={style.input}
          onFocus={handleFocus}
          ref={inputRef}
        />
      </div>

      {isOpen &&
        renderLayer(
          <select
            name="emails"
            id="emails"
            onChange={handleSelect}
            multiple
            {...layerProps}
            className={style.select}
          >
            {emails.filtered.map((email, index) => {
              return (
                <option value={email} key={index} className={style.option}>
                  {email}
                </option>
              );
            })}
          </select>
        )}
    </>
  );
};
