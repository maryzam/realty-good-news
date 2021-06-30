import React from 'react';

const PropertyGallery = ({ images })  => {
    if (!images || !images.length) {
        return ''
    }

    return (
        <div className="gallery-wrapper">
            <div className="gallery">          
            {
                images.map((image, id) => (
                        <img 
                            key={id}
                            className={ "gallery-image" }
                            src={image}>
                        </img>
                    ))
            }
           </div>
        </div>
    );
};

export default PropertyGallery;