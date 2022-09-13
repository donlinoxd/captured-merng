"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fs = require("fs");
const _path = require("path");
const _apolloServerExpress = require("apollo-server-express");
const _apolloServerCore = require("apollo-server-core");
const _http = /*#__PURE__*/ _interopRequireDefault(require("http"));
const _express = /*#__PURE__*/ _interopRequireDefault(require("express"));
const _cookieParser = /*#__PURE__*/ _interopRequireDefault(require("cookie-parser"));
const _connectDB = /*#__PURE__*/ _interopRequireDefault(require("./config/connectDB"));
const _resolvers = /*#__PURE__*/ _interopRequireDefault(require("./graphql/resolvers"));
const _context = /*#__PURE__*/ _interopRequireDefault(require("./graphql/context"));
const _verifyUserAuthorization = /*#__PURE__*/ _interopRequireDefault(require("./middlewares/verifyUserAuthorization"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
require("dotenv").config();
const typeDefs = (0, _fs.readFileSync)((0, _path.join)(__dirname, "/graphql/schema.graphql"), "utf-8");
const startApolloServer = async (typeDefs, resolvers, context)=>{
    const app = (0, _express.default)();
    const PORT = process.env.PORT || 4000;
    const httpServer = _http.default.createServer(app);
    const server = new _apolloServerExpress.ApolloServer({
        typeDefs,
        resolvers,
        context,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            (0, _apolloServerCore.ApolloServerPluginDrainHttpServer)({
                httpServer
            }),
            (0, _apolloServerCore.ApolloServerPluginLandingPageLocalDefault)({
                embed: true
            }), 
        ],
        introspection: true
    });
    await server.start();
    app.use((0, _cookieParser.default)());
    app.use(_verifyUserAuthorization.default);
    app.use(_express.default.static("client/build"));
    app.get("*", (req, res)=>{
        res.sendFile((0, _path.resolve)(__dirname, "../client/build", "index.html"));
    });
    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: "https://captured-socmed.vercel.app"
        }
    });
    await new Promise((resolve)=>httpServer.listen({
            port: PORT
        }, resolve));
    console.log(`Server ready at port ${PORT}`);
};
(0, _connectDB.default)().then(()=>{
    startApolloServer(typeDefs, _resolvers.default, _context.default);
});
