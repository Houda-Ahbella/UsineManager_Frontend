import * as React from 'react';

export default function Vehicule() {
    const [name,setNum_Chassis]=React.useState('')
    const handlerClick=(e)=>
    {
        e.preventDefault()
        const Vehicule={name}
        console.log(Vehicule)
        fetch("http://localhost:9090/employee/add",{

        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(Vehicule)
        }).then(()=>{
            console.log(" new student added")
        })

    }
  return (
    <html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    </head>
    <body>
    <div class="container">
  <h2>Ajouter Vehicule </h2>
  <form action="/action_page.php">
    <div class="form-group">
      <label for="email">Num chassis:</label>
      <input type="text" class="form-control" id="NumChassis" placeholder="Name" name="name"
      
      value={name}
      onChange={(e)=>setNum_Chassis(e.target.value)}
      ></input>
    </div>
    <button type="submit" class="btn btn-default" onClick={handlerClick}>Submit</button>
  </form>
  {name}
</div>
   </body>
  </html>
  );
}
