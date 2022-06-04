import {useState} from "react";

export const useModal = (initialValue = false) => {
  const [opened, setOpened] = useState(initialValue);

  const openModal = () => setOpened(true);
  const closeModal = () => setOpened(false);

  return [opened, openModal, closeModal];
};
