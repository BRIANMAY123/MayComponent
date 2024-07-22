import React, { ChangeEvent, useEffect } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Input from './components/Input/input';
import axios from 'axios';
import Progress from './components/Progress/progress';

library.add(fas)



function App() {
  let go=()=>{
    alert('1111')
  }
  const onChange=(e: ChangeEvent<HTMLInputElement>)=>{
    //console.log(e.target.value)
  }

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts/55',).then(
      resp=>{console.log(resp);
      }
    )
  })
  return (
    <div className="App">
    <Button size='lg'>1111</Button>
    <Button size='sm'>1111</Button>
    <Button btnType='primary' onClick={go}>1111</Button>
    <Menu mode='vertical'>
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem>3</MenuItem>
      <SubMenu title='HA'>
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      </SubMenu>
    </Menu>
    <Icon icon='coffee' theme='danger'></Icon>
    <Input disabled={false} onChange={onChange} defaultValue='111' value='222'/>
   
    </div>
  );
}

export default App;
