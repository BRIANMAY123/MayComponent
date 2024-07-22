import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import {Button,BaseButtonProps} from './button'

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: 'may-Button',
  component: Button,
  tags: ['autodocs'],
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
  argTypes: {
    // 这里指定 Storybook 应该如何渲染和交互这些参数
    disabled: { control: 'boolean' }, // 使用布尔类型的控件来交互禁用属性
    size: { control: { type: 'select', options: ['lg', 'sm'] } }, // 使用下拉选择框来交互尺寸属性
    btnType: { control: { type: 'select', options: ['primary', 'default', 'danger', 'link'] } }, // 使用下拉选择框来交互类型属性
    href: { control: 'text' }, // 使用文本框来交互 href 属性
  },
} as Meta<typeof Button>

const Template: StoryFn<BaseButtonProps> = (args) => <Button {...args} />

export const ADefault = Template.bind({})
ADefault.args = {
  children: 'Default Button',
}
ADefault.storyName = '默认按钮样式'


// export const Large = Template.bind({})
// Large.args = {
//   size: 'lg',
//   children: 'Large Button',
// }
// export const Small = Template.bind({})
// Small.args = {
//   size: 'sm',
//   children: 'Small Button',
// }
// export const Primary = Template.bind({})
// Primary.args = {
//   btnType: 'primary',
//   children: 'Primary Button',
// }
// export const Danger = Template.bind({})
// Danger.args = {
//   btnType: 'danger',
//   children: 'Danger Button',
// }
// export const Link = Template.bind({})
// Link.args = {
//   btnType: 'link',
//   children: 'Link Button',
//   href: 'https://google.com'
// }

export const BButtonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)
BButtonWithSize.storyName = '不同尺寸的按钮'

export const CButtonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)

CButtonWithType.storyName = '不同类型的按钮'