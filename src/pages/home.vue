<template>
    <div id="home">
        <Banner />
        <Nav />
        <ChinaMap @onClick="onClick" />
        <Curr />
    </div>
</template>

<script>
import Banner from '../components/Banner';
import Nav from '../components/Nav';
import ChinaMap from '../components/ChinaMap';
import Curr from './curr';

export default {
    name: 'app',
    components: { Banner, Nav, ChinaMap, Curr },
    data() {
        return {
            menuKey: 'wz',
            count: 0,
            selectedId: 0,
            items: [{ label: '首页' }, { label: '推荐' }, { label: 'Android' }],
            options: {
                activeColor: '#1d98bd'
            }
        };
    },
    methods: {
        load() {
            if (this.count > 100) return;
            this.count += 2;
        },
        tab_change(item, index) {
            console.log(item, index);
        },
        onClick(data) {
            console.log(data);
        }
    }
};
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0.2rem;
    width: 100%;
    text-align: center;
}
.item1 {
    border-bottom: solid 1px #ccc;
    padding: 5px;
}
.item1_foot {
    font-size: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item1_foot .date {
    font-size: 0.2rem;
}
</style>
