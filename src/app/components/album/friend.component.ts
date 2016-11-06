import { Component,ElementRef,OnInit,Input} from '@angular/core';
import {Auth} from '../../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as fire from 'firebase';
import {Router,ActivatedRoute} from '@angular/router';
import {Http,Headers,RequestOptions} from '@angular/http';
@Component({
    selector: 'users',
    templateUrl: './friends.html'
})

export class FriendComponent implements OnInit{
    @Input() users:any[]=[];
    @Input() requests:any[]=[];
    @Input() friends:any[]=[]; 
    constructor(private element: ElementRef,private af:AngularFire,private active:ActivatedRoute,private route:Router) {
    }
    isPresent(user:any,items:any){
        for(var i=0;i<items.length;i++){
            if(items[i]==user){
                return true;
            }
        }
        return false;
    }
    addUsers(){
          var profile = JSON.parse(localStorage.getItem('profile'));
         this. af.database.list('https://my-project-655d3.firebaseio.com/users/')
        .subscribe(data=>{
            //console.log(data);
            data.forEach(it=>{
                if(it['$key']!=profile['nickname'] && this.isPresent(it['$key'],this.users)==false && this.isPresent(it['$key'],this.friends)==false){
                    this.users.push(it['$key']);
                }
            });
            //console.log(this.users);
        });
    }
    getRequests(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        this. af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/requests')
        .subscribe(data=>{
            data.forEach(it=>this.requests.push(it['$value']));
             console.log(this.requests);
        });
    }
    sendRequest(ev:any){
        //console.log(ev.target.id);
         var profile = JSON.parse(localStorage.getItem('profile'));
        var tar=ev.target.id;
        var fb=this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+tar+'/requests');
        fb.push(profile['nickname']);
        for(var i=0;i<this.users.length;i++){
            if(this.users[i]==tar){
                this.users.splice(i,1);
            }
        }
        //fb.update(profile['nickname'],'request');
    }
    deleteReq(val:any){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var fb=this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/requests');
        fb.subscribe(data=>{
           data.forEach(it=>{
               if(it['$value']==val){
                   var fb1=fire.database().refFromURL('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/requests/'+it['$key']);
                   fb1.remove();
               }
           });
        });
    }
    acceptFriend(ev:any){
        var tar=ev.target.id;
        var profile = JSON.parse(localStorage.getItem('profile'));
        var fb=this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/friends');
        fb.push(tar);
        this.deleteReq(tar);
        for(var i=0;i<this.requests.length;i++){
            if(this.requests[i]==tar){
                this.requests.splice(i,1);
            }
        }
    }
    getFriends(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/friends')
        .subscribe(data=>{
            data.forEach(item=>{
                if(this.isPresent(item['$value'],this.friends)==false){
                    this.friends.push(item['$value'])
                }
            });
        });
    }
    removeFriend(ev:any){
        //console.log("Remove function called");
        //console.log(ev.target.id);
        var profile = JSON.parse(localStorage.getItem('profile'));
        var tar=ev.target.id;
        var fb=this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/friends/')
        .subscribe(data=>{
            data.forEach(item=>{
                if(item['$value']==tar){
                     var fb=fire.database().refFromURL('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/friends/'+item['$key']);
                     fb.remove();
                }
            });
        });
        for(var i=0;i<this.friends.length;i++){
            if(this.friends[i]==tar){
                this.friends.splice(i,1);
            }
        }
    }
    ngOnInit(){
        this.addUsers();
        this.getRequests();
        this.getFriends();
    }
}
