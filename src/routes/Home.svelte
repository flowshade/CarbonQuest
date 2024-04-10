<script>
    import MenuBar from '../components/MenuBar.svelte'
    import Goal from '../components/Goal.svelte'
    import NewGoal from '../components/NewGoal.svelte'

    // import { liveQuery } from "dexie";
    // import { db } from "../lib/db";

    // let profile = liveQuery(() => db.profile.toArray())
    // if (!profile.name) {location.href = "/profile"}
    // console.log(profile.name)
    
    import { liveQuery } from "dexie";
    import { db } from "../lib/db";

    let profile = liveQuery(() => db.profile.toArray())
    
    let goals = liveQuery(() => db.goals.toArray());
    console.log(goals)

    function checkForStreakGoal() {
        let totalGoals = $goals.length;
        let successfulGoals = 0;
        for (let i in $goals) {
            if ($goals[i].totalEmissions < $goals[i].emissionGoal) {
                successfulGoals += 1;
            }
        }
        return successfulGoals == totalGoals;
    }

    function updateStatistics() {
        let totalDayEmissions = 0;
        for (let i in $goals) {
            totalDayEmissions += $goals[i].totalEmissions;
        }
        let d = new Date()
        let dayStatisticsPayload = {
            emissionsTotal: totalDayEmissions,
            day: `${d.getMonth() + 1} ${d.getDate()} ${d.getFullYear()}`,
            streak: checkForStreakGoal()
        }
        
        try {
            let id = db.stats.add(dayStatisticsPayload)
            console.log(id.value)
        } catch(error) {
            console.log(dayStatisticsPayload, error);
        }
    }
</script>

<main class="main pb-20">
    {#if ($goals)}
    <h1 class="mx-4 mt-4 p-4 rounded-lg">CarbonQuests 🎖️</h1>
        {#each $goals as goal (goal.id)}
            <Goal goal={goal}/>
        {/each}
        {#if ($goals.length == 0)}
            <div class="text-center mt-12 max-h-64">
                <img src="/dreamer.svg" alt="tree-svg" srcset="" class="h-64 w-64 mx-auto">
            </div>
            <p class="mx-4 text-center">Add a <b>CarbonQuest</b> to get started!<br/>Click the <span class="font-bold text-xl text-green">&plus;</span> icon below.</p>
        {:else}
            <button class="button bg-green mx-4 rounded-xl" on:click={updateStatistics}>Save Today's Activity</button>
        {/if}
    {/if}
    <!-- {#if ($profile)}
        {#if ($profile.length == 0)}
            {location.href = "/profile"}
        {:else}
            {console.log("PROFILE EXISTS")}
        {/if}
    {/if} -->
    <NewGoal />
    <MenuBar/>
</main>