import { FC } from 'react'
import Form from './form'
import Item, { formItemProps } from './formItem'

export type IFormComponent = typeof Form & {
  Item: FC<formItemProps>
}
const TransForm: IFormComponent = Form as IFormComponent
TransForm.Item = Item

export default TransForm;