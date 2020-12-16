import React, { FC } from "react";
import { default as NextImage } from "next/image";

import styles from "./Image.module.scss";
import { Blurhash, BlurhashCanvas } from "react-blurhash";

interface StrapiImageFormatsProps {
  thumbnail: any;
}

interface StrapiImageProps {
  alternativeText: string;
  formats: StrapiImageFormatsProps;
  caption?: string;
  url: string;
}

interface ImageProps {
  image?: StrapiImageProps;
  src?: string;
  blur?: boolean;
  style?: React.CSSProperties;
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * Improves next/image through allowing you to not specify width or height,
 */
const Image: FC<ImageProps> = ({
  image,
  src,
  blur,
  style,
  alt,
  width,
  height,
}) => {
  var imgSrc = src;
  var fixed = false;
  var altText = alt;

  if (image && image.alternativeText) altText = image.alternativeText;

  if (image) {
    imgSrc = image.url;
  }

  if (width && height) fixed = true;

  if (!image) blur = false;

  if (blur && image.caption == "") blur = false;

  return (
    <div
      className={
        styles.image +
        " " +
        (fixed ? styles.fixed : "") +
        " " +
        (blur ? styles.blur : "")
      }
      style={style}
    >
      {blur && (
        <BlurhashCanvas
          className={styles.blur}
          hash={image.caption}
          punch={1}
        />
      )}
      {fixed ? (
        <NextImage src={imgSrc} width={width} height={height} alt={altText} />
      ) : (
        <NextImage src={imgSrc} layout="fill" alt={altText} />
      )}
    </div>
  );
};

export default Image;
