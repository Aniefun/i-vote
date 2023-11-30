// import axios from 'axios'

const Graph = {
    baseUrl: "https://api.studio.thegraph.com/query/59422/ivote/version/latest",

    postRequest: async function (query) {
        try {
            const response = await axios.post(this.baseUrl, { query })
            return { status: true, data: response.data.data }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
}

export default Graph