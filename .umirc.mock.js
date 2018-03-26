export default {
    // fixed mock bug, not dynamic load model
    // https://github.com/umijs/umi/issues/230
    ...require('./mock/global'),
    ...require('./mock/blog'),
};