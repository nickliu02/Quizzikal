<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><h1 id="title">Temp name</h1></li>
        <li><router-link to="/">Home</router-link></li>
        <li id="login"><router-link to="/login">Login</router-link></li>
        <li id="register"><router-link to="/register">Register</router-link></li>

      </ul>
      
    </div>

    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#nav ul {
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  width: 75vw;
  background-color: #333333;
  overflow: hidden;
  border-radius: 3px;
  margin-top: 8px;
}

#nav li {
  float: left;
  
}

#nav a {
  color: white;
  display: block;
  color: white;
  text-align: center;
  padding: 22px 16px;
  text-decoration: none;
  font-family: Verdana, sans-serif;
  font-size: 18px;
  cursor: pointer;

}

#nav a:hover {
  background-color: #111111;
}

#nav a.active {
  background-color: #4CAF50;
}

#nav h1 {
  color: white;
  display: block;
  text-align: center;
  padding: 22px 16px;
  text-decoration: none;
  font-family: Verdana, sans-serif;
  font-size: 18px;
}

#register, #login {
  float: right !important;
}

</style>
