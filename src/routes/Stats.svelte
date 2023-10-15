<script>
    import MenuBar from '../components/MenuBar.svelte'
    import { db } from "../lib/db";
    import { liveQuery } from "dexie";
    import Chart from '../components/Chart.svelte'
    
    let getData = async () => {
        return await db.stats.toArray().then((data) => {
            let chartDays = [];
            let chartEmissions = [];
            for (let i in data) {
                chartDays.push(data[i].day);
                chartEmissions.push(data[i].emissionsTotal);
            }
            return ([chartDays, chartEmissions])
        })
    }

    let stats = getData().then(data => data);
    
</script>

<main class="main">
    <h1 class="m-4 p-4 rounded-lg">Emission Stats 📈</h1>
    {#await stats}
        <p>LOADING</p>
    {:then data}
        <Chart chartValues={data[1]} chartLabels={data[0]}/>
    {/await}
    <MenuBar/>
</main>