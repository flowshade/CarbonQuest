<script>
    import MenuBar from '../components/MenuBar.svelte'
    import achievements from "../assets/achievements.json"
</script>

<main class="main pb-20">
    <h1 class="m-4 p-4 rounded-lg">Achievements 🏆</h1>
    <div>
        {#each achievements as achievement}
            <section class="section">
                <h2>{achievement.title}</h2>
                <p>{achievement.description}</p>
                <div class="w-full bg-neutral-300 rounded-full h-3 dark:bg-gray-700 mt-3">
                    <div class="bg-green h-3 rounded-full" style="width: 45%"></div>
                </div>
            </section>
        {/each}
    </div>
    <MenuBar/>
</main>