<template>
    <div>
        <div class="banner">
            <img src="http://resource.guofangchao.com/4ncov/u213.png"/>
        </div>
        <p class="close">
            <i class="el-icon-close" @click="handleGoBack"></i>
        </p>
        <div class="title">
            <h3>账户信息</h3>
        </div>
        <section>
            <h2>用户信息</h2>
            <table width="100%">
                <tr>
                    <td width="30%"><strong>昵称</strong></td>
                    <td width="70%">{{ user.nickName }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>电话</strong></td>
                    <td width="70%">{{ user.phone }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>角色</strong></td>
                    <td width="70%">{{ roles[user.role] }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>状态</strong></td>
                    <td width="70%">{{ status[user.status] }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>创建时间</strong></td>
                    <td width="70%">{{ user.formattedGmtCreated }}</td>
                </tr>
            </table>
        </section>
        <section>
            <h2>{{ roles[user.role] }}信息</h2>
            <table v-if="user.hospital" width="100%">
                <tr>
                    <td width="30%"><strong>机构名称</strong></td>
                    <td width="70%">{{ user.hospital.name }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>社会信用统一代码</strong></td>
                    <td width="70%">{{ user.hospital.uniformSocialCreditCode }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>联系人</strong></td>
                    <td width="70%">{{ user.hospital.contactorName }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>联系电话</strong></td>
                    <td width="70%">{{ user.hospital.contactorTelephone }}</td>
                </tr>
            </table>
            <table v-if="user.supplier" width="100%">
                <tr>
                    <td width="30%"><strong>机构名称</strong></td>
                    <td width="70%">{{ user.supplier.name }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>是否自备物流</strong></td>
                    <td width="70%">{{ user.supplier.haveLogistics ? '是' : '否' }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>联系人</strong></td>
                    <td width="70%">{{ user.supplier.contactorName }}</td>
                </tr>
                <tr>
                    <td width="30%"><strong>联系电话</strong></td>
                    <td width="70%">{{ user.supplier.contactorTelephone }}</td>
                </tr>
            </table>
        </section>
    </div>
</template>
<script>
    import moment from 'moment'
    import UserService from '../services/user'

    export default {
        name: 'MyDetail',
        data() {
            return {
                user: {},
                roles: {
                    'HOSPITAL': '寻求方',
                    'SUPPLIER': '供应方',
                    'SYSADMIN': '管理员'
                },
                status: {
                    'PENDING': '未认证',
                    'VERIFIED': '已认证',
                    'SUSPENDED': '已注销'
                }
            }
        },
        async created() {
            const user = await UserService.getMyDetail()
            this.user = Object.assign(user, {
                formattedGmtCreated: moment(user.gmtCreated).format('YYYY-MM-DD hh:mm:ss')
            })
        },
        methods: {
            handleGoBack() {
                this.$router.push('/me')
            }
        }
    }
</script>
<style scoped>
    .banner {
        background: #ccc;
    }

    .banner img {
        width: 100%;
    }

    section {
        padding: 0 0.5rem;
        margin-bottom: 0.5rem;
    }

    section table td {
        padding: 0.1rem 0;
    }

    .title {
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .title > h3 {
        font-size: 0.5rem;
        font-weight: normal;
        background-color: rgba(0, 153, 255, 0.117647058823529);
    }

    .close {
        text-align: right;
    }
</style>
