import { useEffect, useState } from "react";

function Bpp() {
  const [items,setItems] = useState([]);

  useEffect(()=>{
    fetch("/apitest")
    .then((res)=> res.json()
    .then((data)=> setItems(data))
  )
  },[]);
  



  return ( items.map((item,i)=>{
    return (
      <div key={i} >
      <h1>{item.id}</h1>
      <h2>{item.name}</h2>
    </div>  );  
  })
    
   
  );
}

export default Bpp;
