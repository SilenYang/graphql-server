export interface ITodoItme {
  id: number;
  expriedTime: string;
  title: string;
  desc: string;
  createTime: string;
  checked?: boolean;
}

export interface sqlInsertResponse {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
