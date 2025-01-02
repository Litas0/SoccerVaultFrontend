import { BrowserRouter as Router, Link} from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import { MantineProvider, AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DatesProvider } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Logo  from './assets/images/logo.png';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <MantineProvider>
        <DatesProvider settings={{ timezone: 'UTC' }}>
          <Router>
            <AppShell
              header={{ height: 50 }}
              navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },}}
              withBorder={false}>
              <AppShell.Header>
                <Group h="100%" px="sm">
                  <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                  <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />   
                  <Link to={'/'}>
                    <Image src={Logo} h="70%" ml={25} mt={8}/> 
                  </Link>
                </Group>      
              </AppShell.Header>
              <AppShell.Navbar p="md">
                <NavBar />
              </AppShell.Navbar>
              <AppShell.Main>
                  <MainContent />
              </AppShell.Main>            
              <AppShell.Footer>
                <Footer />
              </AppShell.Footer>
            </AppShell>               
          </Router>   
        </DatesProvider>
      </MantineProvider>     
    </ClerkProvider>
  )
}

export default App
