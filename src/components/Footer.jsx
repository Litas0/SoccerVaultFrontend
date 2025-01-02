import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ActionIcon, Container, Group, Image } from '@mantine/core';
import Logo  from '../assets/images/logo.png';
import classes from '../modules/Footer.module.css';

function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link to={'/'}>
          <Image src={Logo} h="100%"/> 
        </Link>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;