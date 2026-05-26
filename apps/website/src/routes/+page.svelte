<script>
  import { Button } from '@cio/ui/base/button';
  import BookOpenIcon from '@lucide/svelte/icons/book-open';
  import UsersIcon from '@lucide/svelte/icons/users';
  import BrainCircuitIcon from '@lucide/svelte/icons/brain-circuit';
  import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
  import AwardIcon from '@lucide/svelte/icons/award';
  import GlobeIcon from '@lucide/svelte/icons/globe';
  import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
  import ZapIcon from '@lucide/svelte/icons/zap';
  import CodeIcon from '@lucide/svelte/icons/code';
  import PaletteIcon from '@lucide/svelte/icons/palette';
  import BarChart3Icon from '@lucide/svelte/icons/bar-chart-3';
  import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
  import CheckIcon from '@lucide/svelte/icons/check';
  import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
  import SparklesIcon from '@lucide/svelte/icons/sparkles';
  import RocketIcon from '@lucide/svelte/icons/rocket';
  import TrophyIcon from '@lucide/svelte/icons/trophy';

  let activeFeature = $state(0);

  const features = [
    {
      icon: BrainCircuitIcon,
      title: 'AI Course Builder',
      description: 'Generate complete courses from a topic or document in minutes. AI structures lessons, creates quizzes, and suggests content — you just review and publish.',
      image: '/ai-course-builder.jpeg'
    },
    {
      icon: LayoutDashboardIcon,
      title: 'Powerful Dashboard',
      description: 'Manage courses, students, analytics, and settings from one unified admin panel. Everything you need to run your academy, zero clutter.',
      image: '/hero-academy.jpeg'
    },
    {
      icon: AwardIcon,
      title: 'Certificates & Badges',
      description: 'Auto-generate branded certificates on course completion. Customize templates, add signatures, and let learners share achievements.',
      image: '/customizable-academy.jpeg'
    },
    {
      icon: GlobeIcon,
      title: 'Custom Domains',
      description: 'Run your academy on your own domain. Full white-label experience — your brand, your URL, your identity.',
      image: '/beautiful-academy-site.jpeg'
    }
  ];

  const stats = [
    { value: '10x', label: 'Faster course creation with AI' },
    { value: '50+', label: 'Question types supported' },
    { value: '∞', label: 'Scalable & self-hostable' },
    { value: '24/7', label: 'AI tutor for every student' }
  ];

  const capabilities = [
    { icon: BookOpenIcon, title: 'Course Management', desc: 'Create, organize, and deliver courses with rich multimedia content, structured lessons, and flexible scheduling.' },
    { icon: UsersIcon, title: 'Student Management', desc: 'Enroll students, track progress, manage groups, and communicate — all from one place.' },
    { icon: BrainCircuitIcon, title: 'AI Teaching Assistant', desc: 'An AI tutor in every lesson that answers questions, adapts to pace, and supports learners 24/7.' },
    { icon: BarChart3Icon, title: 'Analytics & Reports', desc: 'Track completion rates, quiz scores, engagement metrics, and export detailed reports.' },
    { icon: AwardIcon, title: 'Certificates', desc: 'Auto-issue customizable certificates with your branding on course completion.' },
    { icon: MessageCircleIcon, title: 'Community & Discussions', desc: 'Built-in forums, Q&A, and discussion boards to foster peer learning.' },
    { icon: PaletteIcon, title: 'White-Label & Theming', desc: 'Full brand customization — colors, logos, domains. Make it yours completely.' },
    { icon: ShieldCheckIcon, title: 'Compliance Training', desc: 'Track mandatory training, set deadlines, and generate compliance reports.' },
    { icon: CodeIcon, title: 'API & Webhooks', desc: 'Integrate with your stack via REST API, webhooks, and MCP server for AI agents.' },
    { icon: ZapIcon, title: 'Automation', desc: 'Auto-enroll, send reminders, trigger workflows on completion, and connect to Zapier.' },
    { icon: GlobeIcon, title: 'Multi-Language', desc: 'Serve learners globally with built-in i18n support for 10+ languages.' },
    { icon: RocketIcon, title: 'Self-Hosted Option', desc: 'Deploy on your own infrastructure. Full control, full privacy, zero vendor lock-in.' }
  ];
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden px-6 pt-32 pb-20 lg:px-12 lg:pt-44 lg:pb-32">
  <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#f8faff_0%,#eef4ff_50%,#e8f0fe_100%)]"></div>

  <!-- Animated gradient orbs -->
  <div class="pointer-events-none absolute top-20 -left-32 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[100px] animate-pulse"></div>
  <div class="pointer-events-none absolute -right-32 bottom-20 h-[400px] w-[400px] rounded-full bg-indigo-200/20 blur-[80px] animate-pulse" style="animation-delay: 1s;"></div>

  <div class="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
    <!-- Badge -->
    <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm text-amber-700">
      <TrophyIcon size={14} />
      <span>Built for Hackathon — AI-Powered LMS</span>
    </div>

    <h1 class="max-w-[900px] text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] font-bold tracking-tight text-gray-950">
      The Learning Platform That
      <span class="relative inline-block">
        <span class="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Actually Works</span>
        <span class="absolute bottom-1 left-0 z-0 h-3 w-full bg-blue-100/60 rounded-sm"></span>
      </span>
    </h1>

    <p class="mt-6 max-w-[640px] text-base leading-relaxed text-gray-600 lg:text-lg">
      Create courses with AI, manage students, issue certificates, and run your academy on your own domain.
      A complete LMS built from scratch — designed to make online education effortless.
    </p>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
      <a href="/signup">
        <Button class="h-12 px-7 text-base">
          Get Started Free
          <ArrowRightIcon size={18} class="ml-2" />
        </Button>
      </a>
      <a href="#features">
        <Button variant="outline" class="h-12 px-7 text-base">
          Explore Features
        </Button>
      </a>
    </div>

    <!-- Stats band -->
    <div class="mt-14 grid w-full max-w-[700px] grid-cols-2 gap-6 md:grid-cols-4">
      {#each stats as stat}
        <div class="flex flex-col items-center">
          <span class="text-2xl font-bold text-blue-700 lg:text-3xl">{stat.value}</span>
          <span class="mt-1 text-xs text-gray-500 lg:text-sm">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Hero image -->
  <div class="relative z-10 mx-auto mt-16 w-full max-w-[1100px]">
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-blue-900/5">
      <img
        src="/hero-academy.jpeg"
        alt="GurukulX LMS Dashboard — courses, students, analytics"
        width="2560"
        height="1440"
        class="block h-auto w-full"
        loading="eager"
        decoding="async"
      />
    </div>
  </div>
</section>

<!-- Interactive Features Section -->
<section id="features" class="bg-white px-6 py-20 lg:px-12 lg:py-28">
  <div class="mx-auto max-w-[1100px]">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
        Everything to Build Your Academy
      </h2>
      <p class="mx-auto mt-4 max-w-[560px] text-gray-600">
        From AI-powered course creation to branded certificates — every tool you need in one platform.
      </p>
    </div>

    <div class="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <!-- Feature tabs -->
      <div class="flex flex-col gap-2">
        {#each features as feature, i}
          <button
            class="group flex items-start gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 {activeFeature === i ? 'border-blue-200 bg-blue-50 shadow-sm' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}"
            onclick={() => activeFeature = i}
          >
            <div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg {activeFeature === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}">
              <svelte:component this={feature.icon} size={20} />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{feature.title}</h3>
              <p class="mt-1 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          </button>
        {/each}
      </div>

      <!-- Feature preview -->
      <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        {#each features as feature, i}
          {#if activeFeature === i}
            <img
              src={feature.image}
              alt={feature.title}
              class="h-full w-full object-cover object-top"
              loading="lazy"
            />
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Capabilities Grid -->
<section class="bg-gray-50 px-6 py-20 lg:px-12 lg:py-28">
  <div class="mx-auto max-w-[1100px]">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
        Packed with Features
      </h2>
      <p class="mx-auto mt-4 max-w-[500px] text-gray-600">
        A complete LMS with everything built-in. No plugins, no add-ons, no surprises.
      </p>
    </div>

    <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each capabilities as cap}
        <div class="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5">
          <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <svelte:component this={cap.icon} size={22} />
          </div>
          <h3 class="mt-4 font-semibold text-gray-900">{cap.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-500">{cap.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- AI Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 px-6 py-20 lg:px-12 lg:py-28">
  <div class="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

  <div class="relative z-10 mx-auto max-w-[1100px]">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
          <BrainCircuitIcon size={14} />
          Powered by AI
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          AI That Teaches Alongside You
        </h2>
        <p class="mt-4 text-base leading-relaxed text-gray-400 lg:text-lg">
          Every course gets an AI teaching assistant that understands your content. It answers student questions in context, adapts explanations to their level, and frees you from repetitive support.
        </p>
        <ul class="mt-8 space-y-3">
          {#each ['Generates courses from topics or documents', 'Answers student questions 24/7', 'Creates quizzes and assessments automatically', 'Adapts to each learner\'s pace'] as item}
            <li class="flex items-center gap-3 text-gray-300">
              <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <CheckIcon size={14} class="text-blue-400" />
              </div>
              {item}
            </li>
          {/each}
        </ul>
        <div class="mt-8">
          <a href="/signup">
            <Button class="h-11 bg-blue-600 px-6 hover:bg-blue-700">
              Try AI Course Builder
              <ArrowRightIcon size={16} class="ml-2" />
            </Button>
          </a>
        </div>
      </div>
      <div class="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <img
          src="/ai-course-builder.jpeg"
          alt="AI Course Builder generating a course"
          class="h-auto w-full"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

<!-- Hackathon Project Section -->
<section class="bg-white px-6 py-20 lg:px-12 lg:py-28">
  <div class="mx-auto max-w-[1100px]">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div class="order-2 overflow-hidden rounded-2xl border border-gray-200 shadow-lg lg:order-1">
        <img
          src="/public-courses.jpeg"
          alt="Public course catalog"
          class="h-auto w-full"
          loading="lazy"
        />
      </div>
      <div class="order-1 lg:order-2">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700">
          <TrophyIcon size={14} />
          Hackathon Project
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-950 lg:text-4xl">
          Built for Innovation. Ready for Production.
        </h2>
        <p class="mt-4 text-base leading-relaxed text-gray-600 lg:text-lg">
          GurukulX was born as a hackathon project with a bold vision — to build a complete, AI-powered learning management system that rivals enterprise solutions. What started as a sprint has become a fully functional platform.
        </p>
        <ul class="mt-8 space-y-3">
          {#each ['Full-stack LMS built from scratch', 'AI-powered course generation & tutoring', 'Production-ready with real users', 'Continuously evolving with new features'] as item}
            <li class="flex items-center gap-3 text-gray-700">
              <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <CheckIcon size={14} class="text-amber-600" />
              </div>
              {item}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-20 lg:px-12 lg:py-24">
  <div class="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

  <div class="relative z-10 mx-auto flex max-w-[700px] flex-col items-center text-center">
    <h2 class="text-3xl font-bold tracking-tight text-white lg:text-4xl">
      Ready to Launch Your Academy?
    </h2>
    <p class="mt-4 max-w-[500px] text-base text-blue-100 lg:text-lg">
      Start building courses, enrolling students, and issuing certificates today. No credit card required.
    </p>
    <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
      <a href="/signup">
        <Button class="h-12 bg-white px-7 text-base text-blue-700 hover:bg-gray-100">
          Start Building for Free
          <RocketIcon size={16} class="ml-2" />
        </Button>
      </a>
    </div>
  </div>
</section>
