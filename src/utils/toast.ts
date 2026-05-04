export const toast = (
  message: string,
  type: 'success' | 'error' | 'info' = 'success',
) => {
  const container =
    document.getElementById('toast-container') || createContainer();
  const toast = document.createElement('div');

  toast.className = `toast toast-${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  // Remove após 3 segundos
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
};

function createContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  document.body.appendChild(container);
  return container;
}
