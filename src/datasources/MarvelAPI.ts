import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server';
import * as config from '../marvel.config.json';
import crypto from 'crypto';
import { getIdFromResourceURI, constrainSearchLimit } from '../utils';
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

    // CHARACTER RESOURCE REST ENDPOINTS HANDLERS
    async findCharacters(params:FindCharactersParams) {
        return params;
    }

    async getCharacterById(id: Number) {
        return this.get(`characters/${id}`).then(resp => {
            const characterResp = resp.data.results[0] || false;
            if (!characterResp) return null;

            // formating needed fields
            let formattedCharacterFields = {
                id: characterResp.id.toString()
            };
            
            return Object.assign(characterResp, formattedCharacterFields);
        });
    }

    async getComicsByCharacterId(params:FindComicsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('comics', 'character', 'characters', itemResp => {
            // formating needed fields
            let formattedItemFields = {
                id: itemResp.id.toString(),
                images: get(itemResp, 'images', []),
                characters: get(itemResp, 'characters.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(itemResp, 'stories.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                series: get(itemResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                events: get(itemResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                creators: get(itemResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                })
            };
            
            return Object.assign(itemResp, formattedItemFields);
        }, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    async getStoriesByCharacterId(params:FindStoriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('stories', 'character', 'characters', itemResp => {
            // formating needed fields
            let formattedItemFields = {
                id: itemResp.id.toString(),
                characters: get(itemResp, 'characters.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                comics: get(itemResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                series: get(itemResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                events: get(itemResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                creators: get(itemResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                originalIssue: (get(itemResp, 'originalIssue.resourceURI', false)) ? getIdFromResourceURI(itemResp.originalIssue.resourceURI) : null
            };
            
            return Object.assign(itemResp, formattedItemFields);
        });

        return resourceListFunc(params);
    }
    
    async getEventsByCharacterId(params:FindEventsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('events', 'character', 'characters', itemResp => {
            // formating needed fields
            let formattedItemFields = {
                id: itemResp.id.toString(),
                characters: get(itemResp, 'characters.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                comics: get(itemResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                series: get(itemResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(itemResp, 'stories.items', []).map(({ resourceURI, name, type }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name,
                        type: type
                    }
                }),
                creators: get(itemResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                next: (get(itemResp, 'next.resourceURI', false)) ? getIdFromResourceURI(itemResp.next.resourceURI) : null,
                previous: (get(itemResp, 'previous.resourceURI', false)) ? getIdFromResourceURI(itemResp.previous.resourceURI) : null
            };
            
            return Object.assign(itemResp, formattedItemFields);
        }, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getSeriesByCharacterId(params:FindSeriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('series', 'character', 'characters', itemResp => {
            // formating needed fields
            let formattedItemFields = {
                id: itemResp.id.toString(),
                characters: get(itemResp, 'characters.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                comics: get(itemResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                events: get(itemResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(itemResp, 'stories.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                creators: get(itemResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                next: (get(itemResp, 'next.resourceURI', false)) ? getIdFromResourceURI(itemResp.next.resourceURI) : null,
                previous: (get(itemResp, 'previous.resourceURI', false)) ? getIdFromResourceURI(itemResp.previous.resourceURI) : null
            };
            
            return Object.assign(itemResp, formattedItemFields);
        }, { orderBy: 'title' });

        return resourceListFunc(params);
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
                }),
                series: get(comicResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                events: get(comicResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                creators: get(comicResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
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
                series: get(storyResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                events: get(storyResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                creators: get(storyResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                originalIssue: (get(storyResp, 'originalIssue.resourceURI', false)) ? getIdFromResourceURI(storyResp.originalIssue.resourceURI) : null
            };
            
            return Object.assign(storyResp, formattedStoryFields);
        });
    }

    // Series
    async findSeries(params:any) {
        return params;
    }

    async getSerieById(id: Number) {
        return this.get(`series/${id}`).then(resp => {
            const serieResp = resp.data.results[0] || false;
            if (!serieResp) return null;

            // formating needed fields
            let formattedSerieFields = {
                id: serieResp.id.toString(),
                characters: get(serieResp, 'characters.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                comics: get(serieResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                events: get(serieResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(serieResp, 'stories.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                creators: get(serieResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                next: (get(serieResp, 'next.resourceURI', false)) ? getIdFromResourceURI(serieResp.next.resourceURI) : null,
                previous: (get(serieResp, 'previous.resourceURI', false)) ? getIdFromResourceURI(serieResp.previous.resourceURI) : null
            };
            
            return Object.assign(serieResp, formattedSerieFields);
        });
    }

    // Events
    async findEvents(params:any) {
        return params;
    }

    async getEventById(id: Number) {
        return this.get(`events/${id}`).then(resp => {
            const eventResp = resp.data.results[0] || false;
            if (!eventResp) return null;

            // formating needed fields
            let formattedEventFields = {
                id: eventResp.id.toString(),
                characters: get(eventResp, 'characters.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                comics: get(eventResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                series: get(eventResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(eventResp, 'stories.items', []).map(({ resourceURI, name, type }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name,
                        type: type
                    }
                }),
                creators: get(eventResp, 'creators.items', []).map(({ resourceURI, name, role }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name,
                        role: role
                    }
                }),
                next: (get(eventResp, 'next.resourceURI', false)) ? getIdFromResourceURI(eventResp.next.resourceURI) : null,
                previous: (get(eventResp, 'previous.resourceURI', false)) ? getIdFromResourceURI(eventResp.previous.resourceURI) : null
            };
            
            return Object.assign(eventResp, formattedEventFields);
        });
    }

    // Creators
    async findCreators(params:any) {
        return params;
    }

    async getCreatorById(id: Number) {
        return this.get(`creators/${id}`).then(resp => {
            const creatorResp = resp.data.results[0] || false;
            if (!creatorResp) return null;

            // formating needed fields
            let formattedCreatorFields = {
                id: creatorResp.id.toString(),
                comics: get(creatorResp, 'comics.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name
                    }
                }),
                series: get(creatorResp, 'series.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                }),
                stories: get(creatorResp, 'stories.items', []).map(({ resourceURI, name, type }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        title: name,
                        type: type
                    }
                }),
                events: get(creatorResp, 'events.items', []).map(({ resourceURI, name }) => {
                    return {
                        id: getIdFromResourceURI(resourceURI),
                        name: name
                    }
                })
            };
            
            return Object.assign(creatorResp, formattedCreatorFields);
        });
    }

    // private queryResources(
    //     resourceNamePlural:String,
    //     respFormatter:Function,
    //     defaultParams:any = {}
    // ):Function {
    //     return () => {}
    // }

    private getResourcesByParentResourceFunc(
        resourceNamePlural:String,
        parentResourceNameSingular:String, 
        parentResourceNamePlural:String, 
        respFormatter:Function,
        defaultParams:any = {}
    ):Function {
        return (params:FindCharactersByItemParams|FindComicsByItemParams|FindCreatorsByItemParams|FindEventsByItemParams|FindSeriesByItemParams|FindStoriesByItemParams) => {
            if(!params.id) throw new ApolloError(`Empty parameter - ${parentResourceNameSingular} id is required`, '409');

            // format params
            let _params:FindCharactersByItemParams|FindComicsByItemParams|FindCreatorsByItemParams|FindEventsByItemParams|FindSeriesByItemParams|FindStoriesByItemParams = Object.assign({}, defaultParams, params);
            _params = constrainSearchLimit(_params);
            const queryParams = Object.keys(_params)
                .filter(param => (param !== 'id'))
                .map((param, index) => `${(index === 0) ? '?' : '&'}${param}=${_params[param]}`)
                .join('');

            // make call
            return this.get(`${parentResourceNamePlural}/${_params.id}/${resourceNamePlural}${queryParams}`).then(resp => {
                const itemsResp = resp.data.results || false;
                if (!itemsResp) return {
                    offset: 0,
                    limit: 20,
                    total: 0,
                    count: 0,
                    results: []
                };

                let formattedItemsResp = itemsResp.map(respFormatter);

                // return full response
                return Object.assign(resp.data, { results: formattedItemsResp });
            });
        }
    }
}

// list search interface
interface ISearch {
    /** Order the result set by a field or fields. Add a "-" to the value sort in descending order. Multiple values are given priority in the order in which they are passed. */
    orderBy?: string;
    /** Limit the result set to the specified number of resources. */
    limit?: Number;
    /** Skip the specified number of resources in the result set. */
    offset?: Number;
}

/**
 * RESOURCE SEARCH PARAMS
 */
interface FindCharactersParams extends ISearch {
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
}

interface FindComicsParams extends ISearch {
    /** Filter by the issue format (e.g. comic, digital comic, hardcover). */
    format?: 'comic'|'magazine'|'trade paperback'|'hard cover'|'digest'|'graphic novel'|'digital comic'|'infinite comic';
    /** Filter by the issue format type (comic or collection).Return only characters which have been modified since the specified date. */
    formatType?: 'comic'|'collection';
    /** Exclude variant comics from the result set. */
    noVariants?: Boolean;
    /** Return comics within a predefined date range. */
    dateDescriptor?: 'lastWeek'|'thisWeek'|'nextWeek'|'thisMonth';
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
    /** Return only comics in which the specified characters appear together (for example in which BOTH Spider-Man and Wolverine appear). */
    sharedAppearances?: string
    /** Return only comics in which the specified creators worked together (for example in which BOTH Stan Lee and Jack Kirby did work). */
    collaborators?: string
}

/**
 * RELATED TO RESOURCE SEARCH PARAMS
 */
interface FindComicsByItemParams extends FindComicsParams {
    /** The related resource id */
    id: Number;
}

interface FindStoriesByItemParams extends ISearch {
    /** The related resource id */
    id: Number;
}

interface FindEventsByItemParams extends ISearch {
    /** The related resource id */
    id: Number;
}

interface FindSeriesByItemParams extends ISearch {
    /** The related resource id */
    id: Number;
}

interface FindCharactersByItemParams extends FindCharactersParams {
    /** The related resource id */
    id: Number;
}

interface FindCreatorsByItemParams extends ISearch {
    /** The related resource id */
    id: Number;
}