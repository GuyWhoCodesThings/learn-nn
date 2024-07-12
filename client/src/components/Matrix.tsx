import React from 'react'


const Matrix = (props) => {

   
    const s = JSON.stringify(props.matrix).replaceAll(',', ', ')
    const m = s.split(/[\[\]]/).filter((v) => /\d/.test(v))

    return (

            <ul className='flex flex-col'>
                
                {m.map((nums, idx) => <li key={idx}>{idx === 0 && ""}[{nums}]{idx === m.length - 1 && ""}</li>)}
                
            </ul> 
        )
            
    
}

export default Matrix;