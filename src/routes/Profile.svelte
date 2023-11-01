<script>
    import MenuBar from '../components/MenuBar.svelte'
  import Streak from '../components/Streak.svelte';
    import { db } from "../lib/db";
    import { liveQuery } from "dexie";
    import { navigate } from "svelte-routing";
    let displayName = liveQuery(() => db.profile.toArray());
    export let name = (displayName.name) ? displayName.name : "";

    let addProfile = async () => {
        try {
            let payload = {
                name: name
            }
            const id = db.profile.add(payload);
            navigate("/", { replace: false });
        } catch (error) {
            console.log(`Failed to add ${name}: ${error}`)
        }
    }

    let clearName = async () => {
       try {
            let deel = await db.profile.clear();
            console.log("DELETED PROFILE");
       } catch (error) {
            console.log(`Failed to delete!!!: ${error}`)
       }
    }

    let shareProfile = (name) => {
        if (navigator.share) {
            navigator.share({
                title: 'CarbonQuest',
                text: `Join ${name} in reducing your carbon footprint!`,
                url: 'https://flowshade.github.io/CarbonQuest',
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }
    }

</script>

<main class="main">
    {#if $displayName}
        {#if $displayName.length == 0}
            <div class="p-3 text-center" id="editName">
                <h1 class="text-2xl my-8">Welcome to <b>CarbonQuest</b>!</h1>
                <input type="text" name="" class="inline input rounded-xl shadow-xl" bind:value={name} placeholder="What's your name?">
                <button on:click={addProfile} class="inline button bg-green rounded-xl">Save</button>
                <img src="/" alt="nature" srcset="nature.svg" class="mt-8">
            </div>
        {:else}
            <h1 class="m-4 p-4 rounded-lg">Your Profile</h1>
            <div class="text-center">
                {#each $displayName as profile (profile.id)}
                    <h2 class="text-center my-5">
                        {profile.name}
                        <button on:click={clearName}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-5 h-5 stroke-green">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </h2>
                    <button on:click={() => {shareProfile(profile.name)}} class="inline button rounded-xl bg-green">
                        Share Profile
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>                      
                    </button>
                {/each}
            </div>
            <Streak/>
            <MenuBar/>
        {/if}
    {/if}
</main>