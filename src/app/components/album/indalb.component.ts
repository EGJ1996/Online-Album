import { Component,ElementRef} from '@angular/core';
import {Auth} from '../../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as fire from 'firebase';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
    selector: 'ind-album',
    templateUrl: './indalbum.component.html'
})

export class PhotoAlbComponent { 
    albkey:any;
    albums:FirebaseListObservable<any>;
    downloadLink:any;
    desc:string;
    file:any;
    constructor(private element: ElementRef,private af:AngularFire,private active:ActivatedRoute) {
        var profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile['user_id']);
        this.active.params.subscribe((param:any)=>{
            this.albkey=param['key'];
            this.albums=this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/albums/'+this.albkey);
        })
    }
    uploadFile(){
         var storageRef=fire.storage().ref('images/'+this.file.name);
        var task=storageRef.put(this.file);
        storageRef.getDownloadURL().then(url=>{
            this.downloadLink=url;
             console.log(this.downloadLink);
             console.log(this.file.type);
             this.albums.push({link:this.downloadLink,description:this.desc,type:this.file.type});
        })
    }
    changeListner(event) {
        var reader = new FileReader();
        //var image = this.element.nativeElement.querySelector('.image');
        this.file=event.target.files[0];
       /*reader.onload = function(e:any) {
            var src = e.target.result;
            image.src = src;
        };*/

        reader.readAsDataURL(event.target.files[0]);
    }
}
