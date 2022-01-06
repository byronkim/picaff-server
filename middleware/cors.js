"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOption = {
    origin: ['https://picaff.site', 'https://client.picaff.site',],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    optionsSuccessStatus: 200,
    credentials: true,
};
exports.default = corsOption;
//# sourceMappingURL=cors.js.map