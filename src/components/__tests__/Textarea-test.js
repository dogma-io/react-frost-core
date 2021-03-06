import Textarea, {ALIGN_LEFT, ALIGN_RIGHT} from '../Textarea'
import {mount} from 'enzyme'
import React from 'react'

const TESTS = [
  {
    desc: 'when no properties passed in',
    props: {},
  },
  {
    desc: 'when align set to left',
    props: {align: ALIGN_LEFT},
  },
  {
    desc: 'when align set to right',
    props: {align: ALIGN_RIGHT},
  },
  {
    desc: 'when class name passed in',
    props: {className: 'foobar'},
  },
  {
    desc: 'when disabled set to true',
    props: {disabled: true},
  },
  {
    desc: 'when disabled set to false',
    props: {disabled: false},
  },
  {
    desc: 'when error set to true',
    props: {error: true},
  },
  {
    desc: 'when error set to false',
    props: {error: false},
  },
  {
    desc: 'when maximum length set to 1',
    props: {maxLength: 1},
  },
  {
    desc: 'when minimum length set to 1',
    props: {minLength: 1},
  },
  {
    desc: 'when onChange set',
    props: {onChange: jest.fn()},
  },
  {
    desc: 'when readOnly set to true',
    props: {readOnly: true},
  },
  {
    desc: 'when readOnly set to false',
    props: {readOnly: false},
  },
  {
    desc: 'when value set to empty string',
    props: {value: ''},
  },
  {
    desc: 'when value set to non-empty string',
    props: {value: 'foobar'},
  },
]

describe('Textarea', () => {
  TESTS.forEach(({desc, props}) => {
    describe(desc, () => {
      let wrapper

      beforeEach(() => {
        if (props.onChange) {
          props.onChange.mockReset()
        }

        wrapper = mount(<Textarea {...props} />)
      })

      it('functions as expected', () => {
        expect(wrapper).toMatchSnapshot()
      })

      describe('when textarea is focused', () => {
        let textarea

        beforeEach(() => {
          textarea = wrapper.find('textarea')
          textarea.simulate('focus')
        })

        it('functions as expected', () => {
          expect(wrapper).toMatchSnapshot()
        })

        if (props.value) {
          describe('when clear button fade in animation has completed', () => {
            beforeEach(() => {
              wrapper.find('button').simulate('animationEnd')
            })

            it('functions as expected', () => {
              expect(wrapper).toMatchSnapshot()
            })
          })
        }

        if (props.disabled !== true && props.readOnly !== true) {
          describe('when value changed', () => {
            beforeEach(() => {
              const target = textarea.at(0)
              const event = {target}

              target.value = 'baz'

              textarea.simulate('change', event)
            })

            it('functions as expected', () => {
              expect(wrapper).toMatchSnapshot()
            })

            describe('when clear button is pressed', () => {
              let button

              beforeEach(() => {
                button = wrapper.find('button')
                button.simulate('click')
              })

              it('functions as expected', () => {
                expect(wrapper).toMatchSnapshot()
              })

              describe('when clear button fade out animation has completed', () => {
                beforeEach(() => {
                  button.simulate('animationEnd')
                })

                it('functions as expected', () => {
                  expect(wrapper).toMatchSnapshot()
                })
              })
            })
          })
        }

        describe('when input looses focus', () => {
          beforeEach(() => {
            textarea.simulate('blur')
          })

          it('renders as expected', () => {
            expect(wrapper).toMatchSnapshot()
          })

          if (props.value) {
            describe('when clear button fade out animation has completed', () => {
              beforeEach(() => {
                wrapper.find('button').simulate('animationEnd')
              })

              it('functions as expected', () => {
                expect(wrapper).toMatchSnapshot()
              })
            })
          }
        })
      })
    })
  })
})
