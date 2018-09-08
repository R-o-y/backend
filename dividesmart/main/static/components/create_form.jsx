import 'regenerator-runtime/runtime'

import React from 'react'

import {
  Popover,
  NavBar,
  Tabs,
  Result,
  List,
  Radio,
  InputItem,
  Icon,
  Card,
  WingBlank,
  WhiteSpace,
  Button,
  Checkbox,
  Flex,
  Badge
} from 'antd-mobile';
import { createForm } from 'rc-form';
import ReceiptButton from './material/receipt_float_btn.jsx'

const Item = Popover.Item;
const Item2 = List.Item;
const Brief = Item2.Brief;
const RadioItem = Radio.RadioItem;
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
  // { value: 1, label: 'specify amount', extra: 'details' },
];

const tabs = [
  { title: 'Type ' },
  { title: 'Scan Receipt' },
];


class H5NumberInputExample extends React.Component {
  constructor(props) {
    super()
    this.state = {
    visible: true,
    selected: '',
  };
  this.onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  this.handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>



        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <List>
          <InputItem
            {...getFieldProps('inputtitle2')}
            placeholder="title can be icon，image or text"
            extra="$"
          >
            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
          </InputItem>
        </List>

        <WhiteSpace size="lg" />
        {/* <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
        </Tabs> */}

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

        <NavBar
        mode="light"
        rightContent={
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="start from left"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ><Badge>
              <span
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'url(https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg) center center /  60px 60px no-repeat',
                  display: 'inline-block' }}
              />
            </Badge>Tom</InputItem>),
              (<InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="start from left"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ><Badge>
              <span
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'url(https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg) center center /  60px 60px no-repeat',
                  display: 'inline-block' }}
              />
            </Badge>Mary</InputItem>),
              (<InputItem
            {...getFieldProps('money3')}
            type={type}
            defaultValue={100}
            placeholder="start from left"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ><Badge>
              <span
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'url(https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg) center center /  60px 60px no-repeat',
                  display: 'inline-block' }}
              />
            </Badge>Amy</InputItem>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        }
      >
        Specify Amount
      </NavBar>

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
