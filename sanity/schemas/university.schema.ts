const schema = {
  name: 'university',
  title: 'University',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: "e.g. 'University of Kelaniya'",
      type: 'string',
      require,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      description: "e.g. 'uok, uom, susl'",
      type: 'slug',
      options: { 
        source: 'name',
        maxLength: 10,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true,
      }
    },
    {
      name: 'degrees',
      title: 'Degrees',
      type: 'array',
      of: [
        { type: 'reference', to: [
          { type: 'degree' }
        ]}
      ],
    },
  ]
}

export default schema;