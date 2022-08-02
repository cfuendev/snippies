let getObjectsWithUniqueValue = (arr: {}[], prop: string) => {
  let uniqueBuffer: any = [];
  let uniqueResult: any = [];
  arr.forEach((arrItem: any) => {
    uniqueBuffer.find((buffer: any) => buffer === arrItem[prop]) == undefined
      ? uniqueBuffer.push(arrItem[prop])
      : uniqueBuffer.push(null);
  });
  uniqueBuffer.forEach((buffer: any) => {
    buffer === null
      ? null
      : uniqueResult.push(arr[uniqueBuffer.indexOf(buffer)]);
  });
  return uniqueResult;
};

export default getObjectsWithUniqueProperty;
