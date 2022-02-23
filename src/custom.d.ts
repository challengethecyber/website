// Fix SVG module imports
declare module "*.svg" {
  const content: any
  export default content
}
