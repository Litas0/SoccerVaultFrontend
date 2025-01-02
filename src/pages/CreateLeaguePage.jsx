import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react'

import CheckboxCard from '../components/CheckboxCard';
import leaguesService from '../services/leaguesService';

const CreateLeaguePage = () => {

    const [active, setActive] = useState(0);
    const { user } = useUser()
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          description: '',
          numberOfTeams: '',
          rematches: false,
        },
    
        validate: (values) => {
          if (active === 0) {
            return {
              name:
                values.name.trim().length > 20 || values.name.trim().length < 4
                  ? 'Lague name cant be shorter than 4 or longer than 20 characters'
                  : null,
              description:
                values.description.length > 300
                    ? 'Description cant be longer than 300 characters'
                    : null,
            };
          }
    
          if (active === 1) {
            return {
              numberOfTeams: Math.floor(values.numberOfTeams) < 4 || Math.floor(values.numberOfTeams) > 25 ? 'League must have between 4 and 25 teams' : null,
            };
          }
    
          return {};
        },
      });
    const submitLeague = () => {
      leaguesService.createLeague(form.getValues(), user.id, user.fullName)
    }
    const nextStep = () =>
    {     
      setActive((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        if (active === 1) {
          submitLeague();
        }
        return current < 2 ? current + 1 : current;
      });
    }
            
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    
    const goToYourLeagues = () => navigate('/your_leagues')
      return (
        <Container size='lg' >
          <Stepper active={active}>
            <Stepper.Step label="First step" description="League informations">
                <TextInput
                    label="League name"
                    placeholder="League Name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="League description"
                    placeholder="Description"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
            </Stepper.Step>
    
            <Stepper.Step label="Second step" description="League configuration">
              <TextInput
                type="number"
                label="Number of teams"
                placeholder="Number of teams"
                key={form.key('numberOfTeams')}
                {...form.getInputProps('numberOfTeams')}
              />
              <CheckboxCard key={form.key('rematches')} form={form} {...form.getInputProps('rematches')}/>
            </Stepper.Step>

            <Stepper.Completed>
              Creation Completed!
            </Stepper.Completed>
          </Stepper>
    
          <Group justify="flex-end" mt="xl">
            {active === 1 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active === 0 && <Button onClick={nextStep}>Next step</Button>}
            {active === 1 && <Button onClick={nextStep}>Create League</Button>}
            {active === 2 && <Button onClick={goToYourLeagues}>See your leagues</Button>}
          </Group>
        </Container>
      );
}

export default CreateLeaguePage; 