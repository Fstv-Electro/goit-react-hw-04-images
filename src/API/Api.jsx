import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`
const API_KEY = '31643435-c42a12112cebd9cccb736a8a1';

export const fetchQuery = async (query, pageNr) => {
    const response = await axios.get(`/?q=${query}&page=${pageNr}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        
    return response.data.hits.map(image => {
        return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
        };
    });
};;

