
import Button from '@material-ui/core/Button';
import 'regenerator-runtime/runtime'
import { getCookie } from 'util.js'
import React from 'react'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CameraAlt from '@material-ui/icons/CameraAlt';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import axios from 'axios'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});


class FlaoatingButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 0,
      content: undefined,
    };

    this.handleChange = (event, value) => {
      this.setState({ value });
    };

    this.handleChangeIndex = index => {
      this.setState({ value: index });
    };

    this.onClick = () => {
      this.finput.click()
    }

    this.handleFiles = () => {
      var file = this.finput.files[0]
      console.log(file)
      var data = new FormData()
      data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
      data.append('receipt', file)
      axios.post('/api/ocr', data).then((response) => {
        this.setState({
          content: response.data.content
        })
        console.log(response.data.content)
        props.updateReceipt(response.data.content)
      })
    }
  }


  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    return (
      <div>
        <input
          ref={item => this.finput = item}
          style={{ visibility: 'hidden' }}
          type={'file'}
          onChange={async () => this.handleFiles()}>
        </input>
        <Button
          variant="fab"
          className={classes.fab}
          style={{position: 'fixed', bottom: 60, backgroundColor: 'dodgerblue'}}
          onClick={this.onClick}
        >
          <CameraAlt style={{ color: 'white' }} />
        </Button>
        {/* <p style={{ whiteSpace: 'pre' }}>{this.state.content}</p> */}
      </div>
    );
  }
}

// FlaoatingButton.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(FlaoatingButton);
