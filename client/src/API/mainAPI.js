import axios from 'axios'

const addr = 'http://localhost:8080'

class API {
    async getAllJokes() {
        try {
            const response = await axios.get(`${addr}/`)
            return response.data.rows
        } catch (error) {
            throw error
        }
    }
    
    async createJoke(text) {
        try {
            const response = await axios.post(`${addr}/jokes`, { content: text })
            return response.data.rows[0]
        } catch (error) {
        throw error
        }
    }

    async deleteJoke(id) {
        try {
            await axios.delete(`${addr}/jokes/${id}`)
        } catch (error) {
            throw error
        }
    }

    async updateJoke(id, text) {
        try {
            const response = await axios.put(`${addr}/jokes/${id}`, { content: text })
            return response.data.rows[0]
        } catch (error) {
            throw error
        }
    }
}
const api = new API()

export default api