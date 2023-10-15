<script>
  import { Router, Link, Route } from "svelte-routing";

  import Home from "./routes/Home.svelte";
  import Profile from "./routes/Profile.svelte";
  import Achievements from "./routes/Achievements.svelte";
  import Stats from "./routes/Stats.svelte";

  import logo from '/logo.png';
  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/stats"><Stats/></Route>
    <Route path="/achievements"><Achievements/></Route>
    <Route path="/profile"><Profile/></Route>
    <Route path="/"><Home /></Route>
  </div>
</Router>

<style>

</style>