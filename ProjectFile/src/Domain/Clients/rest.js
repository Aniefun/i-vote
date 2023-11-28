import axios from 'axios'

const Rest = {
    baseUrl: "https://ivote.render.com",

    postRequest: async function (endpoint, body) {
        try {
            const response = await axios.post(this.baseUrl + endpoint, body)
            return { status: true, data: response.data }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
}

export default Rest