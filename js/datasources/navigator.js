export default class NavigatorDataSource {
    constructor() {

    }

    async start() {
        if (window.localStorage && window.localStorage.getItem('navigator')) {
            this.config = JSON.parse(window.localStorage.getItem('navigator'))
        } else {
            let jwtToken = prompt('Please enter your JWT token');

            if (!jwtToken) {
                throw new Error('JWT token is required');
            }

            this.config = {
                jwtToken: jwtToken
            };
        }

        let trackId = prompt('Please enter the track ID');
        let trackData = await this.getTrackData(trackId);
    }

    async getTrackData(trackId) {
        let url = `https://overlandnavigator.co.nz/admin/api/tracks/${trackId}`;
        let response = await this.makeRequest(url, 'GET');
        let data = await response.json();
        return data;
    }

    async makeRequest(url, method) {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${this.config.jwtToken}`
            }
        });
    }
}