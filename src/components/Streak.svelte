
<script>
    import { db } from "../lib/db";
    import { liveQuery } from "dexie";
    
    let getStreak = async () => {
        return await db.stats.toArray().then((data) => {
            let streak = 0;
            for (let i in data) {
                if (data[i].streak == false) {
                    streak = 0;
                } else if (data[i].streak == true) {
                    streak++;
                }
            }

            return streak;
        })
    }

    let shareProfile = (streak) => {
        if (navigator.share) {
            navigator.share({
                title: 'CarbonQuest',
                text: `I have a ${streak} day streak on CarbonQuest!`,
                url: 'https://flowshade.github.io/CarbonQuest',
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }
    }

    function info (streak) { alert(`You've met your emission goals for all your CarbonQuests for ${streak} ${(streak == 1) ? "day" : "days"}!`) }
    let streak = getStreak().then(data => data);
    
</script>

<div>
    {#await streak}
        <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-green" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    {:then streakData}
        <section class="flex">
            <div class="grow p-2"><p>
                <span class="">🔥</span>{streakData} day streak! </p></div>
            <div class=" mx-1"><button on:click={() => { info(streakData)}} class="text-green p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>                  
            </button></div>
            <div class="font-bold mx-1"><button on:click={() => {shareProfile(streakData)}} class="text-green p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>                  
            </button></div>
        </section>
    {/await}
</div>