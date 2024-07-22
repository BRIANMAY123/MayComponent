/// <reference types="react" />
import { RuleItem, ValidateError } from "async-validator";
export interface FiledDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FiledState {
    [key: string]: FiledDetail;
}
export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}
export interface FiledAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}
export type CustomRuleFunc = ({ getFiledValue }: any) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
declare function useStore(initialValues?: Record<string, any>): {
    fields: FiledState;
    dispatch: import("react").Dispatch<FiledAction>;
    form: FormState;
    validateField: (name: string) => Promise<void>;
    validateAllFields: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: string;
        };
    }>;
    setFieldValue: (name: string, value: any) => void;
    resetFields: () => void;
    getFieldsValue: () => {
        [x: string]: string;
    };
};
export default useStore;
