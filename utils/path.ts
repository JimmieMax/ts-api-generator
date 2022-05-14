
/**
 * 将路径统一为 unix 风格的路径。
 *
 * @param path 路径
 * @returns unix 风格的路径
 */
 export function toUnixPath(path: string) {
    return path.replace(/[/\\]+/g, '/')
  }