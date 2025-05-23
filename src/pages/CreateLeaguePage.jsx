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
                  ? 'Nazwa ligi nie może być krótsza niż 4, ani dłuższa niż 20 znaków' 
                  : null,
              description:
                values.description.length > 300
                    ? 'Opis ligi nie może być dłuższy niż 300 znaków'
                    : null,
            };
          }
    
          if (active === 1) {
            return {
              numberOfTeams: Math.floor(values.numberOfTeams) < 4 || Math.floor(values.numberOfTeams) > 25 ? 'Liga musi mieć między 4, a 25 zespołów' : null,
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
            <Stepper.Step label="Pierwszy krok" description="Informacje o lidze">
                <TextInput
                    label="Nazwa ligi"
                    placeholder="Nazwa ligi"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Opis ligi"
                    placeholder="Opis ligi"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
            </Stepper.Step>
    
            <Stepper.Step label="Drugi krok" description="Konfiguracja ligi">
              <TextInput
                type="number"
                label="Rozmiar ligi"
                placeholder="Rozmiar ligi"
                key={form.key('numberOfTeams')}
                {...form.getInputProps('numberOfTeams')}
              />
              <CheckboxCard key={form.key('rematches')} form={form} {...form.getInputProps('rematches')}/>
            </Stepper.Step>

            <Stepper.Completed>
              Liga utworzona!
            </Stepper.Completed>
          </Stepper>
    
          <Group justify="flex-end" mt="xl">
            {active === 1 && (
              <Button variant="default" onClick={prevStep}>
                Cofnij
              </Button>
            )}
            {active === 0 && <Button onClick={nextStep}>Następny krok</Button>}
            {active === 1 && <Button onClick={nextStep}>Utwórz ligę</Button>}
            {active === 2 && <Button onClick={goToYourLeagues}>Przeglądaj swoje ligi</Button>}
          </Group>
        </Container>
      );
}

export default CreateLeaguePage; 