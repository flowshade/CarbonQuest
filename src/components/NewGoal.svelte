<script>
    import { db } from "../lib/db";
    import emissions from "../assets/emissions.json"

    export let goalTitle;
    export let multiplier;
    export let emissionGoal;
    async function addGoal() {
        try {
            let payload = {
                goalTitle: goalTitle.name,
                totalEmissions: (goalTitle.emission * multiplier),
                emissionGoal: (emissionGoal * goalTitle.emission),
                emissionPerUnit: goalTitle.emission,
                hourOrUsageGoal: emissionGoal,
                step: (goalTitle.time == 1 ? 0.5 : 1),
                hoursToday: 0
            }
            const id = db.goals.add(payload);
            location.href = "#"
        } catch (error) {
            console.log(`Failed to add ${goalTitle}: ${error}`)
        }
    }

</script>


<a class="modal-overlay" id="addGoal">
    <section class="modal">
        <h1 class="text-2xl mb-3">Add Goal</h1>
        <select bind:value={goalTitle} placeholder="Goal Title" class="input block rounded-xl">
            {#each emissions as optionName}
                <option value={optionName}>{optionName.name}</option>
            {/each}
        </select>
        {#if (goalTitle)}
            {#if (goalTitle.time == 1)}
                <input type="text" bind:value={multiplier} placeholder="Hours used per day" class="input block rounded-xl">
            {:else}
                <input type="text" bind:value={multiplier} placeholder="Times used/done per day" class="input block rounded-xl">
            {/if}
        {/if}
        <input type="text" bind:value={emissionGoal} placeholder="Goal times/hours" class="input block rounded-xl">
        <button on:click={addGoal} class="button bg-green rounded-xl">Add Goal!</button>
        <a class="button rounded-xl bg-red-600" href="#">Close</a>
    </section>
</a>