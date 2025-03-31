import React from 'react';
import AssignCard from '../AssignCard';

export default function WorkWindow({data, assignClick}) {
 

  return (
    <div>

   <AssignCard data={data} assignClick={assignClick}/> 
   
    </div>
  )
}
