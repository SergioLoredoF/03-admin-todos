// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

import { Metadata } from "next";
import { cookies } from "next/headers";
import { products, Product } from '@/data/productos';
import { ItemCard } from "@/shopping-cart";
import WidgetItem from "@/components/WidgetItem";

export const metadata: Metadata = {
    title: 'Carrito de compras',
    description: 'Carrito de compras'
}

export default async function CartPage() {

    const cookieStore = await cookies();
    const cookieProducts: {[id: string]: number} = JSON.parse( cookieStore.get('cart')?.value ?? '{}' );
    const productsCart: { product: Product, quantity: number }[] = [];

    products.forEach( product => {
        if( cookieProducts[product.id] ) productsCart.push({ product, quantity: cookieProducts[product.id] });
    });

    const totalToPay = productsCart.reduce(
        ( prev, current ) => ( current.product.price * current.quantity ) + prev, 0 
    )

    return(
        <div>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="mb-2" />

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        productsCart.map( productCart => 
                            <ItemCard key={ productCart.product.id } { ...productCart } />
                        )
                    }
                </div>
                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title="Total a pagar">
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">${ (totalToPay * 1.16).toFixed(2) }</h3>
                        </div>
                        <span className="font-bold text-center text-gray-500">Impuestos 16%: ${ (totalToPay * 0.16).toFixed(2) }</span>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}