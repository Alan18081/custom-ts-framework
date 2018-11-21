"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var url = __importStar(require("url"));
var handlers = {};
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.server = http_1.default.createServer(function (req, res) {
        });
        this.server.listen(this.port, function () {
            console.log('Server is running');
        });
    }
    Server.prototype.listen = function () {
    };
    return Server;
}());
exports.Server = Server;
var server = http_1.default.createServer(function (req, res) {
    if (req.url) {
        var parsedUrl = url.parse(req.url);
    }
});
// const app: Application  = express();
function SetValue(object, name) {
    Object.defineProperty(object, name, {
        value: 'Alan',
        configurable: true
    });
}
exports.SetValue = SetValue;
function Param(param) {
    console.log(param);
    return function (obj, name, index) {
        return {
            value: 'Parameter'
        };
    };
}
exports.Param = Param;
function Post(url) {
    return function (obj, key) {
        return {
            value: obj[key]
        };
    };
}
exports.Post = Post;
