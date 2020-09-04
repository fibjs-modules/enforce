import assert = require('assert');
import enforce = require('../')

type TupleValues<T extends any[]> = T[number];
const checkHttp = new enforce.Enforce<
    TupleValues<[
        'firstBytesToken',
        'version',
        'verb',
    ]>
>({
    returnAllErrors: true
});

checkHttp.add('firstBytesToken', enforce.sameAs('HTTP'))
checkHttp.add('version', enforce.lists.inside(['1.0', '1.1', '2.0', 'QUIC']))

checkHttp.add('verb', enforce.required('HTTP Verb is required'))
checkHttp.add('verb', enforce.lists.inside([
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
]))

// add custom validator processor, but it never validate
checkHttp.add('version', (value, next, ctx) => {
    return next()
});

const errors = checkHttp.checkSync({
    'firstBytesToken': 'HTTP',
    'version': '1.1',
    'verb': 'GET'
});

console.log('errors', errors);
// console.log('errors[0]', errors[0]);
// console.log('errors[0]?.msg', errors[0]?.msg);
// console.log('errors[0]?._property', errors[0]?._property);
