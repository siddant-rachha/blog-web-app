export function getLowResCloudinaryImg(url: string, height: number) {
  return url.replace('/upload/', `/upload/h_${height},c_scale/`);
}
