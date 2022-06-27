
export const mongoUrl = (envServer, db) => {
    const servers = envServer ? envServer.split(' ') : ['localhost:27017']
    const url = servers.reduce((prev, cur) => prev + cur + ',', 'mongodb://')

    return `${url.substr(0, url.length - 1)}/${db}`
}