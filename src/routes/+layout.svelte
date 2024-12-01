<script lang="ts">
	import { Button, Fileupload, Label } from 'flowbite-svelte';
	import { Modal } from 'flowbite-svelte';
	import '../app.css';
  
	let { children } = $props();
	let searchQuery = $state('');
	let clickOutsideModal = $state(false);
	let categories = $state(['Note', 'Wishlist', 'Poetry', 'Music']);
	let selectedCategory = $state('Note');
  
	let items = $state({
	  Note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	  Wishlist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	  Poetry: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	  Music: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	});
  
	let newNote = $state({ title: '', description: '', category: 'Note' });
	let fileuploadprops = { id: 'user_avatar' };

	function handleFormSubmit() {
		// Logic to handle form submission
		console.log('New Note:', newNote);
		// Optionally, add the note to `items` or perform other actions
		clickOutsideModal = false; // Close the modal
		newNote = { title: '', description: '', category: 'Note' }; // Reset the form
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet" />
</svelte:head>

{@render children()}

<style>
	/* Your styles here */
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #ccc;
		background-color: #f9f9f9;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.title span {
		font-size: 18px;
		font-weight: bold;
	}
	.search-bar {
		display: flex;
		align-items: center;
		gap: 5px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 5px 10px;
		background-color: #fff;
	}
	.search-bar input {
		border: none;
		outline: none;
		width: 200px;
	}
</style>

<div class="header">
	<div class="title">
		<div class="icon" style="width: 24px; height: 24px; background: #ddd; border-radius: 50%; margin-left: 20px;"></div>
		<span>Note Lister</span>
	</div>
	<div class="search-bar">
		<input type="text" bind:value={searchQuery} placeholder="Search..." />
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
			<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
		</svg>
	</div>
	<Button on:click={() => (clickOutsideModal = true)}>New Notes</Button>

	<Modal title="Create New Note" bind:open={clickOutsideModal} autoclose outsideclose>
		<!-- svelte-ignore event_directive_deprecated -->
		<form on:submit|preventDefault={handleFormSubmit} class="space-y-4">
			<!-- Title Input -->
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
				<input
					type="text"
					id="title"
					bind:value={newNote.title}
					placeholder="Enter title"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
					required
				/>
			</div>

			<!-- Category Dropdown -->
			<div>
				<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
				<select
					id="category"
					bind:value={newNote.category}
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
					required
				>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>

			<!-- File Upload (Visible only for Music category) -->
			{#if newNote.category === 'Music'}
				<div>
					<Label class="pb-2">Upload file</Label>
					<Fileupload {...fileuploadprops} />
				</div>
			{/if}

			<!-- Description Input -->
			<div>
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<textarea
					id="description"
					bind:value={newNote.description}
					placeholder="Enter description"
					rows="4"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
					required
				></textarea>
			</div>

			<!-- Buttons -->
			<div class="flex justify-end space-x-2">
				<Button color="alternative" on:click={() => (clickOutsideModal = false)}>Cancel</Button>
				<Button type="submit">Save</Button>
			</div>
		</form>
	</Modal>
</div>

<div class="flex h-screen">
	<!-- Sidebar -->
	<div class="w-1/4 bg-gray-100 p-4 border-r">
		<ul class="space-y-2">
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
