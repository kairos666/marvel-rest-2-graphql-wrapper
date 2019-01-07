/**
 * take a URL in an strip away base, path, query strings to output only the URL end - id
 * @param resourceURI 
 */
export function getIdFromResourceURI(resourceURI:string):string {
    return resourceURI.split('?')[0].split('/').pop() || '';
}