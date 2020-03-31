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
            fs.readFile(this.tokensPath, async (err, data) => {
                //If there was an error, that means the tokens weren't there
                if (err) return resolve(true);
                //Otherwise, use the tokens
                const token = JSON.parse(data);
                const {tokens: newTokens} = await this.authClient.refreshToken(token);
                this.authClient.setCredentials(newTokens);
                this.tokens = newTokens;
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
            scope: 'profile email https://www.googleapis.com/auth/calendar',
            access_type: 'offline'
        });
        //Return the url
        return url;
    }
    /**
     * Writes a refresh token to the token path
     * @param {string} token The refresh token
     */
    writeToken(token) {
        //Save the tokens
        fs.writeFile(this.tokensPath, JSON.stringify(token), (err) => {
            if (err) return console.log("Error writing refresh token to " + this.tokensPath);
            console.log("Wrote token to " + this.tokensPath);
        });
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
        this.writeToken(tokens.refresh_token);
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
        this.calendar = google.calendar({version: 'v3', auth: this.authClient});
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
    /**
     * Deletes the file containing the refresh token
     */
    async deleteToken() {
        //Delete the file
        fs.unlink(this.tokensPath, () => {});
    }
    /**
     * Creates an event for the client on a specified date
     * @param {object} client The client object as recieved from the database
     * @param {string} field The field of the client object that the event is attatched to
     * @param {Date} date The date that the event is to be scheduled
     */
    async createEvent(client, field, date) {
        const eventId = date.getTime().toString() + client.id;
        //Create the event object
        const customEvent = {
            summary: `${client.first_name} ${client.last_name}'s ${field}`,
            start: {
                dateTime: date.toJSON(),
                timeZone: 'America/New_York',
            },
            end: {
                dateTime: date.toJSON(),
                timeZone: 'America/New_York',
            },
            id: eventId
        }
        //See if the event exists first and is currently cancelled
        try {
            await this.calendar.events.get({calendarId: 'primary', eventId});
            console.log('Found event ' + eventId);
            customEvent.status = 'confirmed';
            await this.calendar.events.update({calendarId: 'primary', eventId, resource: customEvent});
            console.log(`Set ${eventId} to confirmed`);
        } catch (e) {
            console.log(customEvent);
            //Insert the event
            await this.calendar.events.insert({
                auth: this.authClient,
                calendarId: 'primary',
                resource: customEvent,
                eventId
            }, async (err, event) => {
                if (err) {
                    return console.log('Error adding event to calendar: ' + err.message + err.code + ". ");
                }
            });
        }
    }
    /**
     * Removes an event from a specified date that is attatched to a client
     * @param {Date} date The date the event is scheduled
     * @param {number} id The client's id number
     */
    async removeEvent(date, id) {
        //Get the correct format for the event
        const eventId = date.getTime().toString() + id;
        try {
            //Try to delete the event if it exists
            await this.calendar.events.delete({calendarId: 'primary', eventId});
        } catch (e) {
            //Notify the server that the event wasn't there
            console.log("Event wasn't present on " + eventId);
        }
    }
}
module.exports = Authenticator;