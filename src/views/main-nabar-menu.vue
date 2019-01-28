<template>
  <el-menu-item   :index="menu.menuId + ''" >
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>
<script>
    export default {
      props: {
        menu: {
          type: Object,
          required: true
        }
      }
    }
</script>

<style scoped>

</style>
