export type IDoctorFilters = {
    searchTerm?: string;
    firstName?: string;
    gender?: string;
    city?: string;
    max?: string;
    min?: string;
    specialist?: string;
}
export const IDoctorFiltersData = ['searchTerm','firstName','lastName','gender','city', 'max', 'min', 'specialist']
export const IDoctorOptions = ['limit', 'page', 'sortBy', 'sortOrder']

export const DoctorSearchableFields = ['firstName', 'lastName', 'address', 'specialization', 'degree']