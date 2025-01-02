import { Link, useMatch } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {
  IconSearch,
  IconSquarePlus2,
  IconList,
  IconLogin
} from '@tabler/icons-react';
import { Button, Center } from '@mantine/core';
import classes from '../modules/Navbar.module.css';

function NavBar() {
  const match = useMatch('/:link')
  const active = match ? "/" + match.params.link : ''

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Link
          className={classes.link} data-active={'/leagues' === active || undefined}
          to={'/leagues'} key={'Search for league'}>
          <IconSearch className={classes.linkIcon} stroke={2} />
          <span>{'Search for league'}</span>
        </Link>
        <SignedIn> 
          <Link
          className={classes.link} data-active={'/create' === active || undefined}
          to={'/create'} key={'Create League'}>
            <IconSquarePlus2 className={classes.linkIcon} stroke={2} />
            <span>{'Create League'}</span>
          </Link>
          <Link
          className={classes.link} data-active={'/your_leagues' === active || undefined}
          to={'/your_leagues'} key={'Your Leagues'}>
            <IconList className={classes.linkIcon} stroke={2} />
            <span>{'Your Leagues'}</span>
          </Link>
        </SignedIn>       
      </div>
      <div className={classes.bottombox}>
        <Center> 
          <SignedOut>
            <SignInButton> 
              <Button variant="filled" 
              size="md" rightSection={<IconLogin size={14} />}>Log In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton showName='true'/>
          </SignedIn>
        </Center>
      </div>
    </nav>
  );
}

export default NavBar;