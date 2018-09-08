import 'regenerator-runtime/runtime'
import React from 'react'
import { Popover, NavBar, Icon } from 'antd-mobile'
const Item = Popover.Item

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

class CustomNavBar extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      selected: '',
    };
    this.onSelect = (opt) => {
      if (opt.key == 'scan')
        window.location.href = '/qr'
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
    return (
      <div>
        <NavBar
          icon={
            <div style={{
              width: '28px',
              height: '28px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/RfxDFanyfhEhOkynbPXizskAQqkPmPkR.png) center center /  21px 21px no-repeat' }}
            />
          }
          mode="light"
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="scan" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">
                  Scan
                </Item>),

                (<Item key="qr" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>
                  My Qrcode
                </Item>),

                (<Item key="help" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                  <span style={{ marginRight: 5 }}>Add Friend</span>
                </Item>),
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
          NavBar
        </NavBar>
      </div>
    )
  }
}

export { CustomNavBar }
