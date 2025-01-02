import axios from 'axios'

const baseUrl = '/api/leagues'

const getLeagues = async () => {
    const res = await axios.get(baseUrl)
    const returnData = res.data.map(league => ({
            id: league.id,
            name: league.name,
            numberOfTeams: league.numberOfTeams,
            owner: league.ownerFullName,
            calendar: league.calendar
        }))
    return returnData
}

const createLeague = async (formValues, userId, userFullName) => {
    const league = {...formValues, ownerId: userId, ownerFullName: userFullName}
    const res = await axios.put(baseUrl, league)
    return res.data
}

const getLeaguesOfUser = async (userId) => {
    const res = await axios.get(`${baseUrl}/user/${userId}`)
    const returnData = res.data.map(league => ({
            id: league.id, 
            name: league.name,
            numberOfTeams: league.numberOfTeams,
            teamsAdded: league.teams.length,
            leagueStarted: league.calendar.length > 0 ? true : false
        }))
    return returnData
}

const getLeagueById = async (leagueId) => {
    const res = await axios.get(`${baseUrl}/${leagueId}`)
    if (res.data === undefined) return null
    else return res.data
}

const addTeamToLeague = async (leagueId,teamId) => {
    const res = await axios.put(`${baseUrl}/${leagueId}/addTeam`, teamId)
    return res.data
}

const generateCalendar = async (leagueId) => {
    const res = await axios.put(`${baseUrl}/${leagueId}/calendar`)
    return res.data
}

const removeLeague = async (leagueId) => {
    const res = await axios.delete(`${baseUrl}/${leagueId}`)
    return res.data
}

const getLeagueTable = async (leagueId) => {
    const res = await axios.get(`${baseUrl}/${leagueId}/table`)
    return res.data
}

const getLeagueResults = async (leagueId) => {
    const res = await axios.get(`${baseUrl}/${leagueId}/results`)
    return res.data
}

const getLeagueFixtures = async (leagueId) => {
    const res = await axios.get(`${baseUrl}/${leagueId}/upcoming`)
    return res.data
}

export default { 
    createLeague, 
    getLeagues, 
    getLeaguesOfUser, 
    getLeagueById, 
    addTeamToLeague, 
    generateCalendar,
    removeLeague,
    getLeagueTable,
    getLeagueResults,
    getLeagueFixtures
}