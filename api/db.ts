export interface Post {
  id: number;
  title: string;
  body: string;
  published: boolean;
}

export interface Db {
  posts: Post[];
}

export const db: Db = {
  posts: [
    {
      id: 1,
      title: 'First post',
      body: 'This is the first post',
      published: true,
    },
    {
      id: 2,
      title: 'Second post',
      body: 'This is the second post',
      published: false,
    },
  ],
};
