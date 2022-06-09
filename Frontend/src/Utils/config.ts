class Config {

    public registerUrl = "";
    public loginUrl = "";
    public vacationsUrl = "";
}


class DevelopmentConfig extends Config {
    // public supportPage = "http://vacation-management.com/support/";

    public registerUrl = "http://localhost:3002/api/users/register/";
    public loginUrl = "http://localhost:3002/api/users/login/";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
}

class TestConfig extends Config {
    // public supportPage = "http://vacation-management.com/support/";

    public registerUrl = "http://localhost:3002/api/users/register/";
    public loginUrl = "http://localhost:3002/api/users/login/";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
}

class ProductionConfig extends Config {
    // public supportPage = "http://vacation-management.com/support/";

    public registerUrl = "http://localhost:3002/api/users/register/";
    public loginUrl = "http://localhost:3002/api/users/login/";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
    public productImagesUrl = "http://localhost:3002/api/vacations/images/";
}

let config: Config;

if (process.env.NODE_ENV === "development") {
    config = new DevelopmentConfig();
}
else if (process.env.NODE_ENV === "test") {
    config = new TestConfig();
}
else if (process.env.NODE_ENV === "production") {
    config = new ProductionConfig();
}

export default config;
