export function getLowResCloudinaryImg(url: string, height: number) {
  if (url && height)
    return url?.replace('/upload/', `/upload/h_${height},c_scale/`);
}
