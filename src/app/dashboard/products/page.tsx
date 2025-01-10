import { ProductCard } from "@/products";
import { Metadata } from "next";
import { products } from '@/data/productos';

export const metadata: Metadata = {
    title: 'Listado de productos',
    description: 'Elige tus productos favoritos'
}

export default function ProductsPage() {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            
            {
                products.map( product => 
                    <ProductCard key={ product.id } { ...product } />
                )
            }
        </div>
    );
}