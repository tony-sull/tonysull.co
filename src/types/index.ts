import type { Article } from './articles'
import type { Bookmark } from './bookmarks'
import type { Note } from './notes'
import type { Person } from './personas'
import type { Photo } from './photos'

export * from './articles'
export * from './bookmarks'
export * from './notes'
export * from './personas'
export * from './photos'

export type Entry = Article | Bookmark | Note | Photo
export type Card = Person
