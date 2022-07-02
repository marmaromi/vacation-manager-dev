"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var cors_1 = __importDefault(require("cors"));
var sanitize_1 = __importDefault(require("./3-middleware/sanitize"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
// import logRequest from "./3-middleware/log-request";
var errors_model_1 = require("./4-models/errors-model");
var users_controller_1 = __importDefault(require("./6-controllers/users-controller"));
var vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var config_1 = __importDefault(require("./2-utils/config"));
var path_1 = __importDefault(require("path"));
var socket_logic_1 = __importDefault(require("./5-logic/socket-logic"));
var expressServer = (0, express_1.default)();
expressServer.use((0, cors_1.default)({ origin: "*" }));
expressServer.use("/api/", (0, express_rate_limit_1.default)({
    windowMs: 100,
    max: 100,
    message: "User exceeded maximum request limit" // Message to return on rate limit
}));
expressServer.use(express_1.default.json());
expressServer.use((0, express_fileupload_1.default)());
expressServer.use(sanitize_1.default);
// expressServer.use(logRequest);
expressServer.use("/api", users_controller_1.default);
expressServer.use("/api", vacations_controller_1.default);
expressServer.use(express_1.default.static(path_1.default.join(__dirname, "./7-frontend"))); // Send back index.html which must exists in "7-frontend" folder when surfing to root address (https://www.mysite.com)
expressServer.use("*", function (req, res, next) {
    if (config_1.default.isProduction) {
        res.sendFile(path_1.default.join(__dirname, "./7-frontend/index.html"));
    }
    else {
        var error = new errors_model_1.RouteNotFoundError(req.method, req.originalUrl);
        next(error);
    }
});
expressServer.use(catch_all_1.default);
var httpServer = expressServer.listen(config_1.default.port, function () { return console.log("Listening..."); });
socket_logic_1.default.init(httpServer);
