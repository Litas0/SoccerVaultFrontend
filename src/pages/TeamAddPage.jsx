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
                  ? 'Nazwa drużyny nie może byc krótsza niż 4 i dłuższa niż 20 znaków'
                  : null,
              description:
              values.description.length > 300
                  ? 'Opis drużyny nie może być dłuższy niż 300 znaków'
                  : null,
              stadionAdress:
              values.stadionAdress.trim().length > 100
                  ? 'Adres stadionu nie może być dłuższy niż 100 znaków'
                  : null,
          };
          }
    
          if (active === 2) {
            return {
                players: 
                values.players.length < 11
                    ? 'Drużyna nie może mieć mniej niż 11 zawodników'
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
          <Stepper.Step label="Pierwszy krok" description="Informacje o drużynie">
                <TextInput
                    label="Nazwa drużyny"
                    placeholder="Nazwa drużyny"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Opis drużyny"
                    placeholder="Opis drużyny"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
                <TextInput
                    label="Adres stadionu"
                    placeholder="Adres stadionu"
                    key={form.key('stadionAdress')}
                    {...form.getInputProps('stadionAdress')}
                />
            </Stepper.Step>

            <Stepper.Step label="Drugi krok" description="Zawodnicy drużyny">           
                    <PlayersTable form={form}/>
            </Stepper.Step>

          <Stepper.Completed>
              Drużyna została utworzona!
          </Stepper.Completed>
          </Stepper>

          <Group justify="flex-end" mt="xl">
          {active === 1 && (
              <Button variant="default" onClick={prevStep}>
                Cofnij
              </Button>
          )}
          {active === 0 && <Button onClick={nextStep}>Następny krok</Button>}
          {active === 1 && form.getValues().players.length < 11 && <Button disabled>Wymagane jest 11 zawodników</Button>}
          {active === 1 && form.getValues().players.length >= 11 && <Button onClick={nextStep}>Utwórz drużynę</Button>}
          {active === 2 && <Button onClick={goToYourLeague}>Wróć do zarządzania ligą</Button>}
          </Group>
      </Container>
    );
}

export default TeamAddPage; 