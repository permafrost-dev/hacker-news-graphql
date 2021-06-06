/* eslint-disable no-undef */

import typeDefs from '@/lib/typedef';
import { ObjectTypeDefinitionNode } from 'graphql/language/ast';

it('contains Date, StoryType, Story, Comment, User, and Query types', () => {
    const typeNames = ['Job', 'Date', 'StoryType', 'Story', 'Comment', 'User', 'Query'];

    typeDefs.definitions.forEach(def => {
        const definition = <ObjectTypeDefinitionNode>def;

        expect(typeNames).toContain(definition.name.value);
    });
});
