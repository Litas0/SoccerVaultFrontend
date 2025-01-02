import { Center, Button } from '@mantine/core'
import { IconCalendar, IconArrowRight} from '@tabler/icons-react'

import leaguesService from '../services/leaguesService.js'

export function AdminCreateCalendar({ leagueId, setData }) {
    const generateCalendar = async () => {
        const res = await leaguesService.generateCalendar(leagueId)
        console.log(res)
        setData(res)
    }
    return (
    <Center>
        <Button
        variant="gradient"
        gradient={{ from: 'gray', to: 'blue', deg: 120 }}
        leftSection={<IconCalendar size={14} />}
        rightSection={<IconArrowRight size={14} />}
        size="md"
        onClick={generateCalendar}
        >  Wygeneruj kalendarz dla ligi </Button>
    </Center>
    )
}