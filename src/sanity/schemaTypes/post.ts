export default {
  name: 'post',
  title: 'Weekly Update',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: "Pastor's Words", value: 'pastor' },
          { title: 'Sermon Notes', value: 'sermon' },
          { title: 'Announcements', value: 'news' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt_zh',
      title: 'Excerpt (Chinese)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'excerpt_en',
      title: 'Excerpt (English)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body_zh',
      title: 'Body (Chinese)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'body_en',
      title: 'Body (English)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
