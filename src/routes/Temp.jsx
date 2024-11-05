import { useState } from "react";

const Temp = ()=>{
    const [images, setImages] = useState([]);
    return(
        <>
            <input type="file" accept="image/*" multiple onChange={(e)=>console.log(e.target.files)}/>
            <img src="디스코드스터디화면.png"/>
        </>
        
    )
}
export default Temp;