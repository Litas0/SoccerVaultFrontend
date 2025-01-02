import { useState } from 'react';
import { Title, Button, Modal, Grid, Input, Text, Center } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';

import calendarService from '../services/calendarService';
export function Match( { m, roundId }) {

    const [date, setDate] = useState(null);
    const [match, setMatch] = useState(m);
    const [homeScore, setHomeScore] = useState(null);
    const [awayScore, setAwayScore] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);


    const addDate = async () => {
        const updatedMatch = await calendarService.setMatchDate(roundId, match.homeTeamName, date)
        setMatch(updatedMatch)
        setDate(null)
    }

    const addResult = async () => {
        const updatedMatch = await calendarService.addResult(roundId, match.homeTeamName, homeScore, awayScore)
        console.log(updatedMatch)
        setMatch(updatedMatch)
        setHomeScore(null)
        setAwayScore(null)
        close()
    }

    if (!match) return (<div> Ładowanie... </div>)

    const modal = (
        <>
            <Grid>
                <Grid.Col span={5}> 
                    <Text size="lg">{match.homeTeamName}</Text>                  
                </Grid.Col>
                <Grid.Col span={2}> 
                    <Center>
                        <Text size="lg">vs</Text>
                    </Center>                   
                </Grid.Col>
                <Grid.Col span={5}> 
                    <Text size="lg">{match.awayTeamName}</Text>                  
                </Grid.Col>
                <Grid.Col span={5}>
                    <Input placeholder="Bramki drużyny 1" type='number' onChange={(event) => setHomeScore(event.currentTarget.value)}/> 
                </Grid.Col>
                <Grid.Col span={2}> 
                    <Center>
                        <Text size="lg">:</Text>
                    </Center>                   
                </Grid.Col>
                <Grid.Col span={5}>
                    <Input placeholder="Bramki drużyny 2" type='number' onChange={(event) => setAwayScore(event.currentTarget.value)}/> 
                </Grid.Col>
                <Grid.Col span={12}>
                    <Center>
                        <Button variant="filled" color="indigo" onClick={() => addResult()}>Dodaj wynik</Button>
                    </Center>  
                </Grid.Col>
            </Grid>
        </>
    )

    return (
    <>
    <Title order={2}>
        {match.homeTeamName} vs {match.awayTeamName}
    </Title>
    {!match.date && 
        <DateTimePicker
        miw={200}
        clearable
        valueFormat="YYYY MM DD"
        value={date}
        onChange={setDate}
        label="Data meczu"
        placeholder="Data meczu"/>}
    {date &&
        <Button 
        size="sm" 
        color="green" 
        variant="filled" 
        onClick={() => addDate()}>
            Ustal date meczu
        </Button>}
    {match.date && !match.played &&
        <Title order={5}>{match.date.slice(0,10)} {match.date.slice(11,16)}</Title>}
    {match.date && !match.played && 
        <>
            <Modal opened={opened} onClose={close}>
                {modal}
            </Modal>
            <Button 
            size="sm" 
            color="yellow" 
            variant="filled"
            onClick={open}>
            Dodaj wynik</Button>
        </>}
    {match.date && match.played && 
    <Title order={3}>{match.score.home} : {match.score.away}</Title>}
    </>
)}