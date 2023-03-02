import { useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Modal from "./Modal/Modal";


const App = () => {



  const [inputValue, setInputValue] = useState({});
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState('');
  
  
  

  const getInputValue = handleValue => {
    setInputValue(handleValue);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal((showModal) => (!showModal))
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };

  const LoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };



  return (
    <>
      <Searchbar getInputValue={getInputValue} />
      <ImageGallery inputValue={inputValue} onClick={getLargeImg} LoadMoreBtn={LoadMoreBtn} page={page} />
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  )
};

export default App;