import type { ImageMetadata } from '@astrojs/image/dist/vite-plugin-astro-image.js'
import type { CollectionEntry } from 'astro:content'

const allImages = import.meta.glob('/src/assets/uploads/*.{png,jpg,jpeg,webp,avif}') as {
    [key: string]: () => Promise<{ default: ImageMetadata }>
}

export async function resolvePhoto(entry: CollectionEntry<'photos'>) {
    if (!(entry.data.photo in allImages)) {
        console.info(
            `[loadThemes] "${entry.data.photo}" image not found! Does it exist in /src/assets/uploads?`
        )

        return undefined
    }

    const mod = await allImages[entry.data.photo]!()
    return mod.default
}