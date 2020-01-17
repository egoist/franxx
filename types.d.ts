declare module 'regexparam' {
  const regexparam: (path: string) => { keys: string[]; pattern: RegExp }
  export default regexparam
}
