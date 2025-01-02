import { Button, Container, Overlay, Text, Title} from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from '../modules/HomePage.module.css';

const HomePage = () => {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          Wszystkie informacje o twoich ulubionych ligach
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Soccer Vault to aplikacja internetowa składująca wszystkie informacje o twoich ulubionych ligach piłkarskich.
          Terminarze, wyniki, tabele, statystyki i więcej. 
        </Text>
        <Link to="/leagues">
            <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
                Wyszukaj ligę
            </Button>
        </Link>          
      </Container>
    </div>
  );
}

export default HomePage; 