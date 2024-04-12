import {Button} from "@/components/ui/button.tsx";
import {ChangeEvent, useState} from "react";
import {QueryClient} from "@tanstack/react-query";
import {productByCodeQuery} from "@/services/api/query.ts";
import {useBillingCartStore} from "@/store/billingCartStore.ts";
import Error from "@/components/Product/Error.tsx";
import {cn} from "@/lib/utils.ts";
import {useDiscountStore} from "@/store/discountStore.ts";


const queryClient = new QueryClient();

export default function BillingSectionSearchBar() {

    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false);
    const {addToCart, clearCart} = useBillingCartStore();
    const {setNoDiscount} = useDiscountStore()


    const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
    };

    const addBtnHandler = () => {
        queryClient.fetchQuery(productByCodeQuery(input))
            .then(product => {
                if (product.length !== 0) {
                    addToCart(product[0], 1);
                    setInput("");
                    setIsError(false);
                } else {
                    setIsError(true);
                }
            });
    };


    const clearCartBtnHandler = () => {
        clearCart();
        setNoDiscount();
    };

    return (
        <div className={cn("flex items-center gap-x-4", isError && "mt-8")}>
            <div className={"w-fit p-2 relative flex items-center border-2 border-cyan-800 rounded flex-1"}>
                <label htmlFor={"product"} className={"mr-2"}>
                    <span className={"sr-only"}>Search product by product id</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512"
                         className={"aspect-square h-4"}
                    >
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </label>
                <input type="text" id={"product"}
                       className={"flex-1 bg-transparent outline-none"}
                       placeholder={"Add Items by code"}
                       value={input}
                       onChange={inputHandler}
                />
                {isError && <Error className={"-top-8"}>There is no such element</Error>}
            </div>
            <Button className={"block p-2 bg-green-500 font-bold"} onClick={addBtnHandler}>
                Add Product
            </Button>
            <Button className={"block p-2 bg-orange-300 font-bold text-orange-500"} onClick={clearCartBtnHandler}>
                Clear Cart
            </Button>
        </div>
    );
}