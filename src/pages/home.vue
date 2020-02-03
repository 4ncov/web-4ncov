<template>
    <div id="home">
        <Nav />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import Nav from '../components/Nav';
export default {
    name: 'Home',
    components: { Nav }
};
</script>
