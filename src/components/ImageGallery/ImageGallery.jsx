import PropTypes from 'prop-types';
import fetchQuery from 'API/Api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';
import { useState, useEffect } from 'react';


export const ImageGallery = ({inputValue, onClick, LoadMoreBtn, page}) => {

    // state = {
    //     images: [],
    //     status: 'idle',
    //     statusBtn: true,
    // };

    
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.inputValue !== this.props.inputValue) {
    //         this.fetchLoad();
    //     }

    //     if (prevProps.page !== this.props.page && this.props.page > 1) {
    //         this.fetchLoadMore();
    //     }
    // }


    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('idle');
    const [statusBtn, setStatusBtn] = useState(true);

    useEffect(() => {
        if (!inputValue) {
            return;
        }
        // reset()
        fetchQuery(inputValue, page).then(res => {
            setStatus('resolve');
            setStatusBtn(page < Math.ceil(res.totalHits / 12));
            page > 1 ? setImages(prevImg => [...prevImg, ...res.hits]) : setImages(res.hits);  
        }).catch(error => setStatus('rejected'));

    }, [inputValue, page]);

    // const fetchLoadMore = e => {
    //     e.preventDefault();
    //     fetchQuery(inputValue, page).then(res => {
    //         setImages([...images, ...res.hits]);
    //         setStatus('resolve');
    //         setStatusBtn(page < Math.ceil(res.totalHits / 12));
            
    //     }).catch(error => setStatus('rejected'));
    // };

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
                                id={id}
                                url={largeImageURL}
                                tags={tags}
                                alt={tags}
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
    inputValue: PropTypes.string.isRequired,
};