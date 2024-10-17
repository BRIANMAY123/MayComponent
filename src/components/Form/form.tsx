import { createContext, FC, forwardRef, ReactNode, useImperativeHandle } from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from "async-validator";

export type RenderProps = (form: FormState) => ReactNode
export interface formProps {
  /**表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  children?: ReactNode|RenderProps;
  /**表单默认值，只有初始化以及重置时生效 */
  initialValues?: Record<string, any>;
  /**提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /**提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = 
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<formProps, 'initialValues'>
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>

export const FormContext = createContext<IFormContext>({} as IFormContext);

const Form = forwardRef<IFormRef,formProps>((props,ref) => {
  const { name, children, initialValues,onFinish,onFinishFailed } = props;
  const { form, fields, dispatch,...restProps} = useStore(initialValues);
  const { validateAllFields,validateField}=restProps;
  useImperativeHandle(ref,()=>{
    return{
      ...restProps
    }
  })
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };
  const submitForm=async (e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   e.stopPropagation();
   const {isValid,errors,values}=await validateAllFields();
   if (isValid && onFinish) {
    onFinish(values)
  } else if(!isValid && onFinishFailed) {
    onFinishFailed(values, errors)
  }
  }//提交表单的回调

  let childrenNode: ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }
  return (
    <form name={name} className="may-form" onSubmit={submitForm}>
      <FormContext.Provider value={passedContext}>
        {childrenNode}
      </FormContext.Provider>
    </form>
  );
})

export default Form;
