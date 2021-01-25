<template>
  <div class="card" v-if="task">
    <h2>{{task.taskTitle}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.deadline).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending', task.id)">Взять в работу</button>
      <button class="btn primary" @click="changeStatus('done', task.id)">Завершить</button>
      <button class="btn danger" @click="changeStatus('cancelled', task.id)">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>Tут {{taskId}}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {inject, onMounted, ref} from 'vue'
import {useStore} from 'vuex'


export default {
  props: ['taskId'],
  components: {AppStatus},
  setup(props, context){
  const store = useStore()
  //const tasks = inject('tasks') //Почему Inject не работает?? //
  const task = ref(null)

    async function fetchTasks(){
    const data = await fetch(`https://vue-homework-3-default-rtdb.firebaseio.com/tasks.json`)
    if (!data){
      console.log('Список задач пуст')
    } else {
      const res = await data.json()
      const item = Object.keys(res)
                  .map(key => ({id:key, ...res[key]}))
                  .find(item => item.id === props.taskId)
                  task.value = item
    }
  }

  async function changeStatus(type, id){
    console.log(task.value.status)
    try{
        await fetch(`https://vue-homework-3-default-rtdb.firebaseio.com/tasks/${id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: type
        })
    })
    } catch (e){
      console.error(e.message)
    }
    task.value.status = type //ref реактивный, почему изменения сразу не подхватываются?
  }

    fetchTasks()

    return {
      task,
      taskId: props.taskId,
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>