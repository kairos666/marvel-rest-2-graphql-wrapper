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

            return this.characterRespFormatterFunc(characterResp);
        });
    }

    async getComicsByCharacterId(params:FindComicsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('comics', 'character', 'characters', this.comicRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    async getStoriesByCharacterId(params:FindStoriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('stories', 'character', 'characters', this.storyRespFormatterFunc);

        return resourceListFunc(params);
    }
    
    async getEventsByCharacterId(params:FindEventsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('events', 'character', 'characters', this.eventRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getSeriesByCharacterId(params:FindSeriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('series', 'character', 'characters', this.serieRespFormatterFunc, { orderBy: 'title' });

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

            return this.comicRespFormatterFunc(comicResp);
        });
    }

    async getCharactersByComicId(params:FindCharactersByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('characters', 'comic', 'comics', this.characterRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getCreatorsByComicId(params:FindCreatorsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('creators', 'comic', 'comics', this.creatorRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getStoriesByComicId(params:FindStoriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('stories', 'comic', 'comics', this.storyRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getEventsByComicId(params:FindEventsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('events', 'comic', 'comics', this.eventRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    // Stories
    async findStories(params:FindCharactersParams) {
        return params;
    }

    async getStoryById(id: Number) {
        return this.get(`stories/${id}`).then(resp => {
            const storyResp = resp.data.results[0] || false;
            if (!storyResp) return null;

            return this.storyRespFormatterFunc(storyResp);
        });
    }

    async getCharactersByStoryId(params:FindCharactersByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('characters', 'story', 'stories', this.characterRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getCreatorsByStoryId(params:FindCreatorsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('creators', 'story', 'stories', this.creatorRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getEventsByStoryId(params:FindEventsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('events', 'story', 'stories', this.eventRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getSeriesByStoryId(params:FindSeriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('series', 'story', 'stories', this.serieRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    async getComicsByStoryId(params:FindComicsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('comics', 'story', 'stories', this.comicRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    // Series
    async findSeries(params:any) {
        return params;
    }

    async getSerieById(id: Number) {
        return this.get(`series/${id}`).then(resp => {
            const serieResp = resp.data.results[0] || false;
            if (!serieResp) return null;

            return this.serieRespFormatterFunc(serieResp);
        });
    }

    async getCharactersBySerieId(params:FindCharactersByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('characters', 'serie', 'series', this.characterRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getCreatorsBySerieId(params:FindCreatorsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('creators', 'serie', 'series', this.creatorRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getStoriesBySerieId(params:FindStoriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('stories', 'serie', 'series', this.storyRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getEventsBySerieId(params:FindEventsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('events', 'serie', 'series', this.eventRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getComicsBySerieId(params:FindComicsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('comics', 'serie', 'series', this.comicRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    // Events
    async findEvents(params:any) {
        return params;
    }

    async getEventById(id: Number) {
        return this.get(`events/${id}`).then(resp => {
            const eventResp = resp.data.results[0] || false;
            if (!eventResp) return null;

            return this.eventRespFormatterFunc(eventResp);
        });
    }

    async getCharactersByEventId(params:FindCharactersByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('characters', 'event', 'events', this.characterRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getCreatorsByEventId(params:FindCreatorsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('creators', 'event', 'events', this.creatorRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getStoriesByEventId(params:FindStoriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('stories', 'event', 'events', this.storyRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getSeriesByEventId(params:FindSeriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('series', 'event', 'events', this.serieRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    async getComicsByEventId(params:FindComicsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('comics', 'event', 'events', this.comicRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    // Creators
    async findCreators(params:any) {
        return params;
    }

    async getCreatorById(id: Number) {
        return this.get(`creators/${id}`).then(resp => {
            const creatorResp = resp.data.results[0] || false;
            if (!creatorResp) return null;

            return this.creatorRespFormatterFunc(creatorResp);
        });
    }

    async getStoriesByCreatorId(params:FindStoriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('stories', 'creator', 'creators', this.storyRespFormatterFunc);

        return resourceListFunc(params);
    }

    async getEventsByCreatorId(params:FindEventsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('events', 'creator', 'creators', this.eventRespFormatterFunc, { orderBy: 'name' });

        return resourceListFunc(params);
    }

    async getSeriesByCreatorId(params:FindSeriesByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('series', 'creator', 'creators', this.serieRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    async getComicsByCreatorId(params:FindComicsByItemParams) {
        const resourceListFunc:Function = this.getResourcesByParentResourceFunc('comics', 'creator', 'creators', this.comicRespFormatterFunc, { orderBy: 'title' });

        return resourceListFunc(params);
    }

    // generic helper functions
    private characterRespFormatterFunc = itemResp => {
        // formating needed fields
        let formattedItemFields = {};
        
        return Object.assign(itemResp, formattedItemFields);
    };
    private comicRespFormatterFunc = itemResp => {
        // formating needed fields
        let formattedItemFields = {
            images: get(itemResp, 'images', [])
        };
        
        return Object.assign(itemResp, formattedItemFields);
    };
    private serieRespFormatterFunc = itemResp => {
        // formating needed fields
        let formattedItemFields = {
            next: (get(itemResp, 'next.resourceURI', false)) ? getIdFromResourceURI(itemResp.next.resourceURI) : null,
            previous: (get(itemResp, 'previous.resourceURI', false)) ? getIdFromResourceURI(itemResp.previous.resourceURI) : null
        };
        
        return Object.assign(itemResp, formattedItemFields);
    };
    private eventRespFormatterFunc = itemResp => {
        // formating needed fields
        let formattedItemFields = {
            next: (get(itemResp, 'next.resourceURI', false)) ? getIdFromResourceURI(itemResp.next.resourceURI) : null,
            previous: (get(itemResp, 'previous.resourceURI', false)) ? getIdFromResourceURI(itemResp.previous.resourceURI) : null
        };
        
        return Object.assign(itemResp, formattedItemFields);
    };
    private storyRespFormatterFunc = itemResp => {
        // formating needed fields
        let formattedItemFields = {
            originalIssue: (get(itemResp, 'originalIssue.resourceURI', false)) ? getIdFromResourceURI(itemResp.originalIssue.resourceURI) : null
        };
        
        return Object.assign(itemResp, formattedItemFields);
    };
    private creatorRespFormatterFunc = itemResp => {
        // formating needed fields
        let formattedItemFields = {};
        
        return Object.assign(itemResp, formattedItemFields);
    };
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

interface FindCreatorsParams extends ISearch {
    firstName: String;
    middleName: String;
    lastName: String;
    suffix: String;
    nameStartWith: String;
    firstNameStartWith: String;
    middleNameStartWith: String;
    lastNameStartWith: String;
    modifiedSince: Date;
    comics: Number;
    series: Number;
    events: Number;
    stories: Number;
}

interface FindEventsParams extends ISearch {
    name: String;
    nameStartWith: String;
    modifiedSince: Date;
    creators: Number;
    characters: Number;
    comics: Number;
    series: Number;
    stories: Number;
}

interface FindSeriesParams extends ISearch {
    title: String;
    titleStartsWith: String;
    startYear: Number;
    modifiedSince: Date;
    creators: Number;
    characters: Number;
    comics: Number;
    events: Number;
    stories: Number;
    seriesType: 'collection'|'one shot'|'limited'|'ongoing';
}

interface FindStoriesParams extends ISearch {
    modifiedSince: Date;
    creators: Number;
    characters: Number;
    comics: Number;
    events: Number;
    series: Number;
}

/**
 * RELATED TO RESOURCE SEARCH PARAMS
 */
interface FindComicsByItemParams extends FindComicsParams {
    /** The related resource id */
    id: Number;
}

interface FindStoriesByItemParams extends FindStoriesParams {
    /** The related resource id */
    id: Number;
}

interface FindEventsByItemParams extends FindEventsParams {
    /** The related resource id */
    id: Number;
}

interface FindSeriesByItemParams extends FindSeriesParams {
    /** The related resource id */
    id: Number;
}

interface FindCharactersByItemParams extends FindCharactersParams {
    /** The related resource id */
    id: Number;
}

interface FindCreatorsByItemParams extends FindCreatorsParams {
    /** The related resource id */
    id: Number;
}