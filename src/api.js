const API_BASE_URL = 'http://localhost:3000/api';

export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tarefa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) {
      throw new Error('Erro ao criar a tarefa');
    }
    const createdTask = await response.json();
    return createdTask;
  } catch (error) {
    console.error('Erro em createTask:', error);
  }
}

export async function updateTask(taskId, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tarefa/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar a tarefa');
    }
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error('Erro em updateTask:', error);
  }
}
