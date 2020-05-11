export interface Reciep { 
    id: string,
    authorId: string ,
    reciepName: string,
    shortDescription: string,
    time: string,
    products: string[],
    picture: string,
    longDescription: string,
    tags: string[],
    creationDate: string,
    lastModified: string
}