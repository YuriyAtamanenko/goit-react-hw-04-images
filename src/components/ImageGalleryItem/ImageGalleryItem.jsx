import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

export default function ImageGalleryItem({ webURL, tags, largeImageURL }) {
  const [isModalOpan, setModalOpan] = useState(false);

  const toggleModal = () => {
    setModalOpan(isModalOpan => !isModalOpan);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={webURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={toggleModal}
      />

      {isModalOpan && (
        <Modal
          onCloseModal={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
