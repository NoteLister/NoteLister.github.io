<script lang="ts">
    let categories =  $state (['Note', 'Wishlist', 'Poetry', 'Music']);
    let selectedCategory =  $state ('Note');

    let items = $state({
Note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
Wishlist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
Poetry: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
Music: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}) 
</script>

<div class="flex h-screen">
<!-- Sidebar -->
<div class="w-1/4 bg-gray-100 p-4 border-r">
  <ul class="space-y-2">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    {#each categories as category}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore event_directive_deprecated -->
      <li
        on:click={() => (selectedCategory = category)}
        class="cursor-pointer p-2 text-lg font-bold rounded-lg hover:bg-green-100 transition duration-200 
          {selectedCategory === category ? 'bg-green-100 text-black' : ''}"
      >
        {category}
      </li>
    {/each}
  </ul>
</div>

<!-- Content Section -->
<div class="flex-1 p-4">
  <div class="grid grid-cols-2 gap-4">
{#each categories as category}
<div class="bg-gray-100 p-4 rounded-lg shadow">
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-lg font-bold">{category}</h2>
    <span class="bg-black text-white px-2 py-1 rounded-lg text-sm">{category}</span>
  </div>
  <p class="text-gray-700">
    {#each Array(4) as _}
      {items[category as keyof typeof items]}<br />
    {/each}
  </p>
</div>
{/each}
  </div>
</div>
</div>