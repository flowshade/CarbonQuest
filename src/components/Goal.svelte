<script>
    export let goal;
    export let usageLog = 0;

    import { liveQuery } from "dexie";
    import { db } from "../lib/db";
    let goals = liveQuery(
        () => db.goals.toArray()
    );

    function updateAverageEmissions(goal) {
        let newEmissionsAverage = Math.round((goal.totalEmissions + (usageLog * goal.emissionPerUnit)) / 2);
        db.goals.update(goal.id, 
            {totalEmissions: newEmissionsAverage,
            hoursToday: usageLog}
        )
    }

    if (goal.hoursToday > 0) {
        usageLog = goal.hoursToday
    }
</script>
<section class="bg-green-300">
    <h2 class="font-bold mb-2">{goal.goalTitle}</h2>
    <p class="my-2"><span class="p-1 rounded bg-neutral-200 mr-2 font-mono">{goal.totalEmissions}g CO&#8322;</span><span class="text-red-500">Average Emissions</span></p>
    <p class="my-2"><span class="p-1 rounded bg-neutral-200 mr-2 font-mono">{goal.emissionGoal}g CO&#8322;</span><span class="text-green-600">Goal Emissions</span></p>
    <p class="my-2 mb-4"><span class="p-1 rounded bg-neutral-200 mr-2 font-mono">{goal.hourOrUsageGoal} {goal.step == 0.5 ? "hrs" : "times"}</span><span class="text-green-500">Hour/Usage Goal</span></p>

    <div class="flex">
        <div>
            <button class="button rounded-l-xl px-3 bg-green text-white" on:click={() => {if (usageLog > 0) {usageLog -= goal.step;updateAverageEmissions(goal)}}}>-</button>
        </div>
        <div>
            <input class="input shadow-md" type="number" step={goal.step} bind:value={usageLog} readonly aria-readonly="true">
        </div>
        <div>
            <button class="button rounded-r-xl px-3 bg-green text-white" on:click={() => {if (usageLog < 24) {usageLog += goal.step;updateAverageEmissions(goal);}}}>+</button>
        </div>
    </div>
</section>