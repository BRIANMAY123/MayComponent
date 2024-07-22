import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Menu from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'



export default {
    title: 'may-Menu',
    id: 'Menu',
    component: Menu,
    tags: ['autodocs'],
    subcomponents: { 'SubMenu': SubMenu, 'Item': MenuItem }
  } as Meta<typeof Menu>

  export const ADefaultMenu:StoryFn<typeof Menu> = (args) => (
    <Menu defaultIndex='0' {...args} >
      <MenuItem>
        cool link
      </MenuItem>
      <MenuItem>
        cool link 2
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem> 
      <SubMenu title="下拉选项">
        <MenuItem>
          下拉选项一
        </MenuItem>
        <MenuItem>
          下拉选项二
        </MenuItem>    
      </SubMenu>
    </Menu>
  )
  ADefaultMenu.storyName = '默认Menu'