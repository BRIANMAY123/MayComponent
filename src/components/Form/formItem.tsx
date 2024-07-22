import classNames from "classnames";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";
import { RuleItem } from "async-validator";
import { CustomRule } from "./useStore";

export interface formItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
  /**子节点的值的属性，如 checkbox 的是 'checked' */
  valuePropName?: string;
  /**设置收集字段值变更的时机 */
  trigger?: string;
  /**设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any;
  rules?: CustomRule[];
  validateTrigger?: string;
}
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &Omit<T, K>;

export const FormItem: FC<formItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName = "value",
    trigger = "onChange",
    getValueFromEvent = (e) => e.target.value,
    rules,
    validateTrigger = "onBlur",
  } = props as SomeRequired<formItemProps,"getValueFromEvent" | "trigger" | "valuePropName" | "validateTrigger">;
  const { dispatch, fields, initialValues, validateField } =useContext(FormContext);
  const rowClass = classNames("may-row", {
    "may-row-no-label": !label,
  });
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || "";
    dispatch({ type: "addField", name, value: {label, name, value, rules: rules || [], errors: [], isValid: true} });
  }, []);
  const onValueUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValueFromEvent(e);
    console.log("new value", value);
    dispatch({ type: "updateValue", name, value });
  };
  const onValueValidate = async () => {
    await validateField(name);
  };
  const fieldsState = fields[name];
  const value = fieldsState && fieldsState.value; //一开始可能不存在
  const errors = fieldsState && fieldsState.errors;
  const isRequired = rules?.some((rule) => typeof rule !== "function" && rule.required);
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    "may-form-item-required": isRequired,
  });
  const itemClass = classNames("may-form-item-control", {
    "may-form-item-has-error": hasError,
  });
   //手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  const childList = React.Children.toArray(children);

  // 没有子组件
  if (childList.length === 0) {
    console.error(
      "No child element found in Form.Item, please provide one form component"
    );
  }

  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      "Only support one child element in Form.Item, others will be omitted"
    );
  }

  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error("Child component is not a valid React Element");
  }
  const child = childList[0] as React.ReactElement;
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });
  return (
    <div className={rowClass}>
      {label && 
        <div className="may-form-item-label">
          <label title={label} className={labelClass}>{label}</label>
        </div>
      }
      <div className="may-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="may-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default FormItem;
