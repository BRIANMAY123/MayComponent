import classNames from "classnames";
import { DragEvent, FC, ReactNode, useState } from "react"


interface DraggerProps{
    onFile:(file:FileList)=>void;
    children?:ReactNode
}
const Dragger:FC<DraggerProps>=(props)=>{
    const {onFile,children}=props
    const [dragOver, setDragOver]=useState(false)
    const kclass=classNames('may-uploader-dragger',{
        'is-dragover':dragOver
    })
    const handleDrop=(e:DragEvent<HTMLElement>)=>{
     e.preventDefault();
     setDragOver(false);
     onFile(e.dataTransfer.files)
    }
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
      }
    return(
        <div
        className={kclass}
        onDrop={handleDrop}
        onDragOver={e => { handleDrag(e, true)}}
        onDragLeave={e => { handleDrag(e, false)}}
        >{children}</div>
    )
}

export default Dragger