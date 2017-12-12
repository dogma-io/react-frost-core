/**
 * @flow
 */

/* global HTMLElement */

import Expand from './Expand'
import React, {Component, type Node} from 'react'

export type PROPS = {
  children?: Node,
  code?: string,
  demo?: boolean,
  language: 'css' | 'js' | 'jsx',
  maxLineLength?: number,
  togglable?: boolean,
}

type State = {|
  expanded: boolean,
|}

/**
 * Get code demo to render for code block component
 * @param children - children to render
 * @param demo - whether or not to render a demo
 * @returns code demo for code block component
 */
function renderCodeDemo(children?: Node, demo?: boolean): Node {
  if (demo === false) {
    return null
  }

  return <div className="frost-code-block-demo">{children}</div>
}

export default class CodeBlock extends Component<PROPS, State> {
  _codeElement: ?HTMLElement

  constructor() {
    super(...arguments)

    this.state = {
      expanded: false,
    }
  }

  _handleCodeToggle = (): void => {
    const {expanded} = this.state

    this.setState(
      {
        expanded: !expanded,
      },
      (): void => {
        this._highlightCode()
      },
    )
  }

  _highlightCode(): void {
    if (this._codeElement) {
      window.Prism.highlightElement(this._codeElement, false)
    }
  }

  _renderCodeSample(): Node {
    const {code, language, togglable} = this.props
    const {expanded} = this.state

    if (!code || (!expanded && togglable !== false)) {
      return null
    }

    return [
      <div className="frost-code-block-language" key="language">
        {language}
      </div>,
      <pre className={`language-${language}`} key="code">
        <code
          className={`language-${language}`}
          ref={el => {
            this._codeElement = el
          }}
        >
          {code.replace(/\\n/g, '\n')}
        </code>
      </pre>,
    ]
  }

  _renderCodeToggle(): Node {
    const {code, togglable} = this.props
    const {expanded} = this.state

    if (!code || togglable === false) {
      return null
    }

    return (
      <Expand
        className="frost-code-block-expand"
        collapsedLabel="Show code"
        expandedLabel="Hide code"
        expanded={expanded}
        onChange={this._handleCodeToggle}
      >
        {this._renderCodeSample()}
      </Expand>
    )
  }

  componentDidMount(): void {
    this._highlightCode()
  }

  render(): Node {
    const {children, demo, togglable} = this.props

    return (
      <div className="frost-code-block">
        {renderCodeDemo(children, demo)}
        {togglable !== false
          ? this._renderCodeToggle()
          : this._renderCodeSample()}
      </div>
    )
  }
}
