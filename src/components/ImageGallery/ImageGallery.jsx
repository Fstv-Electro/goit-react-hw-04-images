import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchQuery from 'API/Api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';

 const ImageGallery = (inputValue, page, onClick, LoadMoreBtn) => {
    // state = {
    //     images: [],
    //     status: 'idle',
    //     statusBtn: true,
    // };

    const [images, setImage] = useState([]);
    const [status, setStatus] = useState('idle');
     const [statusBtn, setStatusBtn] = useState(true);
     const [currentPage, setCurrentPage] = useState(1);


     useEffect(() => {
         if (inputValue) {
            fetchLoad();
        }
         if (currentPage !== page) {
            fetchLoadMore();
            setCurrentPage([prev => prev + 1]);
        }
    }, [inputValue, page]);

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.inputValue !== this.props.inputValue) {
    //     }
    // }

    const fetchLoad = (value, searchPage) => {
        fetchQuery(value, searchPage).then(res => {
            setImage(res.hits);
            setStatus('resolve');
            setStatusBtn(page < Math.ceil(res.totalHits / 12));
        }).catch(error => setStatus('rejected'));
    };

    const fetchLoadMore = (value, searchPage) => {
        fetchQuery(value, searchPage).then(res => {
            setImage(prevState => [...prevState, ...res.hits]);
            setStatus('resolve');
            setStatusBtn(page < Math.ceil(res.totalHits / 12));
        }).catch(error => setStatus('rejected'));
    };
    
    if (status === 'pending') {
        return <Loader />;
    }

    if (status === 'resolve') {
        return (
            <>
                <ul className={css.gallery}>
                    {images.map(({ id, largeImageURL, tags }) => (
                        <ImageGalleryItem
                            key={id}
                            url={largeImageURL}
                            tags={tags}
                            onClick={onClick}
                        />
                    ))}
                </ul>
                {images.length !== 0 ? (
                   statusBtn && <Button onClick={LoadMoreBtn}/>
                ) : (
                    alert('No result')
                )}
            </>
        );
    }
}

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.object.isRequired,
};

export default ImageGallery;