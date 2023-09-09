import type { Article } from './articles'
import type { Bookmark } from './bookmarks'
import type { Note } from './notes'
import type { Photo } from './photos'

export * from './articles'
export * from './bookmarks'
export * from './notes'
export * from './photos'

export type Entry = Article | Bookmark | Note | Photo
