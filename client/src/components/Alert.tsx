import { useEffect, useState } from "react"

const stringToTheme = (theme: string): string => {
    if (theme === "info") {
        return "bg-orange-200 border border-orange-500 text-orange-700"
    } else if (theme === "success") {
        return "bg-green-200 border border-green-500 text-green-700"
    }
    return "bg-red-200 border border-red-500 text-red-700"
}

type AlertProps = {
    message: string,
    theme: string
}

const Alert = (props: AlertProps): JSX.Element => {

    const [show, setShow] = useState(true)
   


    useEffect(() => {

        setShow(false)
        setTimeout(() => {
            setShow(true)
        }, 3000)

    }, [props.message])

    return (
        <div className={`absolute bottom-0 mb-5 right-20 left-20 px-4 py-1 rounded ml-20 mr-20 ${show ? "transition-opacity duration-3000 ease-in-out opacity-0" : ""} ${stringToTheme(props.theme)}`} role="alert">
            <span className="block sm:inline">{props.message}</span>
        </div>
    )
}

export default Alert
