import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import { Tabs, Result, List, Radio, InputItem, Icon, Card, WingBlank, WhiteSpace, Button, Checkbox, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import ReceiptButton from './material/receipt_float_btn.jsx'
import ListItem from 'antd-mobile/lib/list/ListItem';

const RadioItem = Radio.RadioItem;
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

const data2 = [
  { value: 0, label: 'divide equally', extra: 'details' },
  { value: 1, label: 'football', extra: 'details' },
];

const tabs = [
  { title: 'Type ' },
  { title: 'Scan Receipt' },
];


class H5NumberInputExample extends React.Component {
  constructor(props) {
    super()
    this.state = {
      type: 'money',
      data: [],

      value: 0,
      value2: 0,
      value3: 0,
      value4: 0,
    }
    this.onChange = () => {

    }

    this.onChange2 = (value) => {
      console.log('checkbox');
      this.setState({
        value2: value,
      });
    };
    this.updateReceipt = (content) => {
      this.setState({
        data: [
          { value: 0, label: 'Fish', price: '10.8' },
          { value: 1, label: 'Egg', price: '6.6' },
          { value: 2, label: 'Beef', price: '8.2' },
        ]
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;

    const tabOne = (
      <div>
        <List>
          <InputItem
            {...getFieldProps('inputtitle2')}
            placeholder="title can be icon，image or text"
            extra="$"
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

        <WhiteSpace size="lg" />
        <List>
          {data2.map(i => (
            <RadioItem key={i.value} checked={this.state.value2 === i.value} onChange={() => this.onChange2(i.value)}>
              {i.label}<List.Item.Brief>{i.extra}</List.Item.Brief>
            </RadioItem>
          ))}
        </List>



        <div className="sub-title">to be settled up</div>
        <Result
          img={myImg('HWuSTipkjJRfTWekgTUG')}
          // title="等待处理"
          message="to be settled up"
        />


        <WhiteSpace />
        <WingBlank>
          <Button type="primary">SAVE</Button>
        </WingBlank>
      </div>
    )

    const tabTwo = (
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
        </List>
        <ReceiptButton updateReceipt={this.updateReceipt}/>
      </div>
    )


    return (
      <div>
        <WhiteSpace size="lg" />
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div>
            { tabOne }
            {/* { tabTwo } */}
          </div>

          <div>
            { tabTwo }
          </div>
        </Tabs>
      </div>
    );
  }
}

const CreateForm = createForm()(H5NumberInputExample);

export { CreateForm }
