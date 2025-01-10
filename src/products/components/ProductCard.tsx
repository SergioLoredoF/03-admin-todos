'use client';
import Image from "next/image";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

import { Product } from "@/data/productos";
import { addProductToCard, removeProductFromCart } from '@/shopping-cart/actions/cookieActions';
import { Star } from "./Star";
import { useRouter } from "next/navigation";

// interface cookieProducts {
//     id?: string,
//     cantidad?: number
// }

export const ProductCard = ({ id, image, name, price, rating }: Product) => {

    const router = useRouter();

    const stars = Array(rating).fill(0);
    /* Mi forma version noob  */
    // const onAgreeProduct = ( id: string ) => {
    //     const cookieProducts = getCookie('products');
    //     let newCookieProducts: Array<cookieProducts> = [];

    //     if( cookieProducts ) {
    //         try {
    //             newCookieProducts = JSON.parse( cookieProducts );
    //             if( !newCookieProducts?.length ) throw 'No es un array';
    //         } catch (error) { 
    //             newCookieProducts = [];
    //         };
    //     }

    //     const productIndex = newCookieProducts.findIndex( product => product.id === id);

    //     if( productIndex !== -1 ) {
    //         newCookieProducts[productIndex].cantidad 
    //             ? newCookieProducts[productIndex].cantidad += 1
    //             : newCookieProducts[productIndex].cantidad = 1;
    //     } else {
    //         newCookieProducts.push({ id: id, cantidad: 1 })
    //     }

    //     setCookie('products', JSON.stringify( newCookieProducts ));
    // }

    const onAddToCart = () => {
        addProductToCard( id );
        router.refresh();
    }

    const onDeleteToCart = () => {
        removeProductFromCart( id );
        router.refresh();
    }

    return (
        <div className="bg-white shadow rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-100">

            {/* Product Image */}
            <div className="p-2">
                <Image
                    width={500}
                    height={500}
                    className="rounded"
                    src={ image }
                    alt="product image" />
            </div>

            {/* Title */}
            <div className="px-5 pb-5">
                <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{name}</h3>
                </a>
                <div className="flex items-center mt-2.5 mb-5">

                    {
                        stars.map((x, i) => <Star key={i}/> )
                    }

                    {/* Rating Number */}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        { rating.toFixed(2) }
                    </span>
                </div>


                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${price.toFixed(2)}</span>

                    <div className="flex">
                        <button
                            onClick={() => onAddToCart()}
                            className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <IoAddCircleOutline size={25} />
                        </button>
                        <button
                            onClick={() => onDeleteToCart()}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            <IoTrashOutline size={20} />
                        </button>
                    </div>

                </div>


            </div>
        </div>
    )
}