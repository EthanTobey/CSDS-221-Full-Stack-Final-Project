import axios from 'axios';

//route to backend
const url = 'api/posts/';  //adds the http://localhost:5000 at front in vue.config.js
 
//class to communicate from frontEnd (here) to backEnd (mongoDB)
class PostService {
    //Get Posts - get the posts data from the backend
    static getPosts() {
       //ChatGPT resolved code
        return new Promise((resolve, reject) => {     //if promise works, we call resolve - if there is an error, it calls reject
            axios.get(url)
                .then(res => {
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))               
                    );
                })
                .catch(err => {
                    reject(err);
                });
        });     
   /*  VIDEO CODE
        return new Promise(async (resolve, reject) => {  
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))               
                );
                //loop through the data from successfull query
            } catch(err) {    //an error
                reject(err);
            }
        });     */
    }

    //Create Post    - send a created post to backend
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }
    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);    // RECALL - backticks allow for passing variables in easily with ${} syntax
    }
}

export default PostService;