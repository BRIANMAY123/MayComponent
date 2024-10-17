import React  from 'react'
import { Meta } from '@storybook/react'
import  Upload, { UploadFile }  from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

export default { 
  title: 'may-Upload',
  id: 'Upload',
  component: Upload,
} as Meta<typeof Upload>


const defaultFileList:UploadFile[]=[
  {uid:'123',size:1234,name:'1.md',status:'uploading',percent:30}
]
export const ASimpleUpload = () => (
  <Upload
    action='https://jsonplaceholder.typicode.com/posts'
    defaultFileList={defaultFileList}
  >
     <Icon icon="upload" size="5x" theme="secondary" />
     <br/>
     <p>点击或者拖动到此区域进行上传</p>
  </Upload>  
)
ASimpleUpload.storyName = '测试的Upload 组件'
export const DSimpleUpload = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
  </Upload>  
)
DSimpleUpload.storyName = '普通的 Upload 组件'

export const BCheckUpload = (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
  return (
    <Upload
      {...args}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
    </Upload>  
  )
}
BCheckUpload.storyName = '上传前检查文件大小'
export const CDragUpload = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
CDragUpload.storyName = '拖动上传'