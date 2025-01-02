import { useMatch, Link } from 'react-router-dom';
import { Button, Group } from '@mantine/core';

import classes from '../modules/LeagueHeader.module.css';

const data = [
  { link: 'table', label: 'Tabela'},
  { link: 'results', label: 'Wyniki'},
  { link: 'fixtures', label: 'Terminarz'}
];

export function LeagueHeader() {

  const match = useMatch('/leagues/:id/:page')
  const active = match ? match.params.page : ''

  const links = data.map((item) => (
    <Link    
      to={`/leagues/${match.params.id}/${item.link}`}
      key={item.label}
    > 
      <Button variant="default" size='md' className={classes.link} data-active={item.link === active || undefined}>
        {item.label}
      </Button>
    </Link>
  ))
  return (
      <Group justify="center" gap={'xl'} mb={20}>
        {links}
      </Group>
)
}