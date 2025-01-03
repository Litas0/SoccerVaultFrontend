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
          to={'/leagues'} key={'Wyszukaj lige'}>
          <IconSearch className={classes.linkIcon} stroke={2} />
          <span>{'Wyszukaj ligę'}</span>
        </Link>
        <SignedIn> 
          <Link
          className={classes.link} data-active={'/create' === active || undefined}
          to={'/create'} key={'Utwórz lige'}>
            <IconSquarePlus2 className={classes.linkIcon} stroke={2} />
            <span>{'Utwórz ligę'}</span>
          </Link>
          <Link
          className={classes.link} data-active={'/your_leagues' === active || undefined}
          to={'/your_leagues'} key={'Twoje ligi'}>
            <IconList className={classes.linkIcon} stroke={2} />
            <span>{'Twoje ligi'}</span>
          </Link>
        </SignedIn>       
      </div>
      <div className={classes.bottombox}>
        <Center> 
          <SignedOut>
            <SignInButton> 
              <Button variant="filled" 
              size="md" rightSection={<IconLogin size={14} />}>Zaloguj się</Button>
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