import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputText } from './InputText'

const defaultProps = {
  name: "", 
  label: "", 
  textField: {
    value: "",
    error: "",
    valid: false
  }, 
  type: "text", 
  onChange: jest.fn()
}

describe('Input Text', () => {
  it('should render correctly', () => {
    const component = shallow(<InputText {...defaultProps}/>);
    expect(component).toMatchSnapshot();
  });

  it('function onChange have been called when change input', () => {
    const component = mount(<InputText {...defaultProps}/>);
    component.find('input').simulate('change');
    expect(defaultProps.onChange).toHaveBeenCalled();
    component.unmount();
  })
});

