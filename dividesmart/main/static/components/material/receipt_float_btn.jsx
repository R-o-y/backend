
import Button from '@material-ui/core/Button';
import 'regenerator-runtime/runtime'

import React from 'react'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';

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
  }


  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    return (
      <div>
        <input ref={item => this.finput = item}style={{ visibility: 'hidden' }} type={'file'} ></input>
        <Button
          variant="fab"
          className={classes.fab}
          style={{bottom: 60, backgroundColor: 'dodgerblue'}}
          onClick={this.onClick}
        >
          <AddIcon style={{ color: 'white' }} />
        </Button>
      </div>
    );
  }
}

// FlaoatingButton.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(FlaoatingButton);

