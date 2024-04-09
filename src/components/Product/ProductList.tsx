import {useQuery} from "@tanstack/react-query";
import {productByPageQuery} from "@/services/query.ts";
import {useProductCategoryFilterState} from "@/store/productCategoryFilerState.ts";
import ProductListItem from "@/components/Product/ProductListItem.tsx";
import ProductListPagination from "@/components/Product/ProductListPagination.tsx";
import {useState} from "react";


export default function ProductList() {
    const [page, setPage] = useState(1);
    const {data} = useQuery(productByPageQuery(page));
    const {currCategory} = useProductCategoryFilterState();
    const filteredData = currCategory.length !== 0 ? data && data.data.filter(item => currCategory.indexOf(item.productCategoryCode) !== -1) : data?.data;
    return (
        <>
            <ul className={"max-w-productList p-6 flex flex-col gap-y-5 rounded bg-[#eee]"}>
                {filteredData && filteredData.map(ele => <ProductListItem key={ele.productCode} productData={ele}/>)}
            </ul>
            <ProductListPagination handler={setPage} next={(data ? data.next : null)} prev={(data ? data.prev : null)} />
        </>
    );
}