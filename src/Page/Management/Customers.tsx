import CustomerList from "@/components/Management/customer/CustomerList"



const Customers = () => {
    return (
        <section className="flex flex-col">
            <h1 className={"mx-8 mt-4 text-cyan-900 font-bold text-xl"}>Customer List</h1>
            <CustomerList />
        </section>
    )
}

export default Customers