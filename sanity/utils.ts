interface BuildQueryParams {
    type: string,
    slug?: string,
    id?: string
}

export const buildQuery = (params: BuildQueryParams) => {
    const { type, slug, id } = params;

    // Create some of the basic GROQ queries
    const conditions = [`*[_type=="${type}" `];

    if (slug) {
        conditions.push(`slug.current == "${slug}"`);
    }

    if (id) {
        conditions.push(`_id == "${id}"`);
    }

    return conditions.length > 1
    ? `${conditions[0]} && (${conditions
        .slice(1)
        .join(" && ")})]`
    : `${conditions[0]}]`;
}