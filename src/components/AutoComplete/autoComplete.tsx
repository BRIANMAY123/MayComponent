import { FC, ChangeEvent, ReactElement, useState, useRef, useEffect } from "react";
import Input, { inputProps } from "../Input/input";
import Icon from '../Icon/icon';
import useDebounce from "../../hooks/useDebounce";
import Transition from '../Transition/transition'

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps
  extends Omit<inputProps, "onSelect" | "onChange"> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void;
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    onChange,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState<any>();//文本框内容
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);//下拉框
  const [ loading, setLoading ] = useState(false)//加载缓冲
  const [ showDropdown, setShowDropdown] = useState(false)//是否显示
  const debounceValue=useDebounce(inputValue,500)
  const triggerSearch = useRef(true)//是否select的标志

 useEffect(()=>{
    if (debounceValue) {
        if(!triggerSearch.current){
            triggerSearch.current=true;
            return
        }//非常重要，避免无限循环
        const results = fetchSuggestions(debounceValue);
        if(results instanceof Promise){
          setLoading(true)
          results.then(data=>{
              setLoading(false)
              setSuggestions(data);
              if (data.length > 0) {
                setShowDropdown(true)
              }
          })
        }else{
          setSuggestions(results);
          setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
        }
      }
 },[debounceValue])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (onChange) {
      onChange(value)
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false)
    setSuggestions([]);
    triggerSearch.current=false
  }
  const renderTemplate=(item:DataSourceType)=>{
    return renderOption?renderOption(item):item.value
  }
  const generateDropdown = () => {
    return (
      <Transition
      in={showDropdown || loading}
      animation="zoom-in-top"
      timeout={300}
      onExited={() => {setSuggestions([])}}
    >
      <ul className="may-suggestion-list">
        {suggestions.map((item, index) => {
          return (
            <li key={index} className="suggestion-item" onClick={()=>{handleSelect(item)}}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
      </Transition>
    );
  };
  return (
    <div className="may-auto-complete">
    <Input value={inputValue} onChange={handleChange} {...restProps}></Input>
    {loading&&<ul><Icon icon="spinner" spin></Icon></ul>}
    {suggestions.length>0&&generateDropdown()}

    </div>
  );
};
export default AutoComplete;


