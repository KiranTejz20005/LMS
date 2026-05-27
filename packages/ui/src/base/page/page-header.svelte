<script lang="ts">
  import { cn, type WithElementRef } from '../../tools';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    isSticky = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    isSticky?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="page-header"
  class={cn(
    'ui:flex ui:my-4 ui:py-4 ui:px-1 ui:flex-col ui:rounded-xl',
    isSticky && 'ui:sticky ui:top-11 ui:z-10 ui:bg-background/95 ui:backdrop-blur-sm ui:border-b',
    className
  )}
  {...restProps}
>
  <div class="ui:flex ui:items-center ui:justify-between ui:gap-4 ui:flex-col ui:md:flex-row">
    {@render children?.()}
  </div>
</div>
