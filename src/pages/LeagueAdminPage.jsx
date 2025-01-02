import { useMatch } from 'react-router-dom';
import { Button, Center, Container, ScrollArea, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

import leaguesService from '../services/leaguesService'
import { AdminTeamsList } from '../components/AdminTeamsList'
import { AdminCreateCalendar } from '../components/AdminCreateCalendar'
import { AdminManageCalendar } from '../components/AdminManageCalendar'
import { useState, useEffect } from 'react';

const LeagueAdminPage = () => {

    const match = useMatch('/leagues/:id/admin')
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const leagueData = await leaguesService.getLeagueById(match.params.id)
                setData(leagueData)
            } catch (error) {
                console.error("Failed to fetch league data:", error)
            }
        }
        fetchData()
    }, [match.params.id])

    const removeLeague = async () => {
        await leaguesService.removeLeague(match.params.id)
        navigate('/your_leagues')
    }

    if (!data) {
      return <div>Loading...</div>
    }
    return (
        <ScrollArea h={800}>
            <Title order={1} c="blue" style={{ textAlign: 'center',
             marginBottom: '40px'
             }}> 
                {data ? data.name : null} 
            </Title>
            <Container>
              {data && data.calendar.length === 0 && <AdminTeamsList data={data} leagueId={match.params.id} setData={setData}/>}
              {data && data.numberOfTeams === data.teams.length && data.calendar.length === 0 && <AdminCreateCalendar leagueId={match.params.id} setData={setData}/>}
              {data && data.numberOfTeams === data.teams.length && data.calendar.length > 0 && <AdminManageCalendar calendar={data.calendar}/>}
              <Center mt={20}> 
                <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'pink', deg: 90 }}
                onClick={removeLeague} 
                size='md'> 
                    Delate League 
                </Button> 
              </Center>
            </Container>
        </ScrollArea>      
    )
}

export default LeagueAdminPage; 