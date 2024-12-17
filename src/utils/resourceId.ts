
export default function getResourceId(url: string) {
  let parts = url.split("/")
  let resourceId = parts[parts.length - 1]
  return resourceId
}