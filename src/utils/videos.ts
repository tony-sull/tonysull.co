const YOUTUBE_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/

export function isYoutubeVideo(url: string) {
  return YOUTUBE_REGEX.test(url)
}
