// import Link from "next/link";
import Product from "../model/product";
import { useRouter } from 'next/router';
const getStarRating = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    return (
        <div className="flex items-center">
            {[...Array(filledStars)].map((_, index) => (
                <span key={`filled-${index}`} className="text-yellow-400 text-lg">
                    ★
                </span>
            ))}
            {halfStar === 1 && (
                <span className="text-yellow-400 text-lg">☆</span>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-gray-300 text-lg">
                    ☆
                </span>
            ))}
        </div>
    );
};

export default function ProductCard({ product }: { product: Product}) {
    const router = useRouter();
    const handleNavigate = (id: string) => {
        router.push(`/product/?id=${id}`);
    };

    return (
        // <Link href={`/product`}>
            <div
                onClick={() => handleNavigate(`${product.id}`)}
                className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-slate-300 min-h-[300px] h-full cursor-pointer"
            >
                <img
                    src={product.image || './default.png'}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-gray-500">{product.categories}</p>
                    {!product.discount ? (
                        <p className="text-black font-bold text-xl mt-2">
                            {product.price}元
                        </p>
                    ) : (
                        <div className="mt-1">
                            <p className="text-gray-500 line-through text-xl">
                                {product.price}元
                            </p>
                            <p className="text-[#9F79EE] font-bold text-xl">
                                {(product.price * (1 - product.discount / 100)).toFixed(2)}元
                                <span className="text-[#9F79EE] text-sm ml-2">
                                    {product.discount}% off
                                </span>
                            </p>
                        </div>
                    )}
                    {/* 顯示評價星等 */}
                    {product.rating && (
                        <div className="mt-2">
                            {getStarRating(product.rating)}
                            <p className="text-sm text-gray-500 mt-1">{product.rating} / 5</p>
                        </div>
                    )}
                </div>
            </div>
        //  </Link>
    );
};