import { useState } from 'react';
import { useMatch} from 'react-router-dom';
import { Stepper, Button, Group, TextInput, Container} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';

import { PlayersTable } from '../components/PlayersTable';
import teamsService from '../services/teamsService';

const TeamAddPage = () => {

    const [active, setActive] = useState(0);
    const match = useMatch('/leagues/:id/addTeam')

    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          description: '',
          stadionAdress: '',
          players: [],
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
    const submitTeam = () => {
        teamsService.createTeam(form.getValues(), match.params.id)
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
    
    const goToYourLeague = () => navigate(`/leagues/${match.params.id}/admin`)

    return (
      <Container size='lg' >
          <Stepper active={active}>
          <Stepper.Step label="First step" description="Team informations">
              <TextInput
                  label="Team name"
                  placeholder="Team Name"
                  key={form.key('name')}
                  {...form.getInputProps('name')}
              />
              <TextInput
                  label="Team description"
                  placeholder="Description"
                  key={form.key('description')}
                  {...form.getInputProps('description')}
              />
              <TextInput
                  label="Stadion address"
                  placeholder="Stadion address"
                  key={form.key('stadionAdress')}
                  {...form.getInputProps('stadionAdress')}
              />
          </Stepper.Step>

          <Stepper.Step label="Second step" description="Add players to the team">                   
              <PlayersTable form={form}/>       
          </Stepper.Step>

          <Stepper.Completed>
              Team creation completed!
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
          {active === 1 && form.getValues().players.length >= 11 && <Button onClick={nextStep}>Create Team</Button>}
          {active === 2 && <Button onClick={goToYourLeague}>Back to league managment</Button>}
          </Group>
      </Container>
    );
}

export default TeamAddPage; 