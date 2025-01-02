import { Button, Group, Collapse, Flex, Container } from '@mantine/core';
import { useState } from 'react';
import { Match } from './Match';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react'
export function AdminManageCalendar({ calendar }) {

    let s = [true] 

    for (let i = 1; i < calendar.length; i++) {
        s.push(false)
    }

    const [opened, setOpend] = useState(s);
    const updateOpened = (index) => {
        const newOpened = [...opened];
        newOpened[index] =!newOpened[index];
        setOpend(newOpened);
    }

    const rounds = calendar.map((round) => (
        <Container mx="auto" key={round.id}>
            <Group justify="center" mb={5}>
                <Button variant="transparent" color="black" size="xl" onClick={() => updateOpened(round.number - 1)}
                    rightSection={!opened[round.number - 1] ? <IconCaretDownFilled /> : <IconCaretUpFilled />}> Kolejka {round.number}</Button>
            </Group>
            <Collapse in={opened[round.number - 1]}>
                <Flex
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
                >
                    {round.matches.map((match) => (
                        <Match key={match.homeTeamId} m={match} roundId={round.id} />
                    ))}
                </Flex>
            </Collapse>
        </Container>
    ))

    return (
        <>
            {rounds}
        </>
    )
}