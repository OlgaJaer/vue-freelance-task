<template>
  <form class="card" @submit.prevent="addNewTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="body"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>

<script>
import {ref, computed} from 'vue' 
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default{
  setup(){
    const router = useRouter()
    const title = ref('')
    const date = ref('')
    const body = ref('')

    const store = useStore()

    const isValid = computed(() => title.value !== '' && body.value !== '' && date.value !== '')

    async function addNewTask() {
      try {
      const response = await fetch(`https://vue-homework-3-default-rtdb.firebaseio.com/tasks.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskTitle: title.value,
          deadline: date.value,
          description: body.value,
          status: new Date(date.value) > new Date() ? 'active' : 'cancelled'
        })
      })
      if (new Date(date.value) > new Date()){
          store.commit('incrementActiveCount')
      }
        router.push('/tasks')
      } catch (e){
        console.error(e.message)
      } 
    }
  
    return {
      title,
      date,
      body,
      isValid,
      addNewTask
    }
  }
}
</script>