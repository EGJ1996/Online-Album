import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Album} from '../../../Album';

@Component({
    selector: 'create-album',
    templateUrl: './createalbum.component.html'
})
export class CreateAlbumComponent { 
    name:string;
    description:string;
    ddate:Date;
    albs:Album[]=[];
    allAlbums:FirebaseListObservable<any>;
    constructor(private af:AngularFire){
       var profile = JSON.parse(localStorage.getItem('profile'));
       //console.log('Email is: '+profile['email']);
      this.allAlbums=af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/albums');
    }
    resetAll(){
        this.name="";
        this.description="";
    }
    addAlbum(){
        var newAlbum={
            name:this.name,
            description:this.description,
            ddate:new Date()
        }
        this.albs.push(newAlbum);
        this.ddate=new Date();
        this.allAlbums.push({name:this.name,description:this.description,dat:this.ddate.toDateString()});
        this.resetAll();
    }
}
