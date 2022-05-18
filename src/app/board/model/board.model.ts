export interface IBoard {
  id: string;
  title: string;
  description: string;
}
export interface IColumnUpdate {
  order: number;
  title: string;
  id: string;
}
export interface IColumnUpdateResponse extends IBoard {
  order: number;
}

export interface IBoardData extends IBoard {
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
