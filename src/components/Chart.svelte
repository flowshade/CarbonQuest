<script>
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';

    export let chartValues;
    export let chartLabels;

	let ctx;
	let chartCanvas;

    let maxDays = -10;

	onMount(async (promise) => {
		ctx = chartCanvas.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: chartLabels.slice(maxDays),
                    datasets: [{
                            label: 'My Carbon Emissions',
                            backgroundColor: '#283D34',
                            borderColor: '#283D34',
                            data: chartValues.slice(maxDays)
                    }]
            }
		});
	});
</script>

<canvas bind:this={chartCanvas} id="myChart" class="mx-2"></canvas>
<p class="text-center">Carbon Stats for the past 10 days</p>