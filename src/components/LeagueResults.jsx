import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import {
    Container,
    Title,
    Flex,
    Group
} from '@mantine/core';

import leaguesService from '../services/leaguesService';

export function LeagueResults() {

    const [results, setResults] = useState();
    const match = useMatch('/leagues/:id/results')

    useEffect(() => {
        leaguesService.getLeagueResults(match.params.id)
        .then(resultsRecived => {
            setResults(resultsRecived.reverse())
        })
    }, [match.params.id])

    const rounds = results ? results.map((round, index) => {
        if (round.length === 0) return null
        else return (
            <Container mx="auto" key={round.id}>
                <Group justify="center" mb={20}>
                    <Title> Round {results.length - index}</Title>
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
                                <Title order={6} mt={-8}>
                                    {match.date.slice(0,10)} {match.date.slice(11,16)}
                                </Title>
                                <Title order={2} mt={-10}>
                                    {match.score.home} : {match.score.away}
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