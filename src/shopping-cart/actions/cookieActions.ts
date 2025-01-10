import { hasCookie, getCookie, setCookie } from "cookies-next/client";

export const getCookieCart = (): { [id: string]: number } => {
    if( hasCookie('cart') ){
        const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}' );
        return cookieCart;
    }

    return {};
}

export const addProductToCard = ( id: string ) => {
    const cookieCart = getCookieCart();

    if( cookieCart[id] ) {
        cookieCart[id] = cookieCart[id] + 1;
    } else {
        cookieCart[id] = 1;
    }

    setCookie( 'cart', JSON.stringify(cookieCart) );
}

export const removeProductFromCart = ( id: string ) => {
    const cookieCart = getCookieCart();

    if ( cookieCart[id] ) delete cookieCart[id];

    setCookie( 'cart', JSON.stringify( cookieCart ) );
}


export const removeSigleItemFormCart = ( id: string ) => {
    const cookieCart = getCookieCart();
    
    if( !cookieCart[id] ) return;

    cookieCart[id] -= 1;
    
    if( cookieCart[id]  < 1) delete cookieCart[id];

    setCookie('cart', JSON.stringify( cookieCart ));
}