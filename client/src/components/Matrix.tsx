
type MatrixProps = {
    matrix: string
}

const Matrix = (props: MatrixProps) => {

   
    const s = JSON.stringify(props.matrix).replace(/,/g, ", ")
    const m = s.split(/[[]]/).filter((v: string) => /\d/.test(v))

    return (

            <ul className='flex flex-col'>
                
                {m.map((nums: string, idx: number) => <li className="text-xs" key={idx}>{nums}{idx === m.length - 1 && ""}</li>)}
                
            </ul> 
        )
            
    
}

export default Matrix;