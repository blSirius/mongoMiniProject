import React, { useState } from 'react';

function Content({ selectedCartoon }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        // Handle image load error if needed
    };

    return (
        <>
            <div></div>
            <div className='sm:ml-40 pt-4 text-white'>
                {selectedCartoon && (
                    <>
                        {!imageLoaded && <p>Loading...</p>}
                        <img
                            src={selectedCartoon.cartoonImage}
                            alt={selectedCartoon.cartoonName}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                            className='w-screen mt-40 sm:mt-0'
                        />
                        {/* Additional details or styling can be added as needed */}
                    </>
                )}
            </div>
        </>
    );
}

export default Content;