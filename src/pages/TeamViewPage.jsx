import { useState, useEffect } from 'react';
import { useMatch} from 'react-router-dom';
import { Table, Badge, Text, Grid, Center, Title, Flex, Group, Button} from '@mantine/core';
import { useNavigate } from 'react-router';

import teamsService from '../services/teamsService';
import leaguesService from '../services/leaguesService';

const TeamViewPage = () => {

    const match = useMatch('/leagues/:leagueId/:teamId')

    const [team, setTeam] = useState();
    const [leagueName, setLeagueName] = useState();

    useEffect(() => {
        teamsService.getTeamById(match.params.teamId)
        .then(teamRecived => {
          setTeam(teamRecived)
        })
        leaguesService.getLeagueById(match.params.leagueId)
        .then(leagueRecived => {
          setLeagueName(leagueRecived.name)
        })
    }, [match.params.teamId, match.params.leagueId])

    const navigate = useNavigate();     
    
    const backToLeagueTable = () => navigate(`/leagues/${match.params.leagueId}/table`)

    const positionColors = {
        Goalkeeper: 'green',
        Defender: 'yellow',
        Midfielder: 'blue',
        Striker: 'red',
        Bramkarz: 'green',
        Obrońca: 'yellow',
        Pomocnik: 'blue',
        Napastnik: 'red',
      };

    const rows = team ? team.players.map((player) => (
        <Table.Tr key={player.name}>
          <Table.Td>
              <Text fz="sm" fw={500}>
                {player.name}
              </Text>
          </Table.Td>
          <Table.Td>
              <Text fz="sm" fw={500}>
                {player.surname}
              </Text>
          </Table.Td>
          <Table.Td>
            <Badge color={positionColors[player.position]} variant="light">
              {player.position}
            </Badge>
          </Table.Td>
          <Table.Td>
            <Text fz="sm">{player.number}</Text>
          </Table.Td>
        </Table.Tr>
      )) : null

    if (!team || !leagueName) return (<div> Ładowanie... </div>) 

    return (
      <Grid>
        <Grid.Col span={12}>
          <Center>
            <Title>{team.name}</Title>
          </Center>         
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Group>
              <Title order={4}> Liga: </Title>
              <Text size="md" ml={10}> {leagueName} </Text>
            </Group>
            <Group>
              <Title order={4}> Opis: </Title>
              <Text size="md" ml={10}> {team.description} </Text>
            </Group>
          </Flex>
        </Grid.Col>
        <Grid.Col span={6}>       
          <Center>
            <Button onClick={backToLeagueTable}>Wróć do tabeli ligi</Button>
          </Center>  
        </Grid.Col>
        <Grid.Col span={12}>
          <Center>
            <Title order={3}>Zawodnicy</Title>
          </Center>         
        </Grid.Col>
        <Grid.Col span={2}>
        </Grid.Col>
        <Grid.Col span={8}>
          <Table.ScrollContainer h={600}>
              <Table verticalSpacing="sm" stickyHeader='true'>
                  <Table.Thead>
                  <Table.Tr>
                      <Table.Th>Imie</Table.Th>
                      <Table.Th>Nazwisko</Table.Th>
                      <Table.Th>Pozycja</Table.Th>
                      <Table.Th>Numer</Table.Th>
                  </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                      {rows}
                  </Table.Tbody>
              </Table>
          </Table.ScrollContainer>
        </Grid.Col>
        
      </Grid>
    );
}

export default TeamViewPage; 