import { useState, useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import {
  Table,
  Text
} from '@mantine/core';

import leaguesService from '../services/leaguesService';

export function LeagueTable() {

  const [table, setTable] = useState();
  const match = useMatch('/leagues/:id/table')

  useEffect(() => {
    leaguesService.getLeagueTable(match.params.id)
    .then(tableRecived => {
      setTable(tableRecived)
    })
  }, [match.params.id])


  const rows = table ? table.map((team, index) => {
    const link = `/leagues/${match.params.id}/${team.id}`
    return ( 
      <Table.Tr key={team.id}>
        <Table.Td>
          <Text fz="sm" fw={500}>
            {index + 1}
          </Text>
        </Table.Td>
        <Table.Td>
          <Link to={link} style={{ textDecoration: 'none' }}>
            <Text fz="sm" fw={700} c='black'>
              {team.name}
            </Text>
          </Link>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.played}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.wins}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.draws}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.losses}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.goalsFor}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.goalsAgainst}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">
            {team.goalsDiff}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" fw={700}>
            {team.points}
          </Text>
        </Table.Td>
      </Table.Tr>
    )
})
  :
  null

  return (
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
    <Table.Tbody>
        <Table.Tr>
            <Table.Th>
                Pozycja
            </Table.Th>
            <Table.Th>
                Drużyna
            </Table.Th>
            <Table.Th>
                Rozegrane mecze
            </Table.Th>
            <Table.Th>
                Zwycięstwa
            </Table.Th>
            <Table.Th>
                Remisy
            </Table.Th>
            <Table.Th>
                Porażki
            </Table.Th>
            <Table.Th>
                Gole zdobyte
            </Table.Th>
            <Table.Th>
                Gole stracone
            </Table.Th>
            <Table.Th>
                Różnica goli
            </Table.Th>
            <Table.Th>
                Punkty
            </Table.Th>
        </Table.Tr>
    </Table.Tbody>
    <Table.Tbody>
        {rows && rows.length > 0 ? (
        rows
        ) : (
        <Table.Tr>
            <Table.Td colSpan={10}>
              <Text fw={500} ta="center">
                Liga pusta
              </Text>
            </Table.Td>
        </Table.Tr>
        )}
    </Table.Tbody>
    </Table>
  );
}