/* eslint-disable no-unused-vars */

export function getResolver(cache: any): any {
    const commentCountResolver = parent => {
        return parent.descendants || 0;
    };

    return commentCountResolver;
}
