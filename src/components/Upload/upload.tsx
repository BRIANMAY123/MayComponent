import { ChangeEvent, FC, useRef, useState } from "react";
import Button from "../Button/button";
import axios from "axios";
import UploadList from './uploadList';
import Dragger from "./dragger";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string;
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[];
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload? : (file: File) => boolean | Promise<File>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: UploadFile) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /**设置上传的请求头部 */
  headers?: {[key: string]: any };
  /**上传的文件字段名 */
  name?: string;
  /**上传时附带的额外参数 */
  data?: {[key: string]: any };
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽上传 */
  drag?: boolean;
  children?: React.ReactNode
}

const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag=true,
      } = props
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList||[]);

  const handleClick = () => {
    if (fileInput) {
      fileInput.current?.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result === true) {
          post(file);
        }
      }
    });
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const updateFileList=(updateFile: UploadFile, updateObj: Partial<UploadFile>)=>{
    setFileList((prevList)=>{
        return prevList.map(file=>{
         if(file.uid==updateFile.uid){
            return{...file,...updateObj}
         }else{
            return file
         }
        })
    })
  }
  const post = (file: any) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name||'file', file);
    if(data){
        Object.keys(data).forEach(key=>{
            formData.append(key,data[key])
        })
    }//用户传入data
    axios
      .post(action, formData, {
        headers: {
            ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
           updateFileList(_file,{percent:percentage,status: 'uploading'})
           _file.status = 'uploading'
          _file.percent = percentage
          if (onProgress) {
            onProgress(percentage, _file)
          }
          }
        },
      })
      .then((resp) => {
        console.log(resp.data);
        updateFileList(_file, {status: 'success', response: resp.data})
        _file.status = 'success'
        _file.response = resp.data
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.log(err);
        updateFileList(_file, { status: 'error', error: err})
      _file.status = 'error'
      _file.error = err
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  }; 
  return (
    <div className="may-upload-compontent">
        <div className="may-upload-input" style={{display:'inline-block'}} onClick={handleClick}>
       {drag?<Dragger onFile={(files)=>{uploadFiles(files)}}>{children}</Dragger>:children}
      <input
        className="may-file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInput}
        type="file"
        accept={accept}
        multiple={multiple}
      />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};

export default Upload;
