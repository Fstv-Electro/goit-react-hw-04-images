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
        fetchLoad(inputValue, page);
    }, [inputValue, page]);

    const fetchLoad = (inputValue, page) => {
        reset()
        fetchQuery(inputValue, page).then(res => {
            setImages(res.hits);
            setStatus('resolve');
            setStatusBtn(page < Math.ceil(res.totalHits / 12));
        }).catch(error => setStatus('rejected'));
    };

    const fetchLoadMore = e => {
        e.preventDefault();
        fetchQuery(inputValue, page).then(res => {
            setImages([...images, ...res.hits]);
            setStatus('resolve');
            setStatusBtn(page < Math.ceil(res.totalHits / 12));
            LoadMoreBtn();
        }).catch(error => setStatus('rejected'));
    };

    const reset = () => {
        setImages([]);
        setStatus('idle');
        setStatusBtn(true);
    }

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
                       statusBtn && <Button onClick={fetchLoadMore}/>
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