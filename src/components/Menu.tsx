import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import { Route, Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  list: {
    zIndex: 1001,
    width: 250,
  },
    title: {
    marginTop: 15,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  firstList: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 30,
    marginBottom: 40,
  },
  secondList: {
    marginTop: 40,
    marginLeft: 5,
    marginRight: 30,
    },
    menu: {
        border: 'solid',
        padding: 5
  }
});


export function MenuBar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown') {
      return;
    }

    setState(open);
  };

  const sideList = () => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <h4 className={classes.title}>
              MENU
      </h4>
      <Route>
        <List className={classes.firstList}>
          <ListItem button component={RouterLink} to="/reciep">
            <ListItemIcon>
              <InboxIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Recieps" />
          </ListItem>
          <ListItem button component={RouterLink} to="/reciep/new">
            <ListItemIcon>
              <AddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add New Reciep" />
          </ListItem>
          <ListItem button component={RouterLink} to="/users">
            <ListItemIcon>
              <GroupIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>
        </List>
        <List className={classes.secondList}>
                  <ListItem button component={RouterLink} to="/">
                      <ListItemIcon>
                          <ExitToAppIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Sign out" />
                  </ListItem>
        </List>
      </Route>
    </div>
  );

  return (
    <>
          <IconButton onClick={toggleDrawer(true)}>
              <div className={classes.menu}>
                  Menu
                       </div>
          </IconButton>
      <SwipeableDrawer open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {sideList()}
      </SwipeableDrawer>
    </>
  );
}
