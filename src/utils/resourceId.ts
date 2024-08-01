
export default function getResourceId(url: string) {
  let parts = url.split("/")
  let resourceId = parts[parts.length - 2]
  return resourceId
}