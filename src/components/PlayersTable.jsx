import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { ActionIcon, Badge, Group, Table, Text, NativeSelect, Button, TextInput } from '@mantine/core';

const positionColors = {
  Goalkeeper: 'green',
  Defender: 'yellow',
  Midfielder: 'blue',
  Striker: 'red',
};

export function PlayersTable({ form }) {

    const [playersState, setPlayersState] = useState(form.getValues().players);

    const [nameState, setNameState] = useState('');
    const [surnameState, setSurnameState] = useState('');
    const [positionState, setPositionState] = useState('Goalkeeper');
    const [numberState, setNumberState] = useState(0);


    const addPlayer = () => {
        const player = {
            name: nameState,
            surname: surnameState,
            position: positionState,
            number: numberState,
        }
        setPlayersState([...playersState, player]);
        form.setFieldValue('players', [...playersState, player]);
        setNameState('');
        setSurnameState('');
        setPositionState('Goalkeeper');
        setNumberState(0);
    }
  
    const removePlayer = (name, surname) => {
        const updatedPlayers = playersState.filter((player) => player.name !== name || player.surname !== surname);
        setPlayersState(updatedPlayers);
        form.setFieldValue('players', updatedPlayers);
    }

    const rows = playersState.map((player) => (
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
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="red" onClick={() => removePlayer(player.name, player.surname)}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  if (!playersState) return ( <div> Loading... </div>)

  return (
    <Table.ScrollContainer h={600}>
      <Table verticalSpacing="sm" stickyHeader='true'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Surname</Table.Th>
            <Table.Th>Position</Table.Th>
            <Table.Th>Number</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {rows}
            <Table.Tr key={playersState}>
                <Table.Th><TextInput placeholder="Name" onChange={(event) => setNameState(event.currentTarget.value)}/></Table.Th>
                <Table.Th><TextInput placeholder="Surname" onChange={(event) => setSurnameState(event.currentTarget.value)}/></Table.Th>
                <Table.Th><NativeSelect data={['Goalkeeper', 'Defender', 'Midfielder', 'Striker']} onChange={(event) => setPositionState(event.currentTarget.value)}/></Table.Th>
                <Table.Th><TextInput placeholder="Number" type="number" onChange={(event) => setNumberState(event.currentTarget.value)}/></Table.Th>
                <Table.Th><Button variant="filled" onClick={addPlayer}>Add player</Button></Table.Th>
            </Table.Tr> 
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}