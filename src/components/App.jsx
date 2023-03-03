import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import { Button } from "./Button/Button";
import Modal from "./Modal/Modal";
import { fetchQuery } from "API/Api";



const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading({isLoading: true});
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }
    const response = await fetchQuery(inputForSearch.value, 1);
    setImages(response);
    setIsLoading(false);
    setSearch(inputForSearch.value);
    setPageNr(2);
  };

  const onClickMore = async () => {
    setIsLoading({isLoading: true});
    const response = await fetchQuery(search, pageNr);
    setImages([...images, ...response]);
    setIsLoading(false);
    setPageNr(pageNr + 1);
  };

  const onImgClick = e => {
    setIsModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {isLoading && (pageNr === 1) ? (<Loader />) : (
        <React.Fragment>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery onImgClick={onImgClick} images={images} />
          
          {isLoading && (pageNr >= 2) ? <Loader /> : null}
          {images.length > 0 ? <Button onClick={onClickMore}/> : null }
        </React.Fragment>
      )}
      {isModalOpen ? (
        <Modal src={modalImg} alt={modalAlt} handleClose={onModalClose} />
        ) : null}
    </>
  )
};

export default App;