import { FC } from 'react';
import Form from './form';
import { formItemProps } from './formItem';
export type IFormComponent = typeof Form & {
    Item: FC<formItemProps>;
};
declare const TransForm: IFormComponent;
export default TransForm;
