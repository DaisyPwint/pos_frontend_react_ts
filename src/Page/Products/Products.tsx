import BillingSection from "@/components/Product/BillingSection.tsx";
import ProductList from "@/components/Product/ProductList.tsx";


export default function Products() {
    return (
        <section className="w-full  flex m-8 dark:bg-dark-primary">
            <ProductList />
            <BillingSection />
        </section>
    );
}