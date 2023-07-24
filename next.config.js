/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,

    images: {
        domains: ["i.seadn.io"],
    },
}

module.exports = nextConfig
// module.exports = {
//     webpack: (config) => {
//         // this will override the experiments
//         config.experiments = {  topLevelAwait: true };
//         // this will just update topLevelAwait property of config.experiments
//         // config.experiments.topLevelAwait = true
//         return config;
//     },
// };