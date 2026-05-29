<script lang="ts">
  import { Button } from '@cio/ui/base/button';
  import { t } from '$lib/utils/functions/translations';
  import * as Dialog from '@cio/ui/base/dialog';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';

  interface Props {
    open?: boolean;
    onDelete?: () => void;
    isLoading?: boolean;
  }

  let { open = $bindable(false), onDelete = () => {}, isLoading = false }: Props = $props();

  function handleDelete() {
    onDelete();
    // Close modal after delete
    setTimeout(() => { open = false; }, 300);
  }
</script>

<Dialog.Root
  bind:open
  onOpenChange={(isOpen) => {
    if (!isOpen && !isLoading) open = false;
  }}
>
  <Dialog.Content class="max-w-[300px] p-5 rounded-xl">
    <div class="flex flex-col items-center gap-3 text-center">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
        <Trash2Icon size={18} class="text-gray-600 dark:text-gray-400" />
      </div>
      <div>
        <p class="text-sm font-medium">{$t('delete_modal.label')}</p>
        <p class="mt-1 text-xs text-muted-foreground">This can't be undone.</p>
      </div>
    </div>
    <div class="mt-4 flex gap-2">
      <Button variant="outline" size="sm" class="flex-1" onclick={() => (open = false)} disabled={isLoading}>
        Cancel
      </Button>
      <Button variant="destructive" size="sm" class="flex-1" onclick={handleDelete} loading={isLoading}>
        Delete
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
