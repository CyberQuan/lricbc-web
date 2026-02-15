export default {
  name: 'gallery',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title_zh',
      title: 'Title (Chinese)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video (YouTube Link)', value: 'video' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Worship', value: 'worship' },
          { title: 'Retreat', value: 'retreat' },
          { title: 'Fellowship', value: 'fellowship' },
          { title: 'Holiday', value: 'holiday' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }: any) => parent?.type === 'video',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({ parent }: any) => parent?.type === 'image',
      description: 'Link to YouTube or Vimeo',
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
    },
  ],
};
