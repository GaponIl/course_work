import axios from 'axios'

const addr = 'http://localhost:8080'
axios.defaults.withCredentials = true;

class API {

    async getUser() {
        try {
            const response = await axios.get(`${addr}/me`)
            return response.data
        } catch (error) {
            throw error
        }
    }

    async signIn(email, password) {
        try {
            const response = await axios.post(`${addr}/signin`, { email: email, password: password })
            return response.data
        } catch (error) {
            throw error
        }
    }

    async signUp(username, email, password) {
        try {
            const response = await axios.post(`${addr}/signup`, { username: username, email: email, password: password })
            return response.data
        } catch (error) {
            throw error
        }
    }

    async signOut() {
        try {
            const response = await axios.post(`${addr}/signout`)
            return response.data
        } catch (error) {
            throw error
        }
    }
    async getAllJokes() {
        try {
            const response = await axios.get(`${addr}/`)
            // console.log(response.data);
            
            return response.data.rows
        } catch (error) {
            throw error
        }
    }

    async getDailyJoke() {
        try {
            const response = await axios.get(`${addr}/dayJoke`)
            return response.data
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