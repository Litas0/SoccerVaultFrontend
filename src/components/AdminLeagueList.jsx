import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ScrollArea,
  Table,
  Text,
  Button,
  Checkbox
} from '@mantine/core';
import { useUser } from '@clerk/clerk-react'
import { IconCheck } from '@tabler/icons-react'

import leaguesService from '../services/leaguesService';

export function AdminLeagueList() {

  const [data, setdata] = useState();
  const { user } = useUser()

  useEffect(() => {
    leaguesService.getLeaguesOfUser(user.id)
    .then(leaguesRecived => {
      setdata(leaguesRecived)
    })
  }, [user.id])

  const rows = data ? data.map((row) => {
    const link = `/leagues/${row.id}/admin`
    return ( 
      <Table.Tr key={row.name}>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>{row.numberOfTeams}</Table.Td>
        <Table.Td>{row.teamsAdded}</Table.Td>
        <Table.Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Checkbox icon={IconCheck} color="lime.8" checked={row.leagueStarted} readOnly={true}/></Table.Td>
        <Table.Td><Link to={link}>  <Button size="sm"> Zarządzaj </Button> </Link>  </Table.Td>
      </Table.Tr>
    )
})
  :
  null

  return (
    <ScrollArea>
      <Table horizontalSpacing="sm" verticalSpacing="sm" style={{ textAlign: 'center' }}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>
              Nazwa ligi
            </Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>
              Rozmiar ligi
            </Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>
              Dodane drużyny 
            </Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>
              Kalendarz wygenerowany
            </Table.Th>
            <Table.Th>
            </Table.Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Text fw={500} ta="center">
                  Nie utworzono żadnych lig
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}