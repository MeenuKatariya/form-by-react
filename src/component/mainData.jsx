import React from "react";
import FormData from "./form";
import  FormTable from "./table";

export default function MainData (){

    const [allEmployeeData, setAllEmployeeData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const [lastPage, setLastPage] = React.useState()

    const addEmployeeToDB = async (employeeData) => {
        try {
            await fetch(`http://localhost:3000/employeeDetail`,{
                method : "POST",
                body : JSON.stringify(employeeData),
                headers : {"Content-Type" : "application/json"}
            });
            getEmployeeData();
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    const getEmployeeData = async () => {
        try {
            setLoading(true);
            let response =await fetch(`http://localhost:3000/employeeDetail`);
            let result = await response.json();
            setAllEmployeeData(result);

            for(var pair of response.headers.entries()){
                if(pair[0] === 'x-total-count'){
                    setLastPage(Math.ceil(pair[1]/5));
                }
            }
        } catch (error) {
            console.log(error)
            setError(true);
        }
        setLoading(false);
    }

    const handlePage = (value) => {
        setPage(page+value);
        // console.log(page);
    }

    React.useEffect(()=>{
        getEmployeeData();
    },[page]);

    return (
        <>
        <FormData addEmployeeToDB={addEmployeeToDB} />
        {
            loading ? (<h1>Loading</h1>) : error ? (<h1>Something went wrong</h1>) : (<FormTable allEmployeeData={allEmployeeData} handlePage={handlePage} page={page} lastPage={lastPage}/>)
        }
        </>
    )
}