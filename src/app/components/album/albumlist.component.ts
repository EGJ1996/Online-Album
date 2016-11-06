import { Component,OnInit } from '@angular/core';
import {Auth} from '../../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as fire from 'firebase';
@Component({
    selector: 'album',
    templateUrl: './album.component.html'
})
export class AlbumComponent{ 
    albums: FirebaseListObservable<any>;
    friendAlbums:FirebaseListObservable<any>;
    friendalbs:any[]=[];
    deleteNode(ev:any){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var tag=ev.target.id;
        var fb=fire.database().refFromURL('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/albums/'+tag);
        //console.log(fb);
       // console.log(al);
        fb.remove();
    }
    constructor(private af:AngularFire){
       var profile = JSON.parse(localStorage.getItem('profile'));
       //console.log(profile['email']);
       this.albums=af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/albums');
       this.getUsers();
        }
    getUsers(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var us;
        this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/friends')
        .subscribe(data=>{
            data.forEach(item=>{
                var lnk='https://my-project-655d3.firebaseio.com/users/'+item['$value']+'/albums';
                console.log(lnk);
               this.af.database.list(lnk).subscribe(d=>{
                   d.forEach(it=>{
                       console.log(it);
                       this.friendalbs.push(it);
                   });
               });
            });
        });
    }
}
