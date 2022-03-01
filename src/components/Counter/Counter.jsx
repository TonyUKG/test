import { useEffect, useState } from "react"

const Counter = (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
    })

    const handleClick = () => {
        setCount(count + 1);
    }

    return <div>
        <button onClick={() => handleClick()}>One More</button>
        <p>How many: {count}</p>
    </div>
}

export default Counter;