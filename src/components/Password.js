/**
 * @flow
 */

import KEY_CODES from '../key-codes'
import Text, {
  ALIGN_LEFT as TEXT_ALIGN_LEFT,
  ALIGN_RIGHT as TEXT_ALIGN_RIGHT,
} from './Text'
import t from 'grammatic'
import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = TEXT_ALIGN_LEFT
export const ALIGN_RIGHT: 'right' = TEXT_ALIGN_RIGHT

// eslint-disable-next-line flowtype/require-exact-type
export type PasswordProps = {
  className?: ?string,
  revealable?: ?boolean,
}

type PasswordState = {|
  revealed: boolean,
|}

const HIDE_A11Y_LABEL = t(
  'Hide password',
  'Accessible label for hiding raw password',
)
const HIDE_LABEL = t('Hide', 'Label for hiding raw password')
const SHOW_A11Y_LABEL = t(
  'Show password',
  'Accessible label for showing raw password',
)
const SHOW_LABEL = t('Show', 'Label for showing raw password')

/**
 * Get class name for password component given it's current state
 * @param className - user specified class name
 * @param revealable - whether or not raw password can be revealed
 * @returns class name for password component
 */
function getClassName(className?: ?string, revealable?: ?boolean): string {
  const classNames = ['frost-password']

  if (className) {
    classNames.push(className)
  }

  if (revealable) {
    classNames.push('frost-password-revealable')
  }

  return classNames.join(' ')
}

export default class Password extends Component<PasswordProps, PasswordState> {
  _el: ?HTMLDivElement

  state = {
    revealed: false,
  }

  _handleRevealKeyPress = (e: SyntheticKeyboardEvent<*>) => {
    if ([KEY_CODES.ENTER, KEY_CODES.SPACE].includes(e.which)) {
      this.setState({revealed: !this.state.revealed})
    }
  }

  _handleRevealMouseUp = (e: SyntheticEvent<*>) => {
    if (this._el) {
      // eslint-disable-next-line flowtype/no-weak-types
      const input: ?HTMLInputElement = (this._el.querySelector('input'): any)

      // Make sure when toggling reveal we keep input focused without changing
      // cursor position or selection
      if (input) {
        let {selectionEnd, selectionStart} = input

        input.focus()

        setTimeout(() => {
          input.selectionStart = selectionStart
          input.selectionEnd = selectionEnd
        }, 0)
      }
    }

    this.setState({revealed: !this.state.revealed})
  }

  render(): Node {
    const {className, revealable, ...passThroughProps} = this.props
    const {revealed} = this.state

    return (
      <div
        className={getClassName(className, revealable)}
        ref={(el: ?HTMLDivElement) => {
          this._el = el
        }}
      >
        <Text
          className="frost-password-input"
          type={revealed ? 'text' : 'password'}
          {...passThroughProps}
        />
        {revealable ? (
          <button
            aria-label={revealed ? HIDE_A11Y_LABEL : SHOW_A11Y_LABEL}
            className="frost-password-reveal"
            onKeyPress={this._handleRevealKeyPress}
            onMouseUp={this._handleRevealMouseUp}
          >
            {revealed ? HIDE_LABEL : SHOW_LABEL}
          </button>
        ) : null}
      </div>
    )
  }
}
