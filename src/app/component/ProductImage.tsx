import Image from "next/image";
import { useState } from "react";


function ProductImage({id, name}: {id: string, name: string}) {
    const [src, setSrc] = useState(
        `https://dongyi-api.hnd1.zeabur.app/product/api/product/get_image?product_id=${id}`
    );
    return (
        <Image
            src={src}
            alt={name}
            width={0} 
            height={0}
            sizes="100vw" 
            className="w-full h-56 object-cover" 
            style={{ width: '100%', height: '14rem' }} 
            onError={() => setSrc('/default.png')}
        />
    )
}

export default ProductImage;