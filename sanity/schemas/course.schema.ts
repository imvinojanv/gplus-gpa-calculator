const schema = {
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Course Name',
            description: "e.g. 'Data Structure & Algorithm'",
            type: 'string',
            validation: (Rule:any) => Rule.required(),
        },
        {
            name: 'courseCode',
            title: 'Course Code',
            description: "e.g. 'SENG 31212'",
            type: 'string',
        },
        {
            name: 'credits',
            title: 'Credits',
            type: 'number',
            validation: (Rule:any) => Rule.required(),
        },
        {
            name: 'year',
            title: 'Year',
            type: 'number',
            options: {
                list: [1, 2, 3, 4],
            },
        },
        {
            name: 'semester',
            title: 'Semester',
            type: 'number',
            options: {
                list: [1, 2],
            },
        },
        {
            name: 'courseType',
            title: 'Course Type',
            type: 'string',
            options: {
                list: ['compulsory', 'optional'],
            },
        },
    ]
}

export default schema;