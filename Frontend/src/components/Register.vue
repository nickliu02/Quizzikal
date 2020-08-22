<template>
    <div id="page">

        <div id="wrapper">
            <div id="form">
                <form>
                    <h1>Register</h1>

                    <label for="email"><b>In-game Name</b></label>
                    <input name="nickname" type="text" v-model="nickname" placeholder="In-game Name" required>
                  
                    <label for="email"><b>Email</b></label>
                    <input name="email" type="email" v-model="email" placeholder="Email" required>
                
                    <label for="password"><b>Password</b></label>
                    <input name="password" type="password" v-model="password" placeholder="Password" required>

                    <label for="password"><b>Repeat Password</b></label>
                    <input name="rpassword" type="password" v-model="rpassword" placeholder="Repeat Password" required>
          
                    <button type="submit">Submit</button>
                </form>
                <div id="link">Already have an account? Click here to <router-link to="/login">sign in.</router-link></div>
            </div>
            
        </div>

    </div>
</template>

<script>

export default {
    name: "Register",
}
</script>

<style scoped>

* {box-sizing: border-box}
    .error {
        color: red;
    }

#page {
    font-family: "Helvetica Neue", Helvetica, Arial;
}

#wrapper {
    padding: 0;
    box-shadow: 0px 0px 2px;
    margin: 30px auto;
    width: 75vw;
}

#form {
    padding: 20px;
}

#form h1 {
    padding: 0;
    margin-top: 10px;
    margin-bottom: 15px;
}

input[type=email], input[type=password], input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=email]:focus, input[type=password]:focus, input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

#link {
    margin-top: 10px;
}



</style>