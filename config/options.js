
const { db_name } = require("./db")
 
const Config = { 
    
    dashboard_url: "https://admin.flatcoding.com/dashboard",
    media_url: `https://media.flatcoding.com`,
    site_url: "https://flatcoding.com",
    admin: "admin.flatcoding.com",
    login_url: "https://admin.flatcoding.com/login", 
    redirect_to: "/tutorials",
    
    /*
    dashboard_url: "http://localhost:3001/dashboard",
    media_url: `http://localhost:3000/uploads`,
    site_url: "http://localhost:3001",
    admin: "http://localhost:3001",
    login_url: "http://localhost:3001/login", 
    redirect_to: "/tutorials",
    */

    server: {
        redirects: "",
        sitemap: "", // slug shuould be started with slash /
        robots: "", // slug shuould be started with slash /
        api: "/api",
        port: 3000 
    },
    
    // serve image uploads on server
    uploads: {
        serve: "uploads",   // https://example.com/uploads/... fetch image
        folder: `public`, // public/uploads upload image to folder
    }, 
    api_keys: 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132',
    jwt_secret: "flatcoding_t1y4u5236985471zasde!gfh@qwe#$%hoj^ytu&*tu(ib)ib~gfhrytuibonphojlkmlbkxzasqwe",   
    database: {
        name: db_name,
        host: "mongodb://127.0.0.1",
        port: "27017",
        options: {
            useMongoClient : true 
        },
        link: () => {

            return  Config.database.host + ':' +
                    Config.database.port + '/' +
                    Config.database.name;
        
        }
    }

};

module.exports = { Config };