import { Component,ElementRef,OnInit} from '@angular/core';
import {Auth} from '../../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Router,ActivatedRoute} from '@angular/router';
import * as fire from 'firebase';
require ("../../../controlslide.js");
@Component({
    selector: 'view-photo',
    templateUrl: './viewPhotos.html'
})

export class AlbumPhotoComponent implements OnInit{
    currAlbum:any;
    allPhotos:any[]=[];
    albkey:any;
    constructor(private element: ElementRef,private af:AngularFire,private active:ActivatedRoute) {}
    checkItem(it,lst){
        for(var i=0;i<lst.length;i++){
            if(it['lnk']==lst[i]['lnk'] && it['desc']==lst[i]['desc']){
                return true;
            }
        }
        return false;
    }
    ngOnInit(){
        this.active.params.subscribe((param:any)=>{
            this.albkey=param['key'];
            console.log("The key is "+this.albkey);
        });
        var profile = JSON.parse(localStorage.getItem('profile'));
        this.af.database.list('https://my-project-655d3.firebaseio.com/users/'+profile['nickname']+'/albums/'+this.albkey).subscribe(data=>{
            data.forEach(item=>{
                if(item['link']){
                    var newItem={
                        lnk:item['link'],
                        desc:item['description'],
                        tp:item['type']
                    };
                    if(this.checkItem(newItem,this.allPhotos)==false){
                        this.allPhotos.push(newItem);
                    }
                    //this.allPhotos.push(newItem);
                }
                });
        });
        console.log(this.allPhotos);
    }
}
