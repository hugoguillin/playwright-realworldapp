export interface Article {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  author: Author
  favorited: boolean
  favoritesCount: number
}

export interface NewArticle {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
  followersCount: number
}

export interface UserProfile {
  user: {
    username: string
    bio: string
    image: string
    token: string
    email: string
  }
}

export interface User {
  user: {
    username: string
    email: string
    password: string
  }
}

export interface UserSettings {
  image: string
  username: string
  bio: string
  email: string
  password: string
}

export interface Tag {
  tags: string[]
}
