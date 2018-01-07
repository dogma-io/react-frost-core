/**
 * @flow
 */

/* global SyntheticInputEvent */

import React, {Component, type Node} from 'react'

export const ALIGN_LEFT: 'left' = 'left'
export const ALIGN_RIGHT: 'right' = 'right'

type ALIGN = typeof ALIGN_LEFT | typeof ALIGN_RIGHT

export type PROPS = {
  align?: ?ALIGN,
  disabled?: ?boolean,
  error?: ?boolean,
  onChange?: (value: ?string) => void,
  readOnly?: ?boolean,
  value?: ?string,
}

type State = {
  animatingClearButtonOut: boolean,
  focused: boolean,
  value?: ?string,
}

const CLEAR_SVG = (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

/**
 * Get class name for text component given it's current state
 * @param error - whether or not input has an error
 * @returns class name for text component
 */
function getClassName(error?: ?boolean): string {
  const classNames = ['frost-text']

  if (error) {
    classNames.push('frost-text-error')
  }

  return classNames.join(' ')
}

/**
 * Get class name for text component's input
 * @param align - how to align text within input
 * @returns class name for text component's input
 */
function getInputClassName(align?: ?ALIGN): string {
  const classNames = ['frost-text-input']

  switch (align) {
    case 'right':
      classNames.push('frost-text-align-right')
  }

  return classNames.join(' ')
}

export default class Text extends Component<PROPS, State> {
  constructor() {
    super(...arguments)

    this.state = {
      animatingClearButtonOut: false,
      focused: false,
      value: this.props.value,
    }
  }

  _handleBlur = () => {
    const {disabled, readOnly} = this.props
    const {animatingClearButtonOut, value} = this.state
    // eslint-disable-next-line flowtype/no-weak-types
    const state: any = {focused: false}

    if (!animatingClearButtonOut && !disabled && !readOnly && value) {
      state.animatingClearButtonOut = true
    }

    this.setState(state)
  }

  _handleChange = (e: SyntheticInputEvent<*>) => {
    this._updateValue(e.target.value)
  }

  _handleClear = () => {
    this._updateValue('')
  }

  _handleClearButtonAnimationEnd = () => {
    const {animatingClearButtonOut, value} = this.state

    // We don't want to do anything if this is the fade in animation.
    if (!animatingClearButtonOut && value) {
      return
    }

    this.setState({animatingClearButtonOut: false})
  }

  _handleFocus = () => {
    this.setState({focused: true})
  }

  _renderClearButton(): Node {
    const {disabled, readOnly} = this.props
    const {animatingClearButtonOut, focused, value} = this.state

    if (
      !animatingClearButtonOut &&
      (disabled || !focused || readOnly || !value)
    ) {
      return null
    }

    const classNames = [
      'frost-text-clear',
      animatingClearButtonOut ? 'frost-fade-out' : 'frost-fade-in',
    ]

    return (
      <button
        className={classNames.join(' ')}
        onAnimationEnd={this._handleClearButtonAnimationEnd}
        onClick={this._handleClear}
      >
        {CLEAR_SVG}
      </button>
    )
  }

  _updateValue(nextValue: ?string) {
    const {onChange} = this.props
    const {value} = this.state

    if (nextValue === '') {
      nextValue = null
    }

    // Determine if the value was just cleared, which is used to determine
    // when we should start fading the clear button out.
    const valueCleared = !!value && !nextValue

    this.setState({
      animatingClearButtonOut: valueCleared,
      value: nextValue,
    })

    if (onChange) {
      onChange(nextValue)
    }
  }

  render(): Node {
    const {
      align,
      error,
      onChange: _onChange,
      value: _value,
      ...passThroughProps
    } = this.props

    const {value} = this.state

    return (
      <div className={getClassName(error)}>
        <input
          className={getInputClassName(align)}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          value={value || ''}
          {...passThroughProps}
        />
        {this._renderClearButton()}
      </div>
    )
  }
}
