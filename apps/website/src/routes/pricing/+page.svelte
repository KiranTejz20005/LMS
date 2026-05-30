<script lang="ts">
  import { PageSignupCTA, PageHeader } from '$lib/components';
  import { Button } from '@cio/ui/base/button';
  import ConstructionIcon from '@lucide/svelte/icons/construction';
</script>

<svelte:head>
  <title>Pricing | GurukulX</title>
</svelte:head>

<section class="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20">
  <div class="flex flex-col items-center text-center">
    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
      <ConstructionIcon size={32} class="text-amber-600" />
    </div>
    <h1 class="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">Payment System Under Development</h1>
    <p class="mt-4 max-w-md text-gray-600">
      Our payment and subscription system is currently being built. All features are available for free during this development phase.
    </p>
    <div class="mt-8 flex gap-3">
      <Button href="https://lms-gurukul.vercel.app/">Get Started Free</Button>
      <Button href="/" variant="outline">Back to Home</Button>
    </div>
  </div>
</section>
