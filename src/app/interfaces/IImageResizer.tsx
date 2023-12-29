export default interface IImageResizer {
  image: string;
  oldWidth: number;
  oldHeight: number;
  newWidth: number;
  newHeight: number;
  oldExtention: string;
  newExtention?: string;
  fileName: string;
  type: string;
}
