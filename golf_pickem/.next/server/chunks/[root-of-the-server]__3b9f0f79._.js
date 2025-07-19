module.exports = {

"[project]/.next-internal/server/app/api/aws/retrieveGolfData/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/aws/retrieveGolfData/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
(()=>{
    const e = new Error("Cannot find module 'aws-sdk'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:c7fbde0b-bd35-4872-a018-8c5b469af387'
    })
});
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
    region: 'us-east-1'
});
const getObjectS3 = async (bucket, key)=>{
    const params = {
        Bucket: bucket,
        Key: key
    };
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString('utf-8'));
};
const listObjectsV2 = async (bucket, prefix)=>{
    const params = {
        Bucket: bucket
    };
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.find((item)=>item.Key.startsWith(prefix))?.Key;
};
async function GET() {
    try {
        const tournamentKey = await listObjectsV2('golfpickem-bucket', 'golf_tournament_data');
        const picksKey = await listObjectsV2('golfpickem-bucket', 'picks_data');
        const tournamentData = await getObjectS3('golfpickem-bucket', tournamentKey);
        const playerData = await getObjectS3('golfpickem-bucket', picksKey);
        return new Response(JSON.stringify({
            tournamentData,
            playerData
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__3b9f0f79._.js.map