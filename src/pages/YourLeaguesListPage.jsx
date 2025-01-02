import { AdminLeagueList } from '../components/AdminLeagueList'
import { Title } from '@mantine/core'
const YourLeaguesListPage = () => {

    return (
        <>
            <Title order={1} c="blue" style={{ textAlign: 'center',
             marginBottom: '40px'
             }}> 
                Twoje ligi
            </Title>
            <AdminLeagueList />
        </>        
    )
}

export default YourLeaguesListPage; 