export interface User {
    id: string,
    name: string,
    gender: string,
    username: string,
    password: string,
    shortDescription: string,
    pictureUrl: string
    status: string,
    role: string,
    registrationDate: string,
    loginDate?: string,
}