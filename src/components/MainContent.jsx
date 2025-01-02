import {
    Routes,
    Route
} from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'


import HomePage from '../pages/HomePage';
import LeagueSearchPage from '../pages/LeagueSearchPage';
import LeagueTablePage from '../pages/LeagueTablePage';
import LeagueResultsPage from '../pages/LeagueResultsPage';
import LeagueFixturesPage from '../pages/LeagueFixturesPage';
import CreateLeaguePage from '../pages/CreateLeaguePage';
import YourLeaguesListPage from '../pages/YourLeaguesListPage';
import LeagueAdminPage from '../pages/LeagueAdminPage';
import TeamAddPage from '../pages/TeamAddPage';
import ManageTeamPage from '../pages/ManageTeamPage';
import TeamViewPage from '../pages/TeamViewPage';

function MainContent() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return (
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/leagues" element={<LeagueSearchPage />} />
          <Route path="/leagues/:leagueId/table" element={<LeagueTablePage />} />
          <Route path="/leagues/:leagueId/results" element={<LeagueResultsPage />} />
          <Route path="/leagues/:leagueId/fixtures" element={<LeagueFixturesPage />} />
          <Route path="/leagues/:leagueId/:teamId" element={<TeamViewPage />} />
        </Routes>
    )
  } 

  return (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/leagues" element={<LeagueSearchPage />} />
          <Route path="/leagues/:leagueId/table" element={<LeagueTablePage />} />
          <Route path="/leagues/:leagueId/results" element={<LeagueResultsPage />} />
          <Route path="/leagues/:leagueId/fixtures" element={<LeagueFixturesPage />} />
          <Route path="/leagues/:leagueId/addTeam" element={<TeamAddPage />} />
          <Route path="/leagues/:leagueId/admin" element={<LeagueAdminPage />} />
          <Route path="/leagues/:leagueId/:teamId/admin" element={<ManageTeamPage />} />
          <Route path="/leagues/:leagueId/:teamId" element={<TeamViewPage />} />
          <Route path="/your_leagues" element={<YourLeaguesListPage />} />
          <Route path="/create" element={<CreateLeaguePage />} />
        </Routes>
  )
}

export default MainContent;