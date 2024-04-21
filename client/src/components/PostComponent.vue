<script setup>
import PostService from '../PostService'  //note imports are based starting on directory where this file is located - NOT root of project
</script>

<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <!-- Create Post Here -->
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">  <!-- Recall: v-model is binding value of this input to our text data field-->
      <button @click="createPost">Post!</button>   <!-- NOTE: @click= is just a shortcut for v-on:click=-->
    </div>
    <hr>
    <p class="error" v-if="error">{{  error }}</p>
    <div class="posts-container">
      <div class="post" 
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)">  <!-- this means: if user double clicks on this div, call deletePost method on this post-->
      
        {{  `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}   <!--date formatting-->
        <p class="text">{{  post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created () {  //lifecycle method - runs automatically when this component is initialized (per instance i think...?)
    try {
      this.posts = await PostService.getPosts();      //static method we defined in PostService.js to get a post from backend
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    //adds a post
    async createPost() {    
      await PostService.insertPost(this.text);      //calls static method of PostService to make a post. PostService::insertPost in turn makes a call from frontend --> backend to make the post in backend
      this.posts = await PostService.getPosts();   //refresh the posts on page now that they have been updated in database
    },
    //deletes a post
    async deletePost(id) {    
      await PostService.deletePost(id);      //calls static method of PostService to make a post. PostService::insertPost in turn makes a call from frontend --> backend to make the post in backend
      this.posts = await PostService.getPosts();  //refresh the posts on page now that they have been updated in database
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color:  #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
