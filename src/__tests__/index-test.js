import {
  AjaxErrorPage as _AjaxErrorPage,
  Button as _Button,
  CodeBlock as _CodeBlock,
  Expand as _Expand,
  Icon as _Icon,
  ICON_DEFAULT_PACK as _ICON_DEFAULT_PACK,
  Loading as _Loading,
  Password as _Password,
  Text as _Text,
  TEXT_ALIGN_LEFT as _TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT as _TEXT_ALIGN_RIGHT,
} from '../'

import AjaxErrorPage from '../components/AjaxErrorPage'
import Button from '../components/Button'
import CodeBlock from '../components/CodeBlock'
import Expand from '../components/Expand'
import Icon, {DEFAULT_PACK as ICON_DEFAULT_PACK} from '../components/Icon'
import Loading from '../components/Loading'
import Password from '../components/Password'

import Text, {
  ALIGN_LEFT as TEXT_ALIGN_LEFT,
  ALIGN_RIGHT as TEXT_ALIGN_RIGHT,
} from '../components/Text'

describe('react-frost-core', () => {
  it('exports AjaxErrorPage component', () => {
    expect(_AjaxErrorPage).toBe(AjaxErrorPage)
  })

  it('exports Button component', () => {
    expect(_Button).toBe(Button)
  })

  it('exports CodeBlock component', () => {
    expect(_CodeBlock).toBe(CodeBlock)
  })

  it('exports Expand component', () => {
    expect(_Expand).toBe(Expand)
  })

  it('exports Icon constants and component', () => {
    expect(_Icon).toBe(Icon)
    expect(_ICON_DEFAULT_PACK).toBe(ICON_DEFAULT_PACK)
  })

  it('exports Loading component', () => {
    expect(_Loading).toBe(Loading)
  })

  it('exports Password component', () => {
    expect(_Password).toBe(Password)
  })

  it('exports Text constants and component', () => {
    expect(_Text).toBe(Text)
    expect(_TEXT_ALIGN_LEFT).toBe(TEXT_ALIGN_LEFT)
    expect(_TEXT_ALIGN_RIGHT).toBe(TEXT_ALIGN_RIGHT)
  })
})
