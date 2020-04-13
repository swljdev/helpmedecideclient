import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Home from '../Home/Home';
import { Route, Link, Switch } from 'react-router-dom';
import NewPoll2 from '../MakePoll/NewPoll2';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange }  from '@material-ui/core/colors';
import Admin from '../Admin/Admin';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            HelpMeDecide
          </Typography>
          <Link to='/'>
          <Button type="submit" variant="contained" color="primary" className="submit" >Poll</Button>
          </Link>
          <Link to='/newPoll'>
          <Button type="submit" variant="contained" color="primary" className="submit" >Make a Poll</Button>
          </Link>
          <Link to='/admin'>
          <Avatar className={classes.orange}>OP</Avatar>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button type="submit" variant="contained" color="primary" className="submit" onClick={props.splash}>Sign Out</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/newPoll'>
          <NewPoll2 />
        </Route>
        <Route exact path='/admin'>
          <Admin />
        </Route>
      </Switch>
      
    </div>
  );
}