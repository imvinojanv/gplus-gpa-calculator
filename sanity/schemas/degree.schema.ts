const schema = {
    name: 'degree',
    title: 'Degree',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            description: "e.g. 'Software Engineering'",
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'degree',
            title: 'Degree',
            description: "e.g. 'B.Sc (Hons) in software engineering'",
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'duration',
            title: 'Duration (Years)',
            description: 'The duration of the degree program, e.g. 3 or 4',
            type: 'number',
            initialValue: 3,
        },
        {
            name: 'courses',
            title: 'Courses',
            description: 'The list of available courses for this degree program',
            type: 'array',
            of: [
                { type: 'reference', to: [
                    { type: 'course' }
                ]}
            ],
        },
    ]
}

export default schema;