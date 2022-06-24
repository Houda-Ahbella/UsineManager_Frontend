import 'bootstrap/dist/css/bootstrap.css'
import '../e.css'
 const RoleNavbar=({roles,id , len})=>
{

    let Produc = false;
    let Usine = false;
    let Admin = false;
    
    
    for(let i=0;i<len;i++)
    {   
        
        if(roles[i].key.roleId==1 || roles[i].key.roleId==2|| roles[i].key.roleId==3 
            || roles[i].key.roleId==4 )
        {
            Produc=true;
        }
         else if(roles[i].key.roleId==5)
         {
             Usine = true;
            
         }
         else if(roles[i].key.roleId==6)
         {
             Admin = true;
         }
        
    }
    

   

    return(
        <nav id="sidebarMenu" class="nav col-md-3 col-lg-2 d-md-block bg-light sidebar collapse navbar-fixed-top">
      <div class="position-fixed pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <span data-feather="home" class="align-text-bottom"></span>
              Tableau de bord
            </a>
          </li>
          {Produc? (
          <li class="nav-item">
            <a class="nav-link" href={"/AllLot?m="+id}>
              <span data-feather="file" class="align-text-bottom"></span>
              <i class="bi bi-truck"></i>&nbsp;
              Gestion de production
            </a>
          </li>) : (<></>
           )}
           {Usine? (
               <>
             <span class="nav-link">
              <span data-feather="file" class="align-text-bottom"></span>
              <i class="bi bi-list-check"></i> &nbsp;Gestion d'usine
            </span>
          <li class="nav-item">
            <a class="nav-link" href={"/Allmarques?m="+id} style={{ color: 'rgb(158 158 158)' }}>
              
            <i class="bi bi-arrow-right"></i>&nbsp;Marque/Modèle/Etape
            </a>
            <a class="nav-link" href={"/Allproblemes?m="+id} style={{ color: 'rgb(158 158 158)' }}>
              <span data-feather="file" class="align-text-bottom"></span>
              <i class="bi bi-arrow-right"></i>&nbsp;Problèmes de qualié
            </a>
          </li>
          </>) : (<></>
           )}
           {Admin? (
               <>
          <li class="nav-item">
            <a class="nav-link" href={"/Allutilisateurs?m="+id}>
              <span data-feather="file" class="align-text-bottom"></span>
              <i class="bi bi-person-lines-fill"></i>&nbsp; Gestion des utilisateurs
            </a>
          </li>
          </>) : (<></>
           )}
        </ul>
      </div>
    </nav>
    )
}
export default RoleNavbar;