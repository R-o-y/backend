import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import { List, InputItem, Card, WingBlank, WhiteSpace, Button, Checkbox, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import ReceiptButton from './material/receipt_float_btn.jsx'
import ListItem from 'antd-mobile/lib/list/ListItem';


const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class H5NumberInputExample extends React.Component {
  state = {
    type: 'money',
  }

  render() {
    const data = [
      { value: 0, label: 'Ph.D.' },
      { value: 1, label: 'Bachelor' },
      { value: 2, label: 'College diploma' },
    ];

    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="start from left"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >Amount</InputItem>
        </List>

        <div>
          <List renderHeader={() => 'CheckboxItem demo'}>
            {data.map(i => (
              <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                {i.label}
              </CheckboxItem>
            ))}
            <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
              Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
            </CheckboxItem>
          </List>

          <Flex>
            <Flex.Item>
              <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                Agree <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>agreement</a>
              </AgreeItem>
            </Flex.Item>
          </Flex>
        </div>


        <ReceiptButton />
        {/* <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header
              title="This is title"
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra={<span>this is extra</span>}
            />
            <Card.Body>
              <div>This is content of `Card`</div>
            </Card.Body>
            <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank> */}
      </div>
    );
  }
}

const CreateForm = createForm()(H5NumberInputExample);

export { CreateForm }
