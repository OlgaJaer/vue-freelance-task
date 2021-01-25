<template>
  <span class="badge" :class="statusClass">{{statusName}}</span>
</template>

<script>
import {ref, onMounted} from 'vue'

export default {
  props: ['type'],
  setup(props){
    const statusClass = ref(null)
    const statusName = ref(null)

    onMounted(() => {
    switch (props.type) {
      case 'active':
        statusClass.value = 'primary'
        statusName.value = 'Активный'
        break
      case 'cancelled':
        statusClass.value = 'danger'
        statusName.value = 'Отменён'
        break
      case 'done':
        statusClass.value = 'warning'
        statusName.value = 'Завершён'
        break
      case 'pending':
        statusClass.value = 'primary'
        statusName.value = 'В работе'
        break
    }
    })

    return {
      statusClass,
      statusName
    }
  }
}
</script>
