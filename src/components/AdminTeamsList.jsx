import { Link } from 'react-router-dom';
import {
  ScrollArea,
  Table,
  Text,
  Button
} from '@mantine/core';

import leaguesService from '../services/leaguesService';
import teamsService from '../services/teamsService';

export function AdminTeamsList({ data, leagueId, setData }) {

  const addTeamLink = `/leagues/${leagueId}/addTeam`

  const removeTeam = async (TeamId) => {
    const res = await teamsService.removeTeam(TeamId)
    console.log(res)
    const leagueData = await leaguesService.getLeagueById(leagueId)
    setData(leagueData)
  }

  const rows = data.teams ? data.teams.map((team) => {
    const link = `/leagues/${leagueId}/${team.id}/admin`
    return ( 
      <Table.Tr key={team.name}>
        <Table.Td>{team.name}</Table.Td>
        <Table.Td>{team.players.length}</Table.Td>
        <Table.Td><Link to={link}>  <Button size="sm" variant="filled"> Edytuj </Button> </Link> </Table.Td>
        <Table.Td><Button size="sm" variant="gradient" gradient={{ from: 'red', to: 'pink', deg: 90 }} onClick={() => removeTeam(team.id)}> Usuń drużynę </Button> </Table.Td>
      </Table.Tr>
    )
})
  :
  null

  return (
    <ScrollArea>
      <Table horizontalSpacing="sm" verticalSpacing="sm" style={{ textAlign: 'center' }}>
      {rows && rows.length > 0 ? (
          <Table.Tbody>
            <Table.Tr>
              <Table.Th style={{ textAlign: 'center' }}>
                Nazwa drużyny
              </Table.Th>
              <Table.Th style={{ textAlign: 'center' }}>
                Liczba zawodników
              </Table.Th>
              <Table.Th style={{ textAlign: 'center' }}>
                Link do drużyny
              </Table.Th>
              <Table.Th style={{ textAlign: 'center' }}>
              </Table.Th>
            </Table.Tr>
          </Table.Tbody>
          ) : null}
        <Table.Tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Text fw={500} ta="center">
                  Nie dodano żadnych drużyn
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
          { data && data.numberOfTeams !== data.teams.length &&
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Link to={addTeamLink}>
                  <Button size="md"> 
                    Dodaj drużyne do ligi
                  </Button>
                </Link>
              </Table.Td>
            </Table.Tr>
          }         
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

