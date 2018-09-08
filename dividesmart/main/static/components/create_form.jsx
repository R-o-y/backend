import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import { Result, List, InputItem, Icon, Card, WingBlank, WhiteSpace, Button, Checkbox, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import ReceiptButton from './material/receipt_float_btn.jsx'
import ListItem from 'antd-mobile/lib/list/ListItem';


const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" style={{ width: 60, height: 60 }} alt="" />;


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class H5NumberInputExample extends React.Component {
  constructor(props) {
    super()
    this.state = {
      type: 'money',
      data: []
    }
    this.onChange = () => {

    }
    this.updateReceipt = (content) => {
      this.setState({
        data: [
          { value: 0, label: 'Fish', price: '10' },
          { value: 1, label: 'Egg', price: '6' },
          { value: 2, label: 'Beef', price: '8' },
        ]
      })
    }
  }


  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>

        <List>
          <InputItem
            {...getFieldProps('inputtitle2')}
            placeholder="title can be icon，image or text"
          >
            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
          </InputItem>
        </List>
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
            {this.state.data.map(i => (
              <CheckboxItem key={i.value}
                onChange={() => this.onChange(i.value)}
                extra={'$' + i.price}
              >
                {i.label}
              </CheckboxItem>
            ))}
            <CheckboxItem
              key="disabled"
              data-seed="logId" disabled defaultChecked multipleLine>
              Undergraduate
              <List.Item.Brief>Auxiliary text</List.Item.Brief>
            </CheckboxItem>
          </List>
        </div>


        <div className="sub-title">to be settled up</div>
        <Result
          img={myImg('HWuSTipkjJRfTWekgTUG')}
          // title="等待处理"
          message="to be settled up"
        />

        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Button type="primary">SAVE</Button>
        </WingBlank>
        <ReceiptButton updateReceipt={this.updateReceipt}/>
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
