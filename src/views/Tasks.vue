<template>
  <h1 v-if="!ifTasks" class="text-white center">Задач пока нет</h1>
  <!-- <div class="loader"></div> -->
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{activeCount}}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{task.taskTitle}}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.deadline).toLocaleDateString()}}
          </small>
        </strong>
      </p>

      <router-link :to="'/task/' + task.id" v-slot="{navigate}">
        <button class="btn primary" @click="navigate">Посмотреть</button>
      </router-link>

    </div>
  </template>
</template>

<script>
import {ref, computed, onMounted, onBeforeMount, provide} from 'vue'
import {useStore, mapGetters} from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
  components: {AppStatus},

  setup(){
    const store = useStore()

    const tasks = ref([])

    async function fetchTasks(){
    const data = await fetch(`https://vue-homework-3-default-rtdb.firebaseio.com/tasks.json`)
    if (!data){
      console.log('Список задач пуст')
    } else {
      const res = await data.json()
      const items = Object.keys(res)
                  .map(key => ({id:key, ...res[key]}))
      const activeItemsCount = items.filter(i => i.status === 'active').length
      store.commit('getActiveCount', activeItemsCount)
      tasks.value = items
    }
  }

    
    onMounted(() => {
      fetchTasks()
    })

    provide('tasks', tasks)
    const ifTasks = computed(() => tasks.value.length !== 0)

    return {
      tasks,
      ifTasks,
      activeCount: store.getters.activeTasks
    }
  }

}
</script>
