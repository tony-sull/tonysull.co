export type Persona = {
    name: string
    handle: string
    avatar: string
    url: string
}

export const personas: { [key: string]: Persona } = {
    'tony': {
        name: "Tony Sullivan",
        handle: "tony@tonysull.co",
        avatar: "/assets/avatar-96x96.jpg",
        url: "https://tonysull.co"
    },
    'navillus': {
        name: "Navillus.dev",
        handle: "tony@navillus.dev",
        avatar: "/assets/navillus-96x96.png",
        url: "https://navillus.dev"
    },
    'astro': {
        name: "Astro",
        handle: "tony@astro.build",
        avatar: "/assets/astro-96x96.jpg",
        url: "https://astro.build"
    }
}