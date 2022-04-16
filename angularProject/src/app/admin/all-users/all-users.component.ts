import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
allUserData:any
  constructor(private admin:AdminService,private active:ActivatedRoute,private route:Router) {
    this.AllUser()
   }

  ngOnInit(): void {
  }
AllUser(){
  this.admin.showAllUser().subscribe(res=>{
    console.log(res)
    this.allUserData=res
  })
}

deleteuser(userid:any){
  this.admin.deleteUser(userid).subscribe(res=>{
    console.log(res)
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['Admin/ShowAllUser']);
  })
}
}
