import React from 'react';
import ImageGallery from 'react-image-gallery';

import styles from "react-image-gallery/styles/css/image-gallery.css";

const PropertyGallery = ({ images })  => {
    if (!images || !images.length) {
        return ''
    }

    const galleryItems = images.map(img => (
        {
            original: img,
            thumbnail: img,
        }
    ));

    return (
        <div className="gallery-wrapper">
            <ImageGallery 
                items={galleryItems} 
                showThumbnails={false}
                showNav = {false}
                showFullscreenButton = {false}
                showPlayButton = {false}
                showBullets = {true}
                autoPlay = { false }
            />
        </div>
    );
};

export default PropertyGallery;