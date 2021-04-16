import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

const Navigation: React.FC = (): JSX.Element => {
  return (
    <AppBar position="static" style={{ padding: 0, margin: '0 0 10px 0' }}>
      <Toolbar>
        <Link to="/">
          <IconButton aria-label="delete" style={{ color: 'white' }}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/varietals" style={{ textDecoration: 'none' }}>
          <Button style={{ color: 'white' }}>Varietals</Button>
        </Link>
        <Link to="/vintages" style={{ textDecoration: 'none' }}>
          <Button style={{ color: 'white' }}>Vintages</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
