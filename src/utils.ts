/**
 * take a URL in an strip away base, path, query strings to output only the URL end - id
 * @param resourceURI 
 */
export function getIdFromResourceURI(resourceURI:string):string {
    return resourceURI.split('?')[0].split('/').pop() || '';
}

/**
 * takes in a object and apply constrains on the limit property (1 <= limit <= 100) to avoid unecessary error messages
 * @param params 
 */
export function constrainSearchLimit(params:any):any {
    if(!params.limit) return params;

    params.limit = Math.max(1, Math.min(params.limit, 100));
    return params;
}