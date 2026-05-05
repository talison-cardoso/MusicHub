import { toast } from '@/utils/toast';

console.log('helo');
function initMusicActions() {
  const container = document.getElementById('music-container');
  const deleteModal = document.getElementById(
    'delete-confirm-modal',
  ) as HTMLDialogElement;
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  const cancelDeleteBtn = document.getElementById('cancel-delete');

  let itemToDelete: { id: string; key: string; card: HTMLElement } | null =
    null;

  if (!container) return;

  container.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('button');
    if (!btn) return;

    const card = btn.closest('.card') as HTMLElement;
    if (!card) return;

    const id = card.dataset.id;
    const musicKey = card.dataset.key;
    const currentTitle = card.dataset.title;

    // DOWNLOAD
    if (btn.classList.contains('download-btn')) {
      if (btn.dataset.loading === 'true') return;

      btn.dataset.loading = 'true';

      const url = btn.dataset.url;
      const filename = btn.dataset.filename || 'audio.mp3';

      if (url) await downloadAudio(url, filename, btn);
    }

    // Ação: Delete
    if (btn.classList.contains('delete-btn') && id && musicKey) {
      itemToDelete = { id, key: musicKey, card };
      deleteModal?.showModal();
    }

    // Ação: Edit
    if (btn.classList.contains('edit-btn') && id) {
      const newTitle = prompt('Novo título:', currentTitle || '');
      if (!newTitle || newTitle === currentTitle) return;

      try {
        const res = await fetch('/api/admin/edit-music', {
          method: 'POST',
          body: JSON.stringify({ id, title: newTitle }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          const titleEl = card.querySelector('.song-title');
          if (titleEl) titleEl.textContent = newTitle;
          card.dataset.title = newTitle;
          toast('Título atualizado!', 'success');
        } else {
          toast('Erro ao atualizar título.', 'error');
        }
      } catch {
        toast('Erro de conexão.', 'error');
      }
    }
  });

  confirmDeleteBtn?.addEventListener('click', async () => {
    if (!itemToDelete) return;

    const { id, key, card } = itemToDelete;

    try {
      const res = await fetch('/api/admin/delete-music', {
        method: 'POST',
        body: JSON.stringify({ id, musicKey: key }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        card.remove();
        toast('Música removida com sucesso!', 'success');
      } else {
        toast('Erro ao deletar do servidor.', 'error');
      }
    } catch {
      toast('Erro ao processar exclusão.', 'error');
    } finally {
      deleteModal?.close();
      itemToDelete = null;
    }
  });

  cancelDeleteBtn?.addEventListener('click', () => {
    console.log('cancelDeleteBtn clicked');
    deleteModal?.close();
    itemToDelete = null;
  });
}

async function downloadAudio(
  url: string,
  filename: string,
  btn: HTMLButtonElement,
) {
  const originalText = btn.innerText;

  try {
    btn.disabled = true;
    btn.innerText = 'Baixando...';

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);

    toast('Música baixada com sucesso!', 'success');
  } catch (err) {
    toast('Falha no download.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerText = originalText;
    btn.dataset.loading = 'false';
  }
}

document.addEventListener('astro:page-load', () => initMusicActions());
