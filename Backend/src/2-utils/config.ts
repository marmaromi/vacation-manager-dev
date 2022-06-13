class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public sqlHost = "";
    public sqlUser = "";
    public sqlPassword = "";
    public sqlDatabase = "";
}

class DevelopmentConfig extends Config {
    public port = 3002;
    public sqlHost = "localhost";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "vacation-tag";
}

class ProductionConfig extends Config {
    public port = +process.env.PORT; // Will be set by the cloud
    public sqlHost = "eu-cdbr-west-02.cleardb.net";
    public sqlUser = "b685b7d7b43385";
    public sqlPassword = "ab80a4ae";
    public sqlDatabase = "heroku_6a03ee6fa43d6ce";
}

// Connection String
// mysql://user:password@host/database?reconnect=true
// mysql://b685b7d7b43385:ab80a4ae@eu-cdbr-west-02.cleardb.net/heroku_6a03ee6fa43d6ce?reconnect=true

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
console.log(config);

export default config;
