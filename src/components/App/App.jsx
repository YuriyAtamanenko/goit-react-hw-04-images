import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import ImagesApiService from '../../services/API';

export default function App() {
  const [query, setQuery] = useState('');
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [isLoadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (query !== '') {
      setLoader(true);
      setLoadMoreBtn(false);

      ImagesApiService(query, page)
        .then(data => {
          setImgs(imgs => [...imgs, ...data.hits]);
          setLoadMoreBtn(page < Math.ceil(data.totalHits / 12));
        })
        .catch(error => console.log(error))
        .finally(setLoader(false));
    }
  }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImgs([]);
    setPage(1);
    setLoader(true);
    setLoadMoreBtn(false);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {query && <ImageGallery imgs={imgs} />}
      {isLoadMoreBtn && <Button onClick={handleLoadMore} />}
      {isLoader && <Loader />}
    </div>
  );
}
