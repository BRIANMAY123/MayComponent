import { useEffect, useState} from "react";
function useDebounce(value:any,delay=300){
    const[debouncedValue,setDebouncedValue]=useState(value)
   useEffect(()=>{
      const handler=setTimeout(()=>{
        setDebouncedValue(value)
      },delay)
      return()=>{
        clearTimeout(handler)
      }
   },[value,delay])//组件销毁和依赖数组变化时会销毁effect
   return debouncedValue
}

export default useDebounce