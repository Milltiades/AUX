import Image from "next/image";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Link from "next/link";

function Gallery() {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div className="min-h-custom">
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail]}>
        <Link href="/assets/mindeli/mindeli.jpg">
          <Image
            alt="img1"
            src="/assets/mindeli/mindeli.jpg"
            width={150}
            height={150}
          />
        </Link>

        <Link href="/assets/mindeli/mindeli.jpg">
          <Image
            alt="img1"
            src="/assets/mindeli/mindeli.jpg"
            width={150}
            height={150}
          />
        </Link>

        <Link href="/assets/mindeli/mindeli.jpg">
          <Image
            alt="img1"
            src="/assets/mindeli/mindeli.jpg"
            width={150}
            height={150}
          />
        </Link>
      </LightGallery>
    </div>
  );
}

export default Gallery;
