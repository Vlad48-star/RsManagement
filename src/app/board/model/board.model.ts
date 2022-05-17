export interface IBoard {
  id: string;
  title: string;
}
export interface IColumnUpdate {
  order: number;
  title: string;
  id: string;
}
export interface IColumnUpdateResponse {
  order: number;
  title: string;
  id: string;
}

export interface IBoardData {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files?: IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}

export interface INewColumn {
  title: string;
  order: number;
}
