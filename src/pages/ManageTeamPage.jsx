import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { Stepper, Button, Group, TextInput, Container, ScrollArea} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';

import { PlayersTable } from '../components/PlayersTable';
import teamsService from '../services/teamsService';

const ManageTeamPage = () => {

    const [active, setActive] = useState(0);
    const match = useMatch('/leagues/:leagueId/:teamId/admin')
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          description: '',
          stadionAdress: '',
          players: []
        },
    
        validate: (values) => {
          if (active === 0) {
            return {
                name:
                values.name.trim().length > 20 || values.name.trim().length < 4
                    ? 'Team name cant be shorter than 4 or longer than 20 characters'
                    : null,
                description:
                values.description.length > 300
                    ? 'Description cant be longer than 300 characters'
                    : null,
                stadionAdress:
                values.stadionAdress.trim().length > 100
                    ? 'Stadion adress cant be longer than 100 characters'
                    : null,
            };
          }
    
          if (active === 2) {
            return {
                players: 
                values.players.length < 11
                    ? 'Team must have at least 11 players'
                    : null,
            };
          }  
          return {};
        },
      });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await teamsService.getTeamById(match.params.teamId)
                if (data) {
                form.setValues({name: data.name,
                description: data.description,
                stadionAdress: data.stadionAdress,
                players: data.players})
                }              
            } catch (error) {
                console.error("Failed to fetch team data:", error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[match.params.teamId])

    const submitTeam = () => {
        teamsService.updateTeam(form.getValues(), match.params.leagueId, match.params.teamId)
    }
    const nextStep = () =>
    {     
      setActive((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        if (active === 1) {
          submitTeam();
        }
        return current < 2 ? current + 1 : current;
      });
    }
            
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    
    const goToYourLeague = () => navigate(`/leagues/${match.params.leagueId}/admin`)

    return (
    <ScrollArea>
        <Container size='lg' >
            <Stepper active={active}>
            <Stepper.Step label="First step" description="Manage team informations">
                <TextInput
                    label="Team name"
                    placeholder="Team Name"
                    defaultValue={form.getValues().name}
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Team description"
                    placeholder="Description"
                    defaultValue={form.getValues().description}
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
                <TextInput
                    label="Stadion address"
                    placeholder="Stadion address"
                    defaultValue={form.getValues().stadionAdress}
                    key={form.key('stadionAdress')}
                    {...form.getInputProps('stadionAdress')}
                />
            </Stepper.Step>

            <Stepper.Step label="Second step" description="Manage players in the team">           
                    <PlayersTable form={form}/>
            </Stepper.Step>

            <Stepper.Completed>
                Team update completed!
            </Stepper.Completed>
            </Stepper>

            <Group justify="flex-end" mt="xl">
            {active === 1 && (
                <Button variant="default" onClick={prevStep}>
                Back
                </Button>
            )}
            {active === 0 && <Button onClick={nextStep}>Next step</Button>}
            {active === 1 && form.getValues().players.length < 11 && <Button disabled>You need at least 11 players</Button>}
            {active === 1 && form.getValues().players.length >= 11 && <Button onClick={nextStep}>Update Team</Button>}
            {active === 2 && <Button onClick={goToYourLeague}>Back to league managment</Button>}
            </Group>
        </Container>
    </ScrollArea>
    );
}

export default ManageTeamPage; 