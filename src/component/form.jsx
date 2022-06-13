import React from "react";
export default function FormData({addEmployeeToDB})
{
    const [formData, setFormData] = React.useState({
         name : "",
         age : "",
         address : "",
         salary : "",
         department: "",
         isMarried : false,
    })

    const handleChange = (event) => {
        var {name,value,checked,type} = event.target;
        value= type=="checkbox" ? checked : value;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = (event,formData) => {
        event.preventDefault();
        // console.log(formData);
        addEmployeeToDB(formData);
        setFormData({
            name : "",
            age : "",
            address : "",
            salary : "",
            department : "",
            isMarried : false
        })

    }

    const {name, age, address, salary, department, isMarried} = formData
    return (

        <div>
        <h4>Employee Details</h4>
        <form onSubmit={(e)=>handleSubmit(e,formData)} id="employeeForm">
            <label>Name<input value={name} onChange={handleChange} name="name" type="text" placeholder="Enter Your Full Name" /></label>
            <label>Age<input value={age} onChange={handleChange} name="age" type="number" placeholder="Enter Your Age"/></label>
            <label>Address<input value={address} onChange={handleChange} name="address" type="text" placeholder="Enter Your Address"/></label>
            <label>Salary <input value={salary} onChange={handleChange} name="salary" type="number" placeholder="Enter Your Salary"/></label>
            <select value={department} onChange={handleChange} name="department">
                <option value="">Department</option>
                <option value="Science">science</option>
                <option value="commerce">commerce</option>
                <option value="English">English</option>
            </select>
            <p>Married <input checked={isMarried} onChange={handleChange} name="isMarried" type="checkbox" /></p>
            <input id="submitBtn" type="submit" />
        </form>
    </div>
    )
}