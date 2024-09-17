export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  board: string;
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}
