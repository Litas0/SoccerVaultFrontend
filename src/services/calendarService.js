import axios from 'axios'

const teamsUrl = '/api/teams'
const calendarUrl = '/api/calendar'

const createTeam = async (formValues, leagueId) => {
    const team = {...formValues, league: leagueId}
    const res = await axios.put(teamsUrl, team)
    return res.data
}

const getTeamById = async (teamId) => {
    const res = await axios.get(`${teamsUrl}/${teamId}`)
    return res.data
}

const updateTeam = async (formValues, leagueId ,teamId) => {
    const team = {...formValues, league: leagueId, id: teamId}
    const res = await axios.put(`${teamsUrl}/${teamId}`, team)
    return res.data
}

const setMatchDate = async (roundId, homeTeamName, date) => {
    const res = await axios.put(`${calendarUrl}/${roundId}/${homeTeamName}/date`, { date: date })
    return res.data
}

const addResult = async (roundId, homeTeamName, homeTeamScore, awayTeamScore) => {
    const res = await axios.put(`${calendarUrl}/${roundId}/${homeTeamName}/result`, { score: { home: homeTeamScore, away: awayTeamScore} })
    return res.data
}

export default { createTeam, getTeamById, updateTeam, setMatchDate, addResult} 