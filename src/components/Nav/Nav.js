import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import menuIcon from './menu.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';

const styles = {
    navList: {
        width: '23vw',
    }
};

class Nav extends React.Component {
    state = {
        leftDrawer: false
    }

toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open})
}


render () {
    const {classes} = this.props;
    const sideList = (
        <nav className={classes.navList}>
        <Link to='/home'>Home</Link>
        <br />
        <Link to='/foods'>My Foods</Link>
        <br />
        <Link to='/goals'>My Goals</Link>
        <br />
        <Link to='/pinboard'>Pinboard</Link>
        <br />
        <Link to='profile'>Profile</Link>
        </nav>
    )


    return (
        <div>
            <button className='menu-btn' onClick={this.toggleDrawer('leftDrawer', true)}>
            <img className='icon' src={menuIcon} alt=''/>
            </button>
            <Drawer open={this.state.leftDrawer} onClose={this.toggleDrawer('leftDrawer', false)}>
            <div tabIndex={0} onClick={this.toggleDrawer('leftDrawer', false)}  onKeyDown={this.toggleDrawer('leftDrawer', false)}>
                {sideList}
            </div>
            </Drawer>
        </div>
    )
}

}

Nav.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Nav);