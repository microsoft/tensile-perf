
export const isomorphicDynamicImport = async (bareImport: string, qualifiedImport: string) => {
    if (import.meta.url.startsWith('file://')) {
        return import(bareImport);
    }

    return import(qualifiedImport);
}
