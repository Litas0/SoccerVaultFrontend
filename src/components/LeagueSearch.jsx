import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';
import {
  ScrollArea,
  Table,
  Text,
  TextInput,
  Button,
  Container
} from '@mantine/core';

import leaguesService from '../services/leaguesService';

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  if(query)
    return data.filter((item) =>
        item['name'].toLowerCase().includes(query) || item['owner'].toString().toLowerCase().includes(query)
    );
  return data;
}

export function LeagueSearch() {

  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState();
  const [data, setdata] = useState();

  useEffect(() => {
    leaguesService.getLeagues()
    .then(leaguesRecived => {
      const startedLeagues = leaguesRecived.filter((league) => league.calendar.length > 0)
      setdata(startedLeagues)
      setSearchedData(startedLeagues)
    })
  }, [])

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSearchedData(filterData(data, value));
  };

  const rows = searchedData ? searchedData.map((row) => {
    const link = `/leagues/${row.id}/table`
    return ( 
      <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{row.numberOfTeams}</Table.Td>
        <Table.Td>{row.owner}</Table.Td>
        <Table.Td> <Link to={link}>  <Button size="sm"> Link to the league </Button> </Link> </Table.Td>
      </Table.Tr>
    )
  })
  :
  null

  return (
    <ScrollArea>
      <Container size='xs'>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
      </Container>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              League name
            </Table.Th>
            <Table.Th>
              Number of teams playing
            </Table.Th>
            <Table.Th>
              League manager
            </Table.Th>
            <Table.Th>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={3}>
                <Text fw={500} ta="center">
                  Nothing found, fix search criteria
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}