import no_foto from '../../assets/no_foto.jpg';
import {useState} from "react";

export const ImageLoader = ({src, alt, className})  => {
    const srcImg = src.length >= 1 ? src[0] : no_foto;

    const [imgSrc, setImgSrc] = useState(srcImg);
    return (
        <img
            className={className}
            src={imgSrc}
            alt={alt}
        />
    )
}