import { useEffect, useState } from "react"

export function AppBar(){
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [students,setStudents] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:8080/student/getAll').then((res)=>res.json()).then(result=>{
        setStudents(result);
      })
    },[])



    const handleClick = (e)=>{
        e.preventDefault();
        const student = {name,address};
        fetch('http://localhost:8080/student/add',{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify(student)
        })
    }

    return(
        <div>
        <div>
<form>
<label for="fname">name:</label><br/>
  <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/>
  <label for="lname">address</label><br/>
  <input type="text" id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/><br/><br/>
  <button onClick={handleClick}>Submit</button>
</form> 
</div>
<div>
{students.map(student=>(
    <div key={student}>
        {student.id} : {student.name} : {student.address}
        </div>
))}
</div>
</div>
    )
}