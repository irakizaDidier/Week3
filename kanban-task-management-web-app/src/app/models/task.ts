export interface Board {
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface BoardsResponse {
  boards: Board[];
}
