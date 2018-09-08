
import Button from '@material-ui/core/Button';
import 'regenerator-runtime/runtime'

import React from 'react'

import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
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
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
      },
      {
        color: 'inherit',
        className: classNames(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
      },
    ];

    return (
      // <Zoom
      //   key={fab.color}
      //   in={this.state.value === index}
      //   timeout={transitionDuration}
      //   style={{
      //     transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
      //   }}
      //   unmountOnExit
      // >
        <Button
          variant="fab"
          className={classes.fab}
          style={{bottom: 66, backgroundColor: 'dodgerblue'}}
          onClick={() => window.location.href = '/form'}
        >
          <AddIcon style={{ color: 'white' }} />
        </Button>
      // </Zoom>
    );
  }
}

// FlaoatingButton.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(FlaoatingButton);

