import React, { useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import Modal from "./Modal/Modal";


export const App = () => {

  const [inputValue, setInputValue] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const getInputValue = handleValue => {
    setInputValue(handleValue);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };

  const LoadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar getInputValue={getInputValue}/>
      <ImageGallery inputValue={inputValue} onClick={getLargeImg} LoadMoreBtn={LoadMoreBtn} page={page} />
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  )
}
