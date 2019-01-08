import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import * as config from '../marvel.config.json';
import crypto from 'crypto';
import { getIdFromResourceURI } from '../utils';
import { get } from 'lodash';

// API url
const apiURL:string = `${config.baseUrl}/${config.apiVersion}/${config.rootPath}/`;

export class MarvelAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = apiURL;
    }

    willSendRequest(request: RequestOptions ) {
        // request authorization - https://developer.marvel.com/documentation/authorization
        const ts = new Date().getTime().toString();
        const publicApiKey = this.context.publicApiKey;
        const hash = crypto.createHash('md5').update(`${ts}${this.context.privateApiKey}${publicApiKey}`).digest('hex');
        request.params.set('ts', ts);
        request.params.set('apikey', publicApiKey);
        request.params.set('hash', hash);
    }

    // Characters
    async findCharacters(params:FindCharactersParams) {
        return params;
    }

    async getCharacterById(id: Number) {
        return this.get(`characters/${id}`).then(resp => {
            const characterResp = resp.data.results[0] || false;
            if (!characterResp) return null;

            // formating needed fields
            let formattedCharacterFields = {
                id: characterResp.id.toString(),
                comics: get(characterResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                stories: get(characterResp, 'stories.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                })
            };
            
            return Object.assign(characterResp, formattedCharacterFields);
        });
    }

    // Comics
    async findComics(params:FindComicsParams) {
        return params;
    }

    async getComicById(id: Number) {
        return this.get(`comics/${id}`).then(resp => {
            const comicResp = resp.data.results[0] || false;
            if (!comicResp) return null;

            // formating needed fields
            let formattedComicFields = {
                id: comicResp.id.toString(),
                images: get(comicResp, 'images', []),
                characters: get(comicResp, 'characters.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(comicResp, 'stories.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                })
            };
            
            return Object.assign(comicResp, formattedComicFields);
        });
    }

    // Stories
    async findStories(params:FindCharactersParams) {
        return params;
    }

    async getStoryById(id: Number) {
        return this.get(`stories/${id}`).then(resp => {
            const storyResp = resp.data.results[0] || false;
            if (!storyResp) return null;

            // formating needed fields
            let formattedStoryFields = {
                id: storyResp.id.toString(),
                images: get(storyResp, 'images', []),
                characters: get(storyResp, 'characters.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                comics: get(storyResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                originalIssue: (get(storyResp, 'originalIssue.resourceURI', false)) ? getIdFromResourceURI(storyResp.originalIssue.resourceURI) : null
            };
            
            return Object.assign(storyResp, formattedStoryFields);
        });
    }
}

// params interfaces
interface FindCharactersParams {
    /** Return only characters matching the specified full character name (e.g. Spider-Man). */
    name?: string;
    /** Return characters with names that begin with the specified string (e.g. Sp). */
    nameStartsWith?: string;
    /** Return only characters which have been modified since the specified date. */
    modifiedSince?: Date;
    /** Return only characters which appear in the specified comics (accepts a comma-separated list of ids). */
    comics?: Number;
    /** Return only characters which appear the specified series (accepts a comma-separated list of ids). */
    series?: Number;
    /** Return only characters which appear in the specified events (accepts a comma-separated list of ids). */
    events?: Number;
    /** Return only characters which appear the specified stories (accepts a comma-separated list of ids). */
    stories?: Number;
    /** Order the result set by a field or fields. Add a "-" to the value sort in descending order. Multiple values are given priority in the order in which they are passed. */
    orderBy?: string;
    /** Limit the result set to the specified number of resources. */
    limit?: Number;
    /** Skip the specified number of resources in the result set. */
    offset?: Number;
}

interface FindComicsParams {
    /** Filter by the issue format (e.g. comic, digital comic, hardcover). */
    format?: string;
    /** Filter by the issue format type (comic or collection). */
    formatType?: string;
    /** Exclude variants (alternate covers, secondary printings, director's cuts, etc.) from the result set. */
    noVariants?: boolean;
    /** Return comics within a predefined date range. */
    dateDescriptor?: string;
    /** Return comics within a predefined date range. Dates must be specified as date1,date2 (e.g. 2013-01-01,2013-01-02). Dates are preferably formatted as YYYY-MM-DD but may be sent as any common date format. */
    dateRange?: Number;
    /** Return only issues in series whose title matches the input. */
    title?: string;
    /** Return only issues in series whose title starts with the input. */
    titleStartsWith?: string;
    /** Return only issues in series whose start year matches the input. */
    startYear?: Number;
    /** Return only issues in series whose issue number matches the input. */
    issueNumber?: Number;
    /** Return only comics which have been modified since the specified date. */
    modifiedSince?: Date;
    /** Return only comics which feature work by the specified creators (accepts a comma-separated list of ids). */
    creators?: Number;
    /** Return only comics which feature the specified characters (accepts a comma-separated list of ids). */
    characters?: Number;
    /** Return only comics which appear the specified series (accepts a comma-separated list of ids). */
    series?: Number;
    /** Return only comics which appear in the specified events (accepts a comma-separated list of ids). */
    events?: Number;
    /** Return only comics which appear the specified stories (accepts a comma-separated list of ids). */
    stories?: Number;
    /** Order the result set by a field or fields. Add a "-" to the value sort in descending order. Multiple values are given priority in the order in which they are passed. */
    orderBy?: string;
    /** Limit the result set to the specified number of resources. */
    limit?: Number;
    /** Skip the specified number of resources in the result set. */
    offset?: Number;
}