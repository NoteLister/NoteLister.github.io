<script lang="ts">
	import { onMount } from "svelte";
	import { db } from "$lib/firebaseConfig";
	import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
	import { Button, Modal } from "flowbite-svelte";
  
	interface Note {
	  id?: string;
	  title: string;
	  description: string;
	  category: string;
	  createdAt: Date;
	  musicFile?: string; // Add this to store music data
	}
  
	let categories = ["Note", "Wishlist", "Poetry", "Music"];
	let selectedCategory = "All Notes";
	let notes: Note[] = [];
	let loading = true;
  
	// Modal states
	let addNoteModalOpen = false; // Modal state for adding notes
	let previewNoteModalOpen = false; // Modal state for previewing notes
	let selectedNote: Note | null = null; // Store selected note for preview
  
	// Form for adding new notes
	let newNote: Partial<Note> = { title: "", description: "", category: "Note", musicFile: "" };
	let musicFile: File | null = null; // For storing the selected music file
  
	const notesCollection = collection(db, "notes");
  
	// Fetch Notes from Firestore
	async function fetchNotes() {
	  loading = true;
	  const q = query(notesCollection, orderBy("createdAt", "desc"));
	  const querySnapshot = await getDocs(q);
	  notes = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Note),
	  }));
	  loading = false;
	}
  
	// Add a New Note
	async function addNote() {
	  if (newNote.title && newNote.description && newNote.category) {
		const newNoteData: Partial<Note> = {
		  title: newNote.title,
		  description: newNote.description,
		  category: newNote.category,
		  createdAt: new Date(),
		};
  
		if (musicFile) {
		  const reader = new FileReader();
		  reader.readAsDataURL(musicFile);
		  reader.onloadend = async () => {
			newNoteData.musicFile = reader.result?.toString().split(",")[1];
			try {
			  await addDoc(notesCollection, newNoteData);
			  addNoteModalOpen = false; // Close modal
			  newNote = { title: "", description: "", category: "Note", musicFile: "" }; // Reset form
			  musicFile = null; // Reset music file
			  fetchNotes(); // Refresh notes
			} catch (error) {
			  console.error("Error adding note:", error);
			}
		  };
		  reader.onerror = () => {
			console.error("Error reading file.");
			alert("Error reading music file.");
		  };
		} else {
		  // Add the note without music
		  await addDoc(notesCollection, newNoteData);
		  addNoteModalOpen = false; // Close modal
		  newNote = { title: "", description: "", category: "Note", musicFile: "" }; // Reset form
		  fetchNotes(); // Refresh notes
		}
	  }
	}
  
	// Open preview modal for a specific note
	function openNoteModal(note: Note) {
	  selectedNote = note;
	  previewNoteModalOpen = true; // Open preview modal
	}
  
	// Delete Note
	async function deleteNote() {
	  if (selectedNote?.id) {
		try {
		  const noteRef = doc(db, "notes", selectedNote.id);
		  await deleteDoc(noteRef);
		  previewNoteModalOpen = false; // Close the modal
		  fetchNotes(); // Refresh notes list after deletion
		} catch (error) {
		  console.error("Error deleting note:", error);
		}
	  }
	}
  
	// Handle music file input
	function handleMusicFileChange(event: Event) {
	  const input = event.target as HTMLInputElement;
	  if (input.files && input.files.length > 0) {
		musicFile = input.files[0];
	  }
	}
  
	onMount(fetchNotes);
  
	// Filter Notes by Category
	function getFilteredNotes(): Note[] {
	  if (selectedCategory === "All Notes") {
		return notes;
	  }
	  return notes.filter((note) => note.category === selectedCategory);
	}
  </script>
  
  <div class="header flex items-center justify-between bg-green-500 text-white p-4 ">
	<div class="flex items-center space-x-2 ">
	  <div class=" icon w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ml-1">
		<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clip-rule="evenodd"/>
		  </svg>
		  
	  </div>
	  <h1 class="text-2xl font-bold text-black">Note Lister</h1>
	</div>
  
	<!-- Add Button for New Notes -->
	<Button
	  class="bg-white text-black   font-bold rounded-lg px-4 py-2 hover:bg-green-100 transition duration-200"
	  on:click={() => (addNoteModalOpen = true)}
	>
	  Add New Notes
	</Button>
  </div>
  
  <div class="flex h-screen">
	<!-- Sidebar -->
	<div class="w-1/4 bg-gray-100 p-4 border-r">
	  <!-- svelte-ignore a11y_click_events_have_key_events -->
	  <ul class="space-y-2">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<li
		  on:click={() => (selectedCategory = "All Notes")}
		  class="cursor-pointer p-2 text-lg font-bold rounded-lg hover:bg-green-100 transition duration-200
		  {selectedCategory === 'All Notes' ? 'bg-green-100 text-black' : ''}"
		>
		  All Notes
		</li>
		{#each categories as category}
		  <!-- svelte-ignore a11y_click_events_have_key_events -->
		  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
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
  
	<!-- Main Content -->
	<div class="flex-1 p-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
		  {#if loading}
			<p>Loading...</p>
		  {:else if getFilteredNotes().length > 0}
			{#each getFilteredNotes() as note}
			  <!-- svelte-ignore a11y_click_events_have_key_events -->
			  <!-- svelte-ignore a11y_no_static_element_interactions -->
			  <div
				class="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
				on:click={() => openNoteModal(note)}
			  >
				<div class="flex justify-between items-center mb-2">
				  <h2 class="text-lg font-bold truncate">{note.title}</h2>
				  <span class="bg-black text-white px-3 py-1 rounded-full text-xs">
					{note.category}
				  </span>
				</div>
				<p class="text-gray-700 overflow-hidden text-ellipsis line-clamp-3">
				  {note.description}
				</p>
			  </div>
			{/each}
		  {:else}
			<p class="text-center text-gray-500">No notes found in this category.</p>
		  {/if}
		</div>
	  </div>
	  
	  
  </div>
  
  <!-- Add New Notes Modal -->
  <Modal title="Create New Note" bind:open={addNoteModalOpen}>
	<form class="space-y-4" on:submit|preventDefault={addNote}>
	  <div>
		<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
		<input
		  type="text"
		  id="title"
		  bind:value={newNote.title}
		  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
		  required
		/>
	  </div>
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
	  {#if newNote.category === 'Music'}
		<div>
		  <label for="fileUpload" class="block text-sm font-medium text-gray-700">Upload Music</label>
		  <input
			type="file"
			id="fileUpload"
			accept="audio/*"
			on:change={handleMusicFileChange}
			class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
		  />
		</div>
	  {/if}
	  <div>
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea
		  id="description"
		  bind:value={newNote.description}
		  rows="4"
		  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200"
		  required
		></textarea>
	  </div>
	  <div class="flex justify-end space-x-2">
		<Button color="green" pill on:click={() => (addNoteModalOpen = false)}>Cancel</Button>
		<Button color="green" pill type="submit">Save</Button>
	  </div>
	</form>
  </Modal>
  
  <!-- Preview Note Modal -->
  <!-- Preview Note Modal -->
{#if selectedNote}
<Modal title={selectedNote.title} bind:open={previewNoteModalOpen}>
  <div class="max-h-[75vh] overflow-auto">
	<div class="mb-4">
	  <!--<h2 class="text-lg font-bold truncate">{selectedNote.title}</h2> -->
	  <p class="text-sm text-black font-bold">{selectedNote.category}</p>
	</div>
	<div class="mb-4">
	  <!-- Limit the description to avoid overflow -->
	  <p class=" whitespace-pre-wrap break-words text-black font-bold">
		{selectedNote.description}
	  </p>
	</div>
	{#if selectedNote.musicFile}
	  <div class="mb-4">
		<audio controls class="w-full">
		  <source
			src={`data:audio/mp3;base64,${selectedNote.musicFile}`}
			type="audio/mpeg"
		  />
		  Your browser does not support the audio element.
		</audio>
	  </div>
	{/if}
  </div>
  <div class="flex justify-end space-x-2">
	<Button color="green" pill on:click={() => (previewNoteModalOpen = false)}>Close</Button>
	<Button color="green" pill	 on:click={deleteNote}>Delete</Button>
  </div>
</Modal>
{/if}

  