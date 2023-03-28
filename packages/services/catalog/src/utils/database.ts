export function genPaginationParams(pageSize: number, pageIndex: number) {
  return {
    limit: pageSize,
    offset: pageSize * pageIndex
  };
}

export function genDefaultParams() {
  return {
    raw: true,
    nest: true
  };
}
