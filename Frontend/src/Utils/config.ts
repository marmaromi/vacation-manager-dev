class Config {

    public registerUrl = "";
    public loginUrl = "";
    public vacationsUrl = "";
    public vacationImagesUrl ="";
    public socketIo = "";
}


class DevelopmentConfig extends Config {
    // public supportPage = "http://vacation-management.com/support/";

    public registerUrl = "http://localhost:3002/api/users/register/";
    public loginUrl = "http://localhost:3002/api/users/login/";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
    public vacationImagesUrl ="http://localhost:3002/api/vacations/images/";
    public socketIo = "http://localhost:3002/";

}

class TestConfig extends Config {
    // public supportPage = "http://vacation-management.com/support/";

    public registerUrl = "http://localhost:3002/api/users/register/";
    public loginUrl = "http://localhost:3002/api/users/login/";
    public vacationsUrl = "http://localhost:3002/api/vacations/";
    public vacationImagesUrl ="http://localhost:3002/api/vacations/images/";
    public socketIo = "http://localhost:3002/";

}

class ProductionConfig extends Config {
    // public supportPage = "http://vacation-management.com/support/";

    public registerUrl = "https://vacation-manager-ido.herokuapp.com/api/users/register/";
    public loginUrl = "https://vacation-manager-ido.herokuapp.com/api/users/login/";
    public vacationsUrl = "https://vacation-manager-ido.herokuapp.com/api/vacations/";
    public productImagesUrl = "https://vacation-manager-ido.herokuapp.com/api/vacations/images/";
    public vacationImagesUrl ="https://vacation-manager-ido.herokuapp.com/vacations/images/";

    public socketIo = "https://vacation-manager-ido.herokuapp.com/";

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
