import Schema, { RuleItem, ValidateError } from "async-validator";
import { useReducer, useState } from "react";
import mapValues from 'lodash-es/mapValues'
import each from 'lodash-es/each'

export interface FiledDetail{
    name:string;
    value:string;
    rules:CustomRule[];
    isValid:boolean;
    errors:ValidateError[]
}
export interface FiledState{
    [key:string]:FiledDetail
}
export interface FormState{
    isValid:boolean
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>
}
export interface FiledAction{
    type:'addField'|'updateValue'|'updateValidateResult'
    name:string
    value:any
}
export type CustomRuleFunc=({getFiledValue}:any)=>RuleItem
export type CustomRule = RuleItem | CustomRuleFunc
export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
  }

function fieldsReducer(state:FiledState,action:FiledAction):FiledState{
   switch(action.type){
    case 'addField':
        return{
           ...state,
           [action.name]:{...action.value}
        }
    case 'updateValue':
        return{
            ...state,
            [action.name]:{...state[action.name],value:action.value}
        }
    case 'updateValidateResult':
        const {isValid,errors}=action.value
        return{
            ...state,
            [action.name]:{...state[action.name],isValid,errors}
        }
    default:
        return state
   }
}

function useStore(initialValues?: Record<string, any>){
    const [form,setForm]=useState<FormState>({isValid:true,isSubmitting: false, errors: {}});
    const [fields,dispatch]=useReducer(fieldsReducer,{});
    const getFiledValue=(key:string)=>{
        return fields[key]&&fields[key].value
    }//拿到单个值

    const transfromRules=(rules:CustomRule[])=>{
        return(
            rules.map(rule=>{
                if(typeof rule==='function'){
                    const calledRule=rule({getFiledValue})
                    return calledRule
                }else{
                    return rule
                }
            })
        )
    }//更改rules，用户传入自定义fun和RuleItem都变成RuleItem，再传入下方descriptor

    const validateField=async(name:string)=>{
      const {value,rules}=fields[name];
      const afterRules=transfromRules(rules)
      const descriptor={
        [name]:afterRules
      }
      const valueMap={
        [name]:value
      }
      const validator=new Schema(descriptor);
      let isValid=true;
      let errors:ValidateError[]=[];
      try{
        await validator.validate(valueMap)
      }catch(e:any){
        isValid=false
        errors=e.errors
      }finally{
        dispatch({type:'updateValidateResult',name,value:{isValid,errors}})
      }
    }//单个input检验

    const validateAllFields = async () => {
        let isValid = true
        let errors: Record<string, ValidateError[]> = {}
        const valueMap = mapValues(fields, item => item.value)
        // {'username': 'abc'}
        const descriptor = mapValues(fields, item => transfromRules(item.rules))
        const validator = new Schema(descriptor)
        setForm({ ...form, isSubmitting: true })
        try {
          await validator.validate(valueMap)
        } catch(e) {
          isValid = false
          const err = e as ValidateErrorType
          errors = err.fields
          each(fields, (value, name) => {
            // errors 中有对应的 key
            if (errors[name]) {
              const itemErrors = errors[name]
              dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors }})
            } else if (value.rules.length > 0 && !errors[name]) {
              dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] }})
            }
            //  有对应的 rules，并且没有 errors
          })
        } finally {
          setForm({ ...form, isSubmitting: false, isValid, errors })
          return {
            isValid,
            errors,
            values: valueMap
          }
        }
      }//表单检验
    
      const resetFields = () => {
        if (initialValues) {
          each(initialValues, (value, name) => {
            if (fields[name]) {
              dispatch({ type: 'updateValue', name, value})
            }
          })
        }
      }//重置

      const getFieldsValue = () => {
        return mapValues(fields, item => item.value)
      }//拿到所有

      const setFieldValue = (name: string, value: any) => {
        if (fields[name]) {
          dispatch({ type: 'updateValue', name, value })
        }
      }

    return{
        fields,
        dispatch,
        form,
        validateField,
        validateAllFields,
        setFieldValue,
        resetFields,
        getFieldsValue
    }
}
export default useStore