import axios from 'axios'

const baseUrl = '/api/teams'

const createTeam = async (formValues, leagueId) => {
    const team = {...formValues, league: leagueId}
    const res = await axios.put(baseUrl, team)
    return res.data
}

const getTeamById = async (teamId) => {
    const res = await axios.get(`${baseUrl}/${teamId}`)
    return res.data
}

const updateTeam = async (formValues, leagueId ,teamId) => {
    const team = {...formValues, league: leagueId, id: teamId}
    const res = await axios.put(`${baseUrl}/${teamId}`, team)
    return res.data
}

const removeTeam = async (teamId) => {
    const res = await axios.delete(`${baseUrl}/${teamId}`)
    return res.data
}

export default { createTeam, getTeamById, updateTeam, removeTeam } 