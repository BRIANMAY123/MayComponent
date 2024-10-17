import { render } from "@testing-library/react";

import React from "react";
import Menu,{MenuProps} from "./menu";
import MenuItem from './menuItem'
import SubMenu from './subMenu'


const testProps:MenuProps={
    defaultIndex:'0',
    onSelect:jest.fn(),
    className:'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
  }

  const generateMenu = (props: MenuProps) => {
    return (
      <Menu {...props}>
        <MenuItem>
          active
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem>
          xyz
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            drop1
          </MenuItem>
        </SubMenu>
        <SubMenu title="opened">
          <MenuItem>
            opened1
          </MenuItem>
        </SubMenu>
      </Menu>
    )
  }

describe('test',()=>{
    it('should render correct Menu',()=>{})
})