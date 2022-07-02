class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public sqlHost = "";
    public sqlUser = "";
    public sqlPassword = "";
    public sqlDatabase = "";
    public imagesPath = "";
}

class DevelopmentConfig extends Config {
    public port = 3002;
    public sqlHost = "localhost";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "vacation-manager";
    public imagesPath = "./src/1-assets/images/";
}

class ProductionConfig extends Config {
    public port = +process.env.PORT;
    public sqlHost = "eu-cdbr-west-02.cleardb.net";
    public sqlUser = "b685b7d7b43385";
    public sqlPassword = "ab80a4ae";
    public sqlDatabase = "heroku_6a03ee6fa43d6ce";
    public imagesPath = "./1-assets/images/";
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;
