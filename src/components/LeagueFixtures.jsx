import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import {
    Container,
    Title,
    Flex,
    Group
} from '@mantine/core';

import leaguesService from '../services/leaguesService';

export function LeagueFixtures() {

    const [fixtures, setFixtures] = useState();
    const match = useMatch('/leagues/:id/fixtures')

    useEffect(() => {
        leaguesService.getLeagueFixtures(match.params.id)
        .then(fixturesRecived => {
            setFixtures(fixturesRecived)
        })
    }, [match.params.id])

    const rounds = fixtures ? fixtures.map((round, index) => {
        if (round.length === 0) return null
        else return (
            <Container mx="auto" key={round.id}>
                <Group justify="center" mb={20}>
                    <Title> Kolejka {index + 1}</Title>
                </Group>                
                    <Flex
                    gap="xl"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                    >
                        {round.map((match,index) => (
                            <Flex
                            gap="sm"
                            justify="center"
                            align="center"
                            direction="column"
                            wrap="wrap"
                            key={index}
                            mb={20}
                            >
                                <Title order={2}>
                                    {match.homeTeamName} vs {match.awayTeamName}
                                </Title>
                                <Title order={3} mt={-8}>
                                    {match.date ? match.date.slice(0,10) : 'Data nie'} {match.date ? match.date.slice(11,16) : 'ustalona'}
                                </Title>
                            </Flex>
                        ))}
                    </Flex>
            </Container>
        )
    })
    : null

    return (
        <>
            {rounds}
        </>
    )
}