import { LeagueHeader } from '../components/LeagueHeader'
import { LeagueResults } from '../components/LeagueResults';
import { ScrollArea } from '@mantine/core';
const LeagueResultsPage = () => {

    return (
        <ScrollArea h={800} type='always'>
            <LeagueHeader />
            <LeagueResults />
        </ScrollArea>
    )
}

export default LeagueResultsPage; 