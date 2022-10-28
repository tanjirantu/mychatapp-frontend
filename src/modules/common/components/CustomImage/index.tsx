import React, { ImgHTMLAttributes, useEffect, useState } from 'react';

interface ICustomImage extends ImgHTMLAttributes<HTMLImageElement> {
    errorUrl?: string | undefined;
}

const CustomImage: React.FC<ICustomImage> = ({
    errorUrl = '/static/assets/images/no-image-placeholder.webp',
    src,
    alt,
    ...rest
}) => {
    const [imgUrl, setImgUrl] = useState(src || errorUrl);

    useEffect(() => {
        setImgUrl(src || errorUrl);
    }, [src, errorUrl]);

    const handleError = () => {
        setImgUrl(errorUrl);
    };

    return <img onError={handleError} src={imgUrl} alt={alt} {...rest} />;
};

export default CustomImage;
