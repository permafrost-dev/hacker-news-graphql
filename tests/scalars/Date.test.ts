/* eslint-disable no-undef */

import { getScalarType } from '@/scalars/Date';
const { GraphQLScalarType, Kind } = require('graphql');

let dateScalar: typeof GraphQLScalarType;

beforeEach(() => {
    dateScalar = getScalarType();
});

it('serializes a unix timestamp and returns an ISO date/time string', () => {
    expect(dateScalar.serialize(1622867260)).toBe('2021-06-05T04:27:40.000Z');
});

it('parses a date/time string and returns a Date object', () => {
    expect(dateScalar.parseValue('2021-06-05T04:27:40.983Z')).toBeInstanceOf(Date);
    expect(dateScalar.parseValue('2021-06-05T04:27:40.000Z').getTime()).toBe(1622867260000);
});

it('parses a valid numeric string literal and returns a Date object', () => {
    const ast = { kind: Kind.INT, value: '1622867260' };

    expect(dateScalar.parseLiteral(ast)).toBeInstanceOf(Date);
});

it('parses an invalid string literal and returns null', () => {
    const ast = { kind: Kind.STRING, value: 'invalid' };

    expect(dateScalar.parseLiteral(ast)).toBeNull();
});
