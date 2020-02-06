const {google} = require('googleapis');
const fs = require('fs');
/**
 * @author Ryan Wolf
 * @file googleauth.js
 * Handles anything to do with authenticating the user and getting user resources
 */
class Authenticator {
    /**
     * Creates a new authenticator object
     * @param {string} clientId The client id for the application
     * @param {string} clientSecret The client secret for the application
     * @param {string} redirectURL The redirect url for the applciation
     */
    constructor(clientId, clientSecret, redirectURL) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectURL = redirectURL;
        //Path for the tokens
        this.tokensPath = 'tokens.json';
        //Generate the authentication client
        this.authClient = new google.auth.OAuth2(this.clientId, this.clientSecret, this.redirectURL);
    }
    /**
     * Checks if tokens.json has valid tokens that don't need to be refreshed
     * @returns {Promise<boolean>} if tokens.json has valid tokens
     */
    needsTokens() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.tokensPath, (err, data) => {
                //If there was an error, that means the tokens weren't there
                if (err) return resolve(true);
                //Otherwise, use the tokens
                const tokens = JSON.parse(data);
                this.authClient.setCredentials(tokens);
                this.tokens = tokens;
                resolve(false);
            });
        });
    }
    /**
     * Generates and returns a url to use for authenticating the user
     * @returns {string} The url that can be used to authenticate the user
     */
    getAuthURL() {
        //Create the url from the Oauth client
        const url = this.authClient.generateAuthUrl({
            //The application has access to the user's profile, email, and calendar
            scope: 'profile email https://www.googleapis.com/auth/calendar'
        });
        //Return the url
        return url;
    }
    /**
     * Retrieves the access tokens for the user specified via the code parameter
     * @param {string} code The code parameter of the url.
     * @returns {Credentials} The access tokens
     */
    async retAccessTokens(code) {
        //Get the tokens from the Oauth client
        const {tokens} = await this.authClient.getToken(code);
        //Set the credentials of the internal client
        this.authClient.setCredentials(tokens);
        //Save the tokens
        fs.writeFile(this.tokensPath, JSON.stringify(tokens), (err) => {
            if (err) return console.log("Error writing tokens to " + this.tokensPath);
            console.log("Wrote tokens to " + this.tokensPath);
        });
        //Create a calendar
        this.calendar = google.calendar({version: 'v3', auth: this.authClient});
        //Return the tokens
        this.tokens = tokens;
        return tokens;
    }
    /**
     * Gets the access tokens for the user
     * @returns {Credentials} The access tokens
     */
    getAccessTokens() {
        return this.tokens;
    }
    /**
     * Gets the user's information
     * @returns {oauth2_v2.Schema$Userinfoplus} The object containing all the basic user information
     */
    async getUser() {
        //Generate an api to interact with the user's information
        const oauth = google.oauth2({
            //Pass the Oauth client with all the user's information
            auth: this.authClient,
            version: 'v2'
        });
        //Get the user data and deconstruct it
        const {data} = await oauth.userinfo.get();
        return data;
    }
    async listEvents() {
        this.calendar.events.list({
            calendarId: 'primary',
            timeMax: (new Date()).toISOString(),
        }, (err, response) => {
            if (err) return console.log('Error logging in with calendar: ' + err);
            const events = response.data.items;
            if (events.length) {
                console.log("Found these events: ");
                events.map(event => {
                    console.log(`${event.start.dateTime || event.start.date} - ${event.summary}`);
                });
            } else
                console.log('No events found');
        });
    }
    async createEvent() {
        //Create the event object
        const customEvent = {
            summary: 'Tech Prep showcase',
            location: '500 E Franklin St, Dayton, OH 45459',
            description: 'Global Natural Softare will win.',
            start: {
                dateTime: new Date(2020, 1, 14, 17).toJSON(),
                timeZone: 'America/New_York',
            },
            end: {
                dateTime: new Date(2020, 1, 14, 17).toJSON(),
                timeZone: 'America/New_York',
            }
        }
        //Insert the event
        this.calendar.events.insert({
            auth: this.authClient,
            calendarId: 'primary',
            resource: customEvent,
        }, (err, event) => {
            if (err) return console.log('Error adding event to calendar: ' + err.message);
            console.log('Event created: ' + event);
        });
    }
}
module.exports = Authenticator;