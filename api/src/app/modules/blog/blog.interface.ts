export type IBlogFilters = {
    searchTerm?: string;
    title?: string;
    description?: string;
}
export const blogSearchablFields = ['title', 'description']