interface BuildQueryParams {
    type: string,
    slug?: string,
    id?: string,
    year?: number,
    semester?: number,
}

export const buildQuery = (params: BuildQueryParams) => {
    const { type, slug, id, year, semester } = params;

    // Create some of the basic GROQ queries
    const conditions = [`*[_type=="${type}" `];

    if (slug) {
        conditions.push(`slug.current == "${slug}"`);
    }

    if (type === "course" && id) {
        conditions.push(`degree->_id == "${id}"`);
    }else if (type !== "course" && id) {
        conditions.push(`_id == "${id}"`);
    }

    if (year) {
        conditions.push(`year == ${year}`);
    }

    if (semester) {
        conditions.push(`semester == ${semester}`);
    }

    return conditions.length > 1
    ? `${conditions[0]} && (${conditions
        .slice(1)
        .join(" && ")})]`
    : `${conditions[0]}]`;
}